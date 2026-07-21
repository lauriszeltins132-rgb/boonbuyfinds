import { feedbackSchema } from "@/lib/ai/schemas";
import {
  checkAiRateLimit,
  getClientKeyFromRequest,
} from "@/lib/ai/rate-limit";
import { trackAiEventServer } from "@/lib/ai/telemetry";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limit = checkAiRateLimit(getClientKeyFromRequest(request));
  if (!limit.ok) {
    return Response.json({ error: "Rate limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid feedback" }, { status: 400 });
  }

  await trackAiEventServer(
    parsed.data.helpful ? "ai_feedback_positive" : "ai_feedback_negative",
    {
      reason: parsed.data.reason,
      entryPoint: parsed.data.entryPoint,
      tool: parsed.data.toolPath,
      resultCount: parsed.data.productIds?.length,
    }
  );

  return Response.json({ ok: true });
}
