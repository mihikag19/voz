# Frontend <-> Backend contract

Source of truth for how frontend and backend communicate. Both Claude Code sessions read this. Do not change without the other person agreeing.

## POST /api/process

Request: FormData
- images: File[] (1-5 files, jpg/png/heic)
- audio: Blob (webm or mp4, from MediaRecorder)

Response 200 (JSON):
{
  "slug": "string",
  "storefront_url": "/storefront/{slug}",
  "listing": {
    "title": "string",
    "description": "string",
    "materials": ["string"],
    "technique": "string or null",
    "cultural_context": "string or null",
    "category": "textile|ceramic|jewelry|woodwork|leather|food|art|other",
    "tags": ["string"],
    "language_detected": "string",
    "confidence": 0.0
  },
  "pricing": {
    "price_low": 0,
    "price_recommended": 0,
    "price_high": 0,
    "currency": "USD",
    "reasoning": "string"
  },
  "ethics": {
    "status": "approve|revise|block",
    "issues": []
  },
  "photo_urls": ["string"],
  "transcript_english": "string"
}

Response error (JSON): { "error": "string", "stage": "whisper|listing|pricing|storefront|ethics|save" }

## GET /api/demo

Returns the same shape as /api/process 200 response, hardcoded. Frontend uses this if live pipeline exceeds 20 seconds or throws.

## GET /storefront/[slug]

Renders the generated storefront page. Reads from Supabase `products` table by slug. Public, no auth.

## POST /api/order (stretch goal — skip if time is short)

Request JSON: { product_slug, customer_name, customer_phone, quantity, message }
Response: { success: true, order_id } or { error }

## Agent status animation (frontend-side fake)

On POST fire to /api/process, frontend starts four cards:
- voice: processing -> done at 2s
- listing: processing -> done at 4s
- pricing: processing -> done at 6s
- ethics: processing -> done when response arrives

When response arrives, any card still "processing" flips to done.
