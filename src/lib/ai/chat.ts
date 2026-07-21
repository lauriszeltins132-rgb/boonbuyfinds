import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { gateway } from "@ai-sdk/gateway";
import { aiConfig, isAiChatConfigured } from "@/lib/ai/config";
import { parseSearchIntent, isHaulRequest, extractBudget } from "@/lib/ai/query-parser";
import {
  buildHaulFromCatalog,
  searchCatalog,
} from "@/lib/ai/product-search";
import { BOONBUY_AI_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { createBoonBuyAiTools } from "@/lib/ai/tools";

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    const parts = m.parts ?? [];
    const text = parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("\n")
      .trim();
    if (text) return text;
  }
  return "";
}

/** Deterministic fallback when AI Gateway is not configured or budget is hit. */
export function createSearchOnlyStreamResponse(userText: string) {
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const id = `asst_${Date.now()}`;
      writer.write({ type: "start", messageId: id });
      writer.write({ type: "start-step" });
      writer.write({ type: "text-start", id: `${id}_t` });

      let summary: string;
      let products;

      if (isHaulRequest(userText)) {
        const budget = extractBudget(userText) ?? 100;
        const haul = buildHaulFromCatalog({
          budget,
          query: userText,
          maximumItems: 5,
        });
        products = haul.products;
        summary = `${haul.explanation} Prices and availability may change at BoonBuy checkout. Shipping is not included.`;
      } else {
        const intent = parseSearchIntent(userText, 8);
        const result = searchCatalog(intent);
        products = result.products;
        if (result.total === 0) {
          summary =
            "I couldn’t find a strong match in the BoonBuy Finds catalogue. Try a broader category, a higher budget, or fewer color constraints.";
        } else if (result.relaxedFilters.length > 0) {
          summary = `No exact match for every constraint — relaxed ${result.relaxedFilters.join(
            ", "
          )}. Showing ${Math.min(result.products.length, result.total)} of ${result.total} real catalogue finds. Prices may change at checkout.`;
        } else {
          summary = `I found ${result.total} matching finds. Here are the top ${result.products.length} based on your request. Prices and availability may change on BoonBuy.`;
        }
      }

      writer.write({ type: "text-delta", id: `${id}_t`, delta: summary });
      writer.write({ type: "text-end", id: `${id}_t` });

      if (products.length > 0) {
        writer.write({
          type: "data-products",
          data: { products },
        });
      }

      writer.write({ type: "finish-step" });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function createAiChatResponse(messages: UIMessage[]) {
  const clipped = messages.slice(-aiConfig.maxHistoryMessages);
  const userText = lastUserText(clipped);

  if (!isAiChatConfigured()) {
    return createSearchOnlyStreamResponse(userText);
  }

  try {
    const result = streamText({
      model: gateway(aiConfig.primaryModel),
      system: BOONBUY_AI_SYSTEM_PROMPT,
      messages: await convertToModelMessages(clipped),
      tools: createBoonBuyAiTools(),
      stopWhen: stepCountIs(aiConfig.maxToolCalls),
      maxOutputTokens: aiConfig.maxOutputTokens,
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: clipped,
      onError: () =>
        "BoonBuy AI is temporarily unavailable. Try catalogue search on the homepage.",
    });
  } catch {
    // Provider failure → deterministic search fallback
    return createSearchOnlyStreamResponse(userText);
  }
}
