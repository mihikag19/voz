import { callASI1 } from "../asi1";
import { callClaude } from "../claude";

const SYSTEM_PROMPT = `You are the Pricing Agent for Voz. You research fair market prices for handmade artisan goods.

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

If you cannot determine pricing confidently, default to price_low=25, price_recommended=45, price_high=75 and note "default estimate" in reasoning.`;

export const PRICING_FALLBACK = {
  price_low: 25,
  price_recommended: 45,
  price_high: 75,
  currency: "USD",
  reasoning: "default estimate",
  comparable_examples: [] as string[],
};

export async function runPricingAgent(listingContext: string): Promise<string> {
  try {
    const result = await callASI1({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt: listingContext,
    });
    if (!result || result.trim() === "") {
      throw new Error("ASI1 returned empty response");
    }
    return result;
  } catch (err) {
    console.warn("Pricing Agent: ASI1 failed, falling back to Claude.", err);
    return callClaude({
      systemPrompt: SYSTEM_PROMPT,
      userContent: listingContext,
      maxTokens: 500,
    });
  }
}
