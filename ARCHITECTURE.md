# Voz — Implementation Architecture

## System flow

[Photo + Mic] -> Whisper (translate to English) -> [transcript + photo URLs]
                                                          |
                       +----------------------------------+----------------------------------+
                       |                                  |                                  |
                Listing Agent                      Pricing Agent                   Storefront Agent
                (Claude)                           (Fetch.ai ASI1)                 (Claude)
                structured JSON                    price range JSON                HTML with {{slots}}
                       |                                  |                                  |
                       +----------------------------------+----------------------------------+
                                                          |
                                                  Deterministic merge
                                                          |
                                                  Ethics Review (Claude)
                                                          |
                                             Save to Supabase + return URL

Key design choice: Storefront Agent generates HTML with {{TITLE}}, {{PRICE}}, {{IMG_URL}}, {{DESCRIPTION}},
{{MATERIALS}}, {{CULTURAL_CONTEXT}}, {{ORDER_FORM_ACTION}} placeholders so it runs truly in parallel with
Listing and Pricing. A deterministic String.replaceAll merge step combines them. This lets us use Promise.all.

---

## 1. Agent system prompts

### 1a. Listing Agent (Claude)

You are the Listing Agent for Voz, a commerce platform for immigrant and traditional artisans.

Your job: given a photo of a handmade product and a voice transcript (translated to English from any language), produce a structured product listing.

CRITICAL VOICE PRESERVATION RULES:
- The artisan's own words matter. Do NOT sanitize into corporate marketing copy.
- Preserve cultural terms in their original form (e.g., "rebozo" not "scarf", "ao dai" not "long dress"). Add a short English gloss in parentheses on first use only.
- If the artisan describes technique, materials, or family history, keep it. This is the product's value.
- Do NOT invent details. If the transcript does not mention something, leave the field empty or null.

Output ONLY a valid JSON object with this exact schema, no markdown fences, no commentary:
{
  "title": "string, max 60 chars, preserves native terms",
  "description": "string, 2-4 sentences in artisan's voice",
  "materials": ["string"],
  "technique": "string or null",
  "cultural_context": "string or null — origin, tradition, family lineage if mentioned",
  "category": "textile | ceramic | jewelry | woodwork | leather | food | art | other",
  "tags": ["string"],
  "suggested_variants": ["string"] or [],
  "language_detected": "ISO code from transcript metadata",
  "confidence": 0.0 to 1.0
}

If transcript is unclear or too short (<10 words), return confidence < 0.4 and populate fields with best-effort guesses from the image.

### 1b. Pricing Agent (Fetch.ai ASI1)

You are the Pricing Agent for Voz. You research fair market prices for handmade artisan goods.

Given a product description, category, materials, and technique, estimate a fair retail price range in USD. Consider:
- Comparable handmade items on Etsy, artisan marketplaces, craft fairs
- Material costs and labor time implied by the technique
- Cultural value of the tradition (genuine handmade work is undervalued — lean higher, not lower)
- NOT mass-produced equivalents from fast-fashion or import retailers

Output ONLY a valid JSON object, no markdown, no commentary:
{
  "price_low": number (USD, fair floor for the artisan),
  "price_recommended": number (USD, target retail),
  "price_high": number (USD, premium positioning),
  "currency": "USD",
  "reasoning": "1-2 sentences explaining the range",
  "comparable_examples": ["string"] or []
}

If you cannot determine pricing confidently, default to price_low=25, price_recommended=45, price_high=75 and note "default estimate" in reasoning.

### 1c. Storefront Generator (Claude)

You are the Storefront Generator for Voz. You produce a single, self-contained HTML product page for a handmade item from an immigrant or traditional artisan.

Given a product photo URL and a voice transcript (translated to English), generate a complete HTML document. Design goals:
- Feel authentic to the artisan and their tradition, NOT generic Shopify template
- Mobile-first (80% of traffic will be WhatsApp-shared)
- Warm, human tone — this is someone's craft, not an Amazon SKU
- Inline all CSS in a <style> tag. No external fonts or libraries.
- Include these exact placeholder strings where the merger will inject data:
    {{TITLE}}, {{PRICE}}, {{IMG_URL}}, {{DESCRIPTION}}, {{MATERIALS}}, {{CULTURAL_CONTEXT}}, {{ORDER_FORM_ACTION}}
