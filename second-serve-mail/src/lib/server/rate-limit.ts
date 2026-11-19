/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Good enough for a low-traffic marketing site: on Vercel each serverless
 * instance keeps its own window, so the effective limit is per instance.
 * Turnstile + honeypot do the heavy lifting against bots. For a hard global
 * limit, swap this for Upstash Redis (@upstash/ratelimit).
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  // Opportunistic clean-up so the map can't grow forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}

export function _resetRateLimit() {
  hits.clear();
}
