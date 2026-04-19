import { NextRequest, NextResponse } from "next/server";
import { supabaseAnon, supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const contentType = request.headers.get("content-type") ?? "";
  const isForm =
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");

  function errorResponse(error: string, stage: string, status: number) {
    if (isForm && slug) {
      return NextResponse.redirect(
        new URL(`/storefront/${slug}?error=1`, request.url),
        303
      );
    }
    return NextResponse.json({ error, stage }, { status });
  }

  // Stage 1: validate slug
  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug", stage: "validate" },
      { status: 400 }
    );
  }

  // Stage 2: parse body
  let customerName: string | null = null;
  let customerPhone: string | null = null;
  let quantityRaw = "1";
  let message: string | null = null;

  try {
    if (isForm) {
      const fd = await request.formData();
      customerName = (fd.get("customer_name") as string | null) || null;
      customerPhone = (fd.get("customer_phone") as string | null) || null;
      quantityRaw = (fd.get("quantity") as string) || "1";
      message = (fd.get("message") as string | null) || null;
    } else {
      const body = await request.json();
      customerName = body.customer_name ?? null;
      customerPhone = body.customer_phone ?? null;
      quantityRaw = String(body.quantity ?? 1);
      message = body.message ?? null;
    }
  } catch (e) {
    console.error("Order body parse failed", e);
    return errorResponse("Invalid request body", "validate", 400);
  }

  // Stage 3: look up product_id
  const { data: product, error: lookupError } = await supabaseAnon
    .from("products")
    .select("id")
    .eq("slug", slug)
    .single();

  if (lookupError || !product) {
    console.error("Product lookup failed", lookupError);
    return errorResponse("Product not found", "lookup", 404);
  }

  // Stage 4: insert order
  const { data: order, error: insertError } = await supabaseAdmin
    .from("orders")
    .insert({
      product_id: product.id,
      customer_name: customerName,
      customer_phone: customerPhone,
      quantity: parseInt(quantityRaw) || 1,
      message,
      status: "new",
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("Order insert failed", insertError);
    return errorResponse(insertError.message, "insert", 500);
  }

  // Stage 5: respond
  if (isForm) {
    return NextResponse.redirect(
      new URL(`/storefront/${slug}?ordered=1`, request.url),
      303
    );
  }

  return NextResponse.json({ success: true, order_id: order.id });
}
