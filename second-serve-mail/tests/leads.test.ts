import { beforeEach, describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/schemas";
import { buildAutoReply, buildOwnerEmail, escapeHtml, toStoredLead } from "@/lib/server/leads";
import { _resetRateLimit, rateLimit } from "@/lib/server/rate-limit";
import { DEFAULT_INPUTS } from "@/lib/calculator";

const base = { name: "Alex Smith", email: "alex@example.com", consent: true as const };

describe("lead schema", () => {
  it("accepts a valid audit request", () => {
    const r = leadSchema.safeParse({ ...base, type: "audit", venue: "Example Bar", phone: "0400 000 000" });
    expect(r.success).toBe(true);
  });

  it("requires consent on every form", () => {
    for (const type of ["audit", "health-check", "calculator", "testimonial"]) {
      const r = leadSchema.safeParse({ ...base, consent: false, type, venue: "X Bar" });
      expect(r.success).toBe(false);
    }
  });

  it("rejects a filled honeypot", () => {
    const r = leadSchema.safeParse({ ...base, type: "audit", venue: "Example Bar", company_website: "http://spam" });
    expect(r.success).toBe(false);
  });

  it("rejects calculator inputs outside the caps", () => {
    const r = leadSchema.safeParse({ ...base, type: "calculator", venue: "X Bar", inputs: { ...DEFAULT_INPUTS, guests: -5 } });
    expect(r.success).toBe(false);
  });

  it("testimonials need explicit permission to publish", () => {
    const t = { ...base, type: "testimonial", role: "Owner", venue: "X Bar", quote: "It was a genuinely good experience working together." };
    expect(leadSchema.safeParse(t).success).toBe(false);
    expect(leadSchema.safeParse({ ...t, permission: true }).success).toBe(true);
  });
});

describe("lead emails", () => {
  it("calculator auto-reply includes the server-recomputed breakdown and disclaimer", () => {
    const input = leadSchema.parse({ ...base, type: "calculator", venue: "X Bar", inputs: DEFAULT_INPUTS });
    const lead = toStoredLead(input);
    const reply = buildAutoReply(lead);
    expect(reply.text).toContain("Hi Alex");
    expect(reply.text).toContain("Estimated extra revenue (12 months): $8,640");
    expect(reply.text).toContain("It is not a guarantee of results.");
    expect(buildOwnerEmail(lead).subject).toContain("Calculator breakdown");
  });

  it("strips spam-control fields from stored leads", () => {
    const input = leadSchema.parse({ ...base, type: "audit", venue: "X Bar", turnstileToken: "tok", company_website: "" });
    const lead = toStoredLead(input);
    expect(JSON.stringify(lead)).not.toContain("turnstileToken");
    expect(JSON.stringify(lead)).not.toContain("company_website");
    expect(lead.details.consent).toBe(true);
  });

  it("escapes HTML in emails", () => {
    expect(escapeHtml(`<script>"x" & 'y'</script>`)).toBe("&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;");
    const input = leadSchema.parse({ ...base, name: "<b>Evil</b>", type: "audit", venue: "X Bar" });
    expect(buildOwnerEmail(toStoredLead(input)).html).not.toContain("<b>Evil</b>");
  });
});

describe("rate limit", () => {
  beforeEach(() => _resetRateLimit());
  it("blocks after the limit within the window", () => {
    for (let i = 0; i < 3; i++) expect(rateLimit("ip", 3).ok).toBe(true);
    const blocked = rateLimit("ip", 3);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(rateLimit("other-ip", 3).ok).toBe(true);
  });
});
