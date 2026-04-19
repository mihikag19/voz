const ASI1_TIMEOUT_MS = 8_000;

export async function callASI1(params: {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const apiKey = process.env.ASI1_API_KEY;
  if (!apiKey) throw new Error("Missing env: ASI1_API_KEY");

  const { systemPrompt, userPrompt, temperature = 0.3, maxTokens = 500 } = params;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ASI1_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch("https://api.asi1.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "asi1",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("ASI1 timed out after 8s");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable)");
    throw new Error(`ASI1 ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.choices[0].message.content as string;
}
