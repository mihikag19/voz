import { runListingAgent, LISTING_FALLBACK } from "./agents/listing";
import { runPricingAgent, PRICING_FALLBACK } from "./agents/pricing";
import { runStorefrontAgent } from "./agents/storefront";
import { runEthicsAgent, ETHICS_FALLBACK } from "./agents/ethics";

// ── Helpers ────────────────────────────────────────────────────────────────

function parseJSONSafely<T>(text: string, fallback: T): T {
  try {
    const cleaned = text.replace(/^```(?:json)?\n?|\n?```$/g, "").trim();
    return JSON.parse(cleaned) as T;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch {}
    }
    console.warn("parseJSONSafely: parse failed, using fallback", { text });
    return fallback;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function makeSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 60);
  const suffix = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .padStart(4, "0");
  return `${base}-${suffix}`;
}

function buildPricingContext(transcript: string): string {
  return `TRANSCRIPT (translated to English):\n${transcript}\n\nEstimate a fair retail price range for this handmade artisan product based on the transcript above.`;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en:"English",hi:"Hindi",es:"Spanish",fr:"French",pt:"Portuguese",ar:"Arabic",
  zh:"Chinese",ja:"Japanese",ko:"Korean",de:"German",it:"Italian",ru:"Russian",
  tr:"Turkish",vi:"Vietnamese",te:"Telugu",ta:"Tamil",bn:"Bengali",pa:"Punjabi",
  mr:"Marathi",gu:"Gujarati",kn:"Kannada",ml:"Malayalam",or:"Odia",
  sw:"Swahili",yo:"Yoruba",ig:"Igbo",ha:"Hausa",zu:"Zulu",am:"Amharic",
  tl:"Filipino",ms:"Malay",id:"Indonesian",th:"Thai",fa:"Persian",he:"Hebrew",
  pl:"Polish",cs:"Czech",hu:"Hungarian",ro:"Romanian",sr:"Serbian",el:"Greek",
};

function languageName(code: string): string {
  return LANGUAGE_NAMES[code] ?? code.toUpperCase();
}

// ── Fallback HTML ──────────────────────────────────────────────────────────

