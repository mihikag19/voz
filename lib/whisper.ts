const WHISPER_TIMEOUT_MS = 30_000;

export async function transcribeAndTranslate(audioBlob: Blob): Promise<{
  transcriptEnglish: string;
  detectedLanguage: string;
}> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing env: OPENAI_API_KEY");

  const fd = new FormData();
  fd.append("file", audioBlob, "recording.webm");
  fd.append("model", "whisper-1");
  fd.append("response_format", "verbose_json");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WHISPER_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch("https://api.openai.com/v1/audio/translations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: fd,
      signal: controller.signal,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Whisper timed out after 30s");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable)");
    throw new Error(`Whisper ${res.status}: ${body}`);
  }

  const data = await res.json();
  return { transcriptEnglish: data.text, detectedLanguage: data.language };
}
