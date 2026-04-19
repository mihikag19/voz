import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    slug: "priya-warli-painting",
    storefront_url: "/storefront/priya-warli-painting",
    image_url: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800",
    image_urls: ["https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800"],
    voice_transcript:
      "This painting I made with my own hands, using the same natural pigments my grandmother showed me when I was very small. She was the one who taught me Warli — how to make the circle, the triangle, the line, everything has meaning. The canvas is cotton, all pigments are from earth and plant, nothing from factory.",
    language_detected: "hi",
    listing_json: {
      title: "Warli Painting — Tree of Life",
      description:
        "Made with natural earth pigments on cotton canvas, this Warli painting carries the Tree of Life motif passed down through Priya's family in Maharashtra. Every circle and triangle is drawn by hand, the way her grandmother taught her — no stencils, no shortcuts. The work holds a living tradition.",
      materials: ["cotton canvas", "natural pigments"],
      technique: "traditional Warli hand-painting",
      cultural_context:
        "Warli is a tribal art form from the Palghar district of Maharashtra, India. Priya learned directly from her grandmother, continuing a matrilineal tradition of ritual painting that dates back centuries.",
      category: "art",
      tags: ["warli", "maharashtra", "folk art", "handmade"],
      suggested_variants: [],
      language_detected: "hi",
      confidence: 0.92,
    },
    pricing_json: {
      price_low: 65,
      price_recommended: 85,
      price_high: 120,
      currency: "USD",
      reasoning:
        "Comparable hand-painted Warli works on Etsy with similar size and natural-pigment technique sell between $70–$130. Pricing reflects skilled labor, authentic materials, and cultural provenance — not mass-produced prints.",
      comparable_examples: [
        "Etsy: 'Warli Tree of Life on handmade paper' — $79",
        "Etsy: 'Large Warli tribal painting cotton canvas' — $110",
      ],
    },
    ethics_approved: true,
    ethics_notes: {
      status: "approve",
      issues: [],
    },
  });
}
