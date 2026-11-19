import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { processLead } from "@/lib/server/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  const limit = rateLimit(`lead:${ip}`, Number(process.env.RATE_LIMIT_MAX ?? 5));
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn anything.
  if (body && typeof body === "object" && "company_website" in body && (body as Record<string, unknown>).company_website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const human = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!human) {
    return NextResponse.json(
      { ok: false, error: "We couldn't verify you're human. Please refresh the page and try again." },
      { status: 400 },
    );
  }

  try {
    await processLead(parsed.data, { ip, userAgent: req.headers.get("user-agent") ?? undefined });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/leads] failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your details. Please try again, or email us directly." },
      { status: 500 },
    );
  }
}
