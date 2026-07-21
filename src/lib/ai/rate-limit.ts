import { createHash } from "node:crypto";
import { aiConfig } from "@/lib/ai/config";

type Bucket = { count: number; resetAt: number };

const minuteBuckets = new Map<string, Bucket>();
const dayBuckets = new Map<string, Bucket>();
const dailyGlobal = { count: 0, dayKey: "" };

function dayKey(now = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10);
}

function touch(map: Map<string, Bucket>, key: string, windowMs: number): number {
  const now = Date.now();
  const current = map.get(key);
  if (!current || current.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return 1;
  }
  current.count += 1;
  return current.count;
}

/** Hash IP / identifier — do not store raw IPs. */
export function hashClientKey(raw: string): string {
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

export function getClientKeyFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ua = request.headers.get("user-agent") ?? "";
  return hashClientKey(`${ip}|${ua.slice(0, 64)}`);
}

export type RateLimitResult =
  | { ok: true; remainingMinute: number; remainingDay: number }
  | { ok: false; reason: "minute" | "day" | "budget"; retryAfterSec: number };

export function checkAiRateLimit(clientKey: string): RateLimitResult {
  const minuteCount = touch(minuteBuckets, clientKey, 60_000);
  const dayCount = touch(dayBuckets, `d:${clientKey}`, 86_400_000);

  const today = dayKey();
  if (dailyGlobal.dayKey !== today) {
    dailyGlobal.dayKey = today;
    dailyGlobal.count = 0;
  }
  dailyGlobal.count += 1;

  if (minuteCount > aiConfig.perIpPerMinute) {
    return { ok: false, reason: "minute", retryAfterSec: 60 };
  }
  if (dayCount > aiConfig.perIpPerDay) {
    return { ok: false, reason: "day", retryAfterSec: 3600 };
  }
  if (dailyGlobal.count > aiConfig.dailyRequestLimit) {
    return { ok: false, reason: "budget", retryAfterSec: 3600 };
  }

  return {
    ok: true,
    remainingMinute: Math.max(0, aiConfig.perIpPerMinute - minuteCount),
    remainingDay: Math.max(0, aiConfig.perIpPerDay - dayCount),
  };
}

export function assertCronAuthorized(request: Request): boolean {
  const secret = aiConfig.cronSecret;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}