- Include a simple order form: name, phone, quantity, optional message. POST to {{ORDER_FORM_ACTION}}.
- Include a "Made by hand. Shipped with care." footer and a small Voz wordmark.

Output ONLY the raw HTML document starting with <!DOCTYPE html>. No markdown fences. No commentary before or after.

The transcript is for design inspiration only — to get tone and visual vibe right. Do NOT invent specific product details; those are injected via placeholders.

### 1d. Ethics Review Agent (Claude)

You are the Ethics Review Agent for Voz. You run AFTER listing, pricing, and storefront are generated, and BEFORE publish.

Your job: review the complete generated listing for three failure modes:

1. CULTURAL MISREPRESENTATION — does the description accurately reflect the tradition? Are cultural terms used correctly? Flag stereotyping or flattening (e.g., conflating Mexican regional traditions, generic "tribal" labels).

2. ARTISAN FAIRNESS — is the recommended price at or above a fair handmade labor rate for the described technique? Flag if price_recommended underprices skilled work (e.g., hand-loomed textile under $40 is almost always unfair).

3. CLAIMS ACCURACY — does the listing invent materials, origins, or provenance not supported by the transcript? Flag fabricated heritage claims.

Output ONLY valid JSON:
{
  "status": "approve" | "revise" | "block",
  "issues": [
    {"severity": "low|medium|high", "category": "cultural|fairness|claims", "note": "string", "suggested_fix": "string or null"}
  ],
  "revised_fields": { }
}

Bias toward "approve" unless there is a concrete issue. Do NOT block for stylistic preferences. Only "block" for clearly fabricated heritage claims or severely unfair pricing (<50% of fair rate).

---

## 2. API call structures

### Claude API (Listing, Storefront, Ethics)

