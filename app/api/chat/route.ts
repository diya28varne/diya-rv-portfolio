import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from "ai";
import { GUIDE_SYSTEM, localGuideAnswer } from "@/lib/guideKnowledge";

export const maxDuration = 30;

function lastUserText(messages: UIMessage[]) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    const text = m.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(" ")
      .trim();
    if (text) return text;
  }
  return "";
}

function localStreamResponse(answer: string, originalMessages: UIMessage[]) {
  const id = `txt-${Date.now()}`;
  const stream = createUIMessageStream({
    originalMessages,
    execute: ({ writer }) => {
      writer.write({ type: "start" });
      writer.write({ type: "text-start", id });
      const size = 28;
      for (let i = 0; i < answer.length; i += size) {
        writer.write({ type: "text-delta", id, delta: answer.slice(i, i + size) });
      }
      writer.write({ type: "text-end", id });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });
  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const question = lastUserText(messages);

  const hasGateway = Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN);

  if (!hasGateway) {
    return localStreamResponse(localGuideAnswer(question || "hello"), messages);
  }

  try {
    const result = streamText({
      model: "openai/gpt-4.1-mini",
      system: GUIDE_SYSTEM,
      messages: await convertToModelMessages(messages),
      temperature: 0.4,
    });
    return result.toUIMessageStreamResponse();
  } catch {
    return localStreamResponse(localGuideAnswer(question || "hello"), messages);
  }
}
