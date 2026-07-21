import { z } from "zod";

/** Central AI configuration — no hardcoded model IDs in call sites. */

function readEnv(name: string, fallback = ""): string {
  return (process.env[name] ?? fallback).trim();
}

function readInt(name: string, fallback: number): number {
  const raw = readEnv(name);
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const aiConfig = {
  gatewayApiKey: readEnv("AI_GATEWAY_API_KEY"),
  primaryModel: readEnv("AI_PRIMARY_MODEL", "openai/gpt-4o-mini"),
  fallbackModel: readEnv("AI_FALLBACK_MODEL", "openai/gpt-4o"),
  embeddingModel: readEnv("AI_EMBEDDING_MODEL", ""),
  maxOutputTokens: readInt("AI_MAX_OUTPUT_TOKENS", 1200),
  dailyRequestLimit: readInt("AI_DAILY_REQUEST_LIMIT", 800),
  perIpPerMinute: readInt("AI_RATE_LIMIT_PER_MINUTE", 12),
  perIpPerDay: readInt("AI_RATE_LIMIT_PER_DAY", 80),
  maxHistoryMessages: readInt("AI_MAX_HISTORY_MESSAGES", 16),
  maxPromptChars: readInt("AI_MAX_PROMPT_CHARS", 1200),
  maxToolCalls: readInt("AI_MAX_TOOL_CALLS", 6),
  maxProductsReturned: readInt("AI_MAX_PRODUCTS", 12),
  cronSecret: readEnv("CRON_SECRET"),
  siteUrl: readEnv("NEXT_PUBLIC_SITE_URL", "https://boonbuyfinds.net"),
};

export function isAiChatConfigured(): boolean {
  return Boolean(aiConfig.gatewayApiKey);
}

export const chatRequestSchema = z.object({
  messages: z.array(z.unknown()).min(1).max(40),
  entryPoint: z
    .enum(["homepage", "floating", "ai-page", "product", "collection", "other"])
    .optional()
    .default("other"),
});

export type ChatEntryPoint = z.infer<typeof chatRequestSchema>["entryPoint"];