async function callClaude({ systemPrompt, userContent, maxTokens = 2048 }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }]
    })
  });
  if (!res.ok) throw new Error(`Claude ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content[0].text;
}

userContent for Listing Agent (image + text):
const userContent = [
  { type: "image", source: { type: "url", url: photoPublicUrl } },
  { type: "text", text: `TRANSCRIPT (translated to English):\n${transcript}\n\nProduce the listing JSON now.` }
];

For Storefront Generator and Ethics: pass text only.

### Fetch.ai ASI1 (Pricing)

async function callASI1({ systemPrompt, userPrompt }) {
  const res = await fetch("https://api.asi1.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.ASI1_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "asi1",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 500
    })
  });
  if (!res.ok) throw new Error(`ASI1 ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

Fallback: if ASI1 times out (>8s) or 5xx's, call Claude with the same prompt.

### Whisper (voice transcription + auto-translation)

Use /v1/audio/translations. Auto-detects source language AND outputs English in one call.

async function transcribeAndTranslate(audioBlob) {
  const fd = new FormData();
  fd.append("file", audioBlob, "recording.webm");
  fd.append("model", "whisper-1");
  fd.append("response_format", "verbose_json");

  const res = await fetch("https://api.openai.com/v1/audio/translations", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
    body: fd
  });
  if (!res.ok) throw new Error(`Whisper ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return { transcriptEnglish: data.text, detectedLanguage: data.language };
}

iOS Safari quirk: may produce audio/mp4 instead of audio/webm. Detect with MediaRecorder.isTypeSupported and fall back. Whisper accepts both.

---

## 3. Parallel orchestration

async function runPipeline({ photoUrl, transcript, detectedLanguage }) {
  // Stage 1: three agents in parallel
  const [listingRaw, pricingRaw, storefrontHTML] = await Promise.all([
    runListingAgent(photoUrl, transcript),
    runPricingAgent(transcript),
    runStorefrontAgent(transcript)
  ]);

  const listing = parseJSONSafely(listingRaw, LISTING_FALLBACK);
  const pricing = parseJSONSafely(pricingRaw, PRICING_FALLBACK);
  listing.language_detected = detectedLanguage;

  // Stage 2: deterministic merge
  const slug = makeSlug(listing.title);
  const orderFormAction = `/api/order?slug=${slug}`;
  const mergedHTML = storefrontHTML
    .replaceAll("{{TITLE}}", escapeHtml(listing.title))
    .replaceAll("{{PRICE}}", `$${pricing.price_recommended}`)
    .replaceAll("{{IMG_URL}}", photoUrl)
    .replaceAll("{{DESCRIPTION}}", escapeHtml(listing.description))
    .replaceAll("{{MATERIALS}}", listing.materials.join(", "))
    .replaceAll("{{CULTURAL_CONTEXT}}", listing.cultural_context || "")
    .replaceAll("{{ORDER_FORM_ACTION}}", orderFormAction);

  // Stage 3: ethics review
  const ethicsRaw = await runEthicsAgent({ listing, pricing, transcript, slug });
  const ethics = parseJSONSafely(ethicsRaw, { status: "approve", issues: [], revised_fields: {} });

  if (ethics.status === "block") {
    throw new Error(`Ethics block: ${JSON.stringify(ethics.issues)}`);
  }

  const publicUrl = await publishToSupabase({ slug, html: mergedHTML, listing, pricing, ethics, photoUrl });
  return { publicUrl, listing, pricing, ethics, slug };
}

function parseJSONSafely(text, fallback) {
  try {
    const cleaned = text.replace(/^```(?:json)?\n?|\n?```$/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) { try { return JSON.parse(match[0]); } catch {} }
    console.warn("JSON parse failed, using fallback", { text, error: e });
    return fallback;
  }
}

const LISTING_FALLBACK = {
  title: "Handmade Artisan Item",
  description: "A handcrafted piece made with care and tradition.",
  materials: [], technique: null, cultural_context: null,
  category: "other", tags: [], suggested_variants: [],
  language_detected: "unknown", confidence: 0.2
};

const PRICING_FALLBACK = {
  price_low: 25, price_recommended: 45, price_high: 75,
  currency: "USD", reasoning: "default estimate", comparable_examples: []
};

---

## 4. Supabase schema

Run this SQL in the Supabase SQL editor:

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  artisan_phone text,
  title text not null,
  description text,
  price_low numeric,
  price_recommended numeric,
  price_high numeric,
  currency text default 'USD',
  category text,
  materials text[],
  cultural_context text,
  language_detected text,
  transcript_english text,
  photo_url text,
  photo_urls text[],
  storefront_html text,
  ethics_status text,
  ethics_notes jsonb,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  customer_name text,
  customer_phone text,
  quantity int default 1,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

alter table orders enable row level security;
create policy "anon can insert orders" on orders for insert to anon with check (true);

alter table products enable row level security;
create policy "public read products" on products for select to anon using (true);
create policy "service role can insert products" on products for insert to service_role with check (true);

Storage buckets (create in Supabase UI):
- product-photos (public)
- storefronts (public) — optional, for static HTML exports

---

## 5. Build order

10:00-10:30  Supabase setup, buckets, schema, test URL
10:30-11:30  HTML/React shell: camera, mic, submit button
11:30-12:00  Whisper end-to-end
12:00-13:00  Listing Agent + Promise.all skeleton with stubs
13:00-14:00  Storefront Generator + merge + upload
14:00-14:30  Pricing Agent (ASI1); fall back to Claude if broken
14:30-15:00  Ethics Agent; fall back to auto-approve if broken
15:00-15:30  Order form + simple orders view
15:30-15:45  Real-language test (Spanish, Hindi, Vietnamese)
15:45-16:00  Demo script + backup pre-generated URL

---

## 6. Failure modes

1. Claude returns malformed JSON
   - parseJSONSafely with regex fallback
   - LISTING_FALLBACK and PRICING_FALLBACK constants
   - max_tokens 2048+ to avoid mid-JSON truncation

2. Mobile mic recording fails (iOS Safari MIME, permission)
   - Feature-detect MIME: webm then fall back to mp4
   - Always-visible text input fallback for description
   - Pre-recorded sample audio files as backup

3. Pipeline latency (15+ seconds of silence)
   - Streamed status updates per stage
   - Upload photo concurrently with Whisper call
   - 8s timeout on ASI1 with Claude fallback
   - Pre-generated known-good storefront URL as demo safety net
