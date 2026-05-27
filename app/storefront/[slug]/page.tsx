import { notFound } from "next/navigation";
import { supabaseAnon } from "@/lib/supabase";

type ProductRow = {
  slug: string;
  storefront_html: string | null;
  listing_json: Record<string, unknown> | null;
  pricing_json: Record<string, unknown> | null;
  image_url: string | null;
  vendor_name: string | null;
  language_detected: string | null;
  ethics_notes: Record<string, unknown> | null;
};

export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: ProductRow | null = null;

  try {
    const { data, error } = await supabaseAnon
      .from("products")
      .select(
        "slug, storefront_html, listing_json, pricing_json, image_url, vendor_name, language_detected, ethics_notes"
      )
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Supabase fetch error", error);
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
          Something went wrong. Please try again later.
        </div>
      );
    }

    product = data as ProductRow | null;
  } catch (e) {
    console.error("Storefront page error", e);
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <>
      <style>{`
        .fair-bar .seg { overflow: hidden; white-space: nowrap; min-width: 0; }
        .fair-bar .seg.b { font-size: 11px; padding: 0 8px; }
        .fair-bar .seg.c { font-size: 0; }
      `}</style>

      <div
        dangerouslySetInnerHTML={{ __html: product.storefront_html ?? "" }}
      />

      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          fontSize: "0.75rem",
          color: "#9b6b4a",
          fontFamily: "Georgia, serif",
        }}
      >
        Made with <strong>Voz</strong>
      </div>
    </>
  );
}
