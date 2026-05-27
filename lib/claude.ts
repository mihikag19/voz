const CLAUDE_TIMEOUT_MS = 9_000;
const CLAUDE_MODEL = "claude-sonnet-4-6";

type TextPart = { type: "text"; text: string };
type ImagePart = { type: "image"; source: { type: "url"; url: string } };

export async function callClaude(params: {
  systemPrompt: string;
  userContent: string | Array<TextPart | ImagePart>;
  maxTokens?: number;
}): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing env: ANTHROPIC_API_KEY");

  const { systemPrompt, userContent, maxTokens = 2048 } = params;
  const content: Array<TextPart | ImagePart> =
    typeof userContent === "string"
      ? [{ type: "text", text: userContent }]
      : userContent;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CLAUDE_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: "user", content }],
      }),
      signal: controller.signal,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Claude timed out after 45s");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable)");
    throw new Error(`Claude ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.content[0].text as string;
}
