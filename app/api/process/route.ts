import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { transcribeAndTranslate } from "@/lib/whisper";
import { runPipeline } from "@/lib/pipeline";

export async function POST(request: NextRequest) {
  const t0 = Date.now();
  // Stage 1: parse + validate
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (e) {
    console.error("FormData parse failed", e);
    return NextResponse.json(
      { error: "Invalid multipart request", stage: "validate" },
      { status: 400 }
    );
  }

  const imageFiles = formData.getAll("images") as File[];
  const audio = formData.get("audio") as Blob | null;
  const vendorName = (formData.get("vendor_name") as string | null) || null;
  const vendorPhone = (formData.get("vendor_phone") as string | null) || null;

  if (!imageFiles.length || !(imageFiles[0] instanceof File)) {
    return NextResponse.json(
      { error: "At least one image is required", stage: "validate" },
      { status: 400 }
    );
  }
  if (!audio) {
    return NextResponse.json(
      { error: "Audio recording is required", stage: "validate" },
      { status: 400 }
    );
  }

  // Stage 2+3: upload image and transcribe audio in parallel
  const image = imageFiles[0];
  const ext = (image.name?.split(".").pop() || "jpg").toLowerCase();
  const filename = `${crypto.randomUUID()}.${ext}`;
  const audioFilename = `${crypto.randomUUID()}.webm`;

  const [uploadSettled, audioUploadSettled, transcribeSettled] = await Promise.allSettled([
    supabaseAdmin.storage
      .from("product-photos")
      .upload(filename, image, { contentType: image.type, upsert: false }),
    supabaseAdmin.storage
      .from("product-photos")
      .upload(audioFilename, audio, { contentType: "audio/webm", upsert: false }),
    transcribeAndTranslate(audio),
  ]);

  console.log(`[process] upload+whisper: ${Date.now() - t0}ms`);

  if (uploadSettled.status === "rejected") {
    console.error("Upload threw", uploadSettled.reason);
    return NextResponse.json(
      { error: String(uploadSettled.reason), stage: "upload" },
      { status: 500 }
    );
  }
  if (uploadSettled.value.error) {
    console.error("Upload failed", uploadSettled.value.error);
    return NextResponse.json(
      { error: uploadSettled.value.error.message, stage: "upload" },
      { status: 500 }
    );
  }

  // Audio upload is best-effort — don't fail the pipeline if it errors
  let voiceUrl: string | undefined;
  if (audioUploadSettled.status === "fulfilled" && !audioUploadSettled.value.error) {
    const { data: audioPublicData } = supabaseAdmin.storage
      .from("product-photos")
      .getPublicUrl(audioFilename);
    voiceUrl = audioPublicData.publicUrl;
  } else {
    console.warn("Audio upload failed (non-fatal):", audioUploadSettled.status === "rejected"
      ? audioUploadSettled.reason
      : audioUploadSettled.value.error);
  }

  if (transcribeSettled.status === "rejected") {
    console.error("Whisper failed", transcribeSettled.reason);
    return NextResponse.json(
      { error: String(transcribeSettled.reason), stage: "whisper" },
      { status: 500 }
    );
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("product-photos")
    .getPublicUrl(filename);
  const photoUrl = publicUrlData.publicUrl;

  const { transcriptEnglish: transcript, detectedLanguage } =
    transcribeSettled.value;

  // Stage 4: pipeline
  let slug: string;
  let listing: Record<string, unknown>;
  let pricing: Record<string, unknown>;
  let ethics: { status: string; issues: unknown[] };
  let mergedHtml: string;

  const t1 = Date.now();
  try {
    ({ slug, listing, pricing, ethics, mergedHtml } = await runPipeline({
      photoUrl,
      photoUrls: [photoUrl],
      transcript,
      detectedLanguage,
      vendorName: vendorName ?? undefined,
      voiceUrl,
      imageCount: imageFiles.length,
    }));
  } catch (e) {
    console.error(`[process] pipeline failed after ${Date.now() - t1}ms (total ${Date.now() - t0}ms):`, e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Pipeline failed",
        stage: "pipeline",
      },
      { status: 500 }
    );
  }
  console.log(`[process] pipeline: ${Date.now() - t1}ms (total: ${Date.now() - t0}ms)`);

  // Stage 5: save to Supabase
  const { error: insertError } = await supabaseAdmin.from("products").insert({
    slug,
    vendor_name: vendorName,
    vendor_phone: vendorPhone,
    image_url: photoUrl,
    image_urls: [photoUrl],
    voice_url: voiceUrl ?? null,
    voice_transcript: transcript,
    language_detected: detectedLanguage,
    listing_json: listing,
    pricing_json: pricing,
    storefront_html: mergedHtml,
    storefront_url: `/storefront/${slug}`,
    ethics_approved: ethics.status === "approve",
    ethics_notes: ethics,
  });

  if (insertError) {
    console.error(`[process] Supabase insert failed after ${Date.now() - t0}ms total:`, insertError);
    return NextResponse.json(
      { error: insertError.message, stage: "save" },
      { status: 500 }
    );
  }

  console.log(`[process] done: ${Date.now() - t0}ms total`);
  // Stage 6: return response
  return NextResponse.json({
    slug,
    storefront_url: `/storefront/${slug}`,
    image_url: photoUrl,
    image_urls: [photoUrl],
    voice_transcript: transcript,
    language_detected: detectedLanguage,
    listing_json: listing,
    pricing_json: pricing,
    ethics_approved: ethics.status === "approve",
    ethics_notes: ethics,
  });
}