const FALLBACK_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{TITLE}}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; background: #fdf8f3; color: #2c1a0e; max-width: 600px; margin: 0 auto; padding: 1.5rem; }
    img { width: 100%; border-radius: 8px; margin-bottom: 1.5rem; }
    h1 { font-size: 1.6rem; margin-bottom: 0.5rem; }
    .price { font-size: 1.4rem; color: #7a4528; font-weight: bold; margin-bottom: 1rem; }
    p { line-height: 1.6; margin-bottom: 0.75rem; }
    .label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: #9b6b4a; margin-top: 1rem; margin-bottom: 0.25rem; }
    form { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
    input, textarea { padding: 0.6rem 0.8rem; border: 1px solid #d4b89a; border-radius: 6px; font-size: 1rem; background: #fff; width: 100%; }
    button { background: #7a4528; color: #fff; border: none; border-radius: 6px; padding: 0.75rem; font-size: 1rem; cursor: pointer; }
    footer { margin-top: 2.5rem; text-align: center; font-size: 0.8rem; color: #9b6b4a; }
  </style>
</head>
<body>
  <img src="{{IMG_URL}}" alt="{{TITLE}}" />
  <h1>{{TITLE}}</h1>
  <div class="price">{{PRICE}}</div>
  <p>{{DESCRIPTION}}</p>
  <div class="label">Materials</div>
  <p>{{MATERIALS}}</p>
  <div class="label">Cultural Context</div>
  <p>{{CULTURAL_CONTEXT}}</p>
  <form method="POST" action="{{ORDER_FORM_ACTION}}">
    <input name="customer_name" placeholder="Your name" required />
    <input name="customer_phone" type="tel" placeholder="Your phone number" required />
    <input name="quantity" type="number" min="1" value="1" />
    <textarea name="message" placeholder="Any message for the artisan? (optional)" rows="3"></textarea>
    <button type="submit">Place Order</button>
  </form>
  <footer>Made by hand. Shipped with care.<br /><strong>Voz</strong></footer>
</body>
</html>`;

// ── Pipeline ───────────────────────────────────────────────────────────────

export async function runPipeline(input: {
  photoUrl: string;
  photoUrls: string[];
  transcript: string;
  detectedLanguage: string;
  vendorName?: string;
  voiceUrl?: string;
  imageCount?: number;
}): Promise<{
  slug: string;
  listing: Record<string, unknown>;
  pricing: Record<string, unknown>;
  ethics: { status: string; issues: unknown[] };
  mergedHtml: string;
}> {
  const { photoUrl, transcript, detectedLanguage } = input;

  // Stage 1: three agents in parallel
  const [listingRaw, pricingRaw, storefrontHtml] = await Promise.all([
    (runListingAgent(photoUrl, transcript) as Promise<string>).catch((e) => {
      console.error("Listing Agent failed", e);
      return "";
    }),
    runPricingAgent(buildPricingContext(transcript)).catch((e) => {
      console.error("Pricing Agent failed", e);
      return "";
    }),
    runStorefrontAgent(transcript).catch((e) => {
      console.error("Storefront Agent failed", e);
      return FALLBACK_HTML;
    }),
  ]);

  const listing = parseJSONSafely<Record<string, unknown>>(
    listingRaw,
    LISTING_FALLBACK
  );
  const pricing = parseJSONSafely<Record<string, unknown>>(
    pricingRaw,
    PRICING_FALLBACK
  );
  listing.language_detected = detectedLanguage;

  // Stage 2: deterministic merge
  const slug = makeSlug((listing.title as string) || "artisan-item");
  const orderFormAction = `/api/order?slug=${slug}`;
  const materials = Array.isArray(listing.materials)
    ? (listing.materials as string[]).join(", ")
    : String(listing.materials ?? "");

  const vendorName = input.vendorName?.trim() || "the artisan";
  const vendorInitial = vendorName[0]?.toUpperCase() ?? "A";
  const priceNum = Number(pricing.price_recommended ?? 45);
  const artisanAmount = `$${(priceNum * 0.88).toFixed(2)}`;
  const shippingAmount = `$${(priceNum * 0.10).toFixed(2)}`;
  const feeAmount = `$${(priceNum * 0.02).toFixed(2)}`;
  const langName = languageName(detectedLanguage);
  const category = escapeHtml(String(listing.category ?? "handmade"));
  const technique = escapeHtml(String(listing.technique ?? "handcrafted"));

  const mergedHtml = storefrontHtml
    .replaceAll("{{TITLE}}", escapeHtml(String(listing.title ?? "")))
    .replaceAll("{{PRICE}}", `$${priceNum}`)
    .replaceAll("{{IMG_URL}}", photoUrl)
    .replaceAll("{{DESCRIPTION}}", escapeHtml(String(listing.description ?? "")))
    .replaceAll("{{MATERIALS}}", escapeHtml(materials))
    .replaceAll("{{CULTURAL_CONTEXT}}", escapeHtml(String(listing.cultural_context ?? "")))
    .replaceAll("{{ORDER_FORM_ACTION}}", orderFormAction)
    .replaceAll("{{SLUG}}", slug)
    .replaceAll("{{VENDOR_NAME}}", escapeHtml(vendorName))
    .replaceAll("{{VENDOR_INITIAL}}", vendorInitial)
    .replaceAll("{{LANGUAGE_NAME}}", langName)
    .replaceAll("{{TRANSCRIPT}}", escapeHtml(String(input.transcript ?? "")))
    .replaceAll("{{CATEGORY}}", category)
    .replaceAll("{{TECHNIQUE}}", technique)
    .replaceAll("{{ARTISAN_AMOUNT}}", artisanAmount)
    .replaceAll("{{SHIPPING_AMOUNT}}", shippingAmount)
    .replaceAll("{{FEE_AMOUNT}}", feeAmount)
    .replaceAll("{{VOICE_URL}}", input.voiceUrl ?? "")
    .replaceAll("{{IMAGE_COUNT}}", String(input.imageCount ?? 1));

  // Stage 3: ethics review (sequential)
  const ethicsRaw = await runEthicsAgent({
    listing,
    pricing,
    transcript,
    slug,
  }).catch((e) => {
    console.error("Ethics Agent failed", e);
    return "";
  });

  const ethics = parseJSONSafely<{ status: string; issues: unknown[] }>(
    ethicsRaw,
    ETHICS_FALLBACK
  );

  return { slug, listing, pricing, ethics, mergedHtml };
}
