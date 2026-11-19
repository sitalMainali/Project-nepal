import { promises as fs } from "node:fs";
import path from "node:path";
import { breakdownText, sanitiseInputs } from "@/lib/calculator";
import type { LeadInput } from "@/lib/schemas";
import { emails, site } from "@/content";

export type StoredLead = {
  id: string;
  receivedAt: string;
  type: LeadInput["type"];
  name: string;
  email: string;
  venue?: string;
  details: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
};

const LABELS: Record<LeadInput["type"], string> = {
  audit: "Audit request",
  "health-check": "Guest-list health check",
  calculator: "Calculator breakdown",
  testimonial: "Testimonial submission",
};

export function toStoredLead(input: LeadInput, meta: { ip?: string; userAgent?: string } = {}): StoredLead {
  // Strip spam-control fields before storing.
  const { company_website: _hp, turnstileToken: _t, consent: _c, type, name, email, ...rest } = input as LeadInput & {
    company_website?: string;
    turnstileToken?: string;
  };
  const details: Record<string, unknown> = { ...rest, consent: true, consentAt: new Date().toISOString() };
  if (input.type === "calculator") {
    details.inputs = sanitiseInputs(input.inputs);
    details.breakdown = breakdownText(input.inputs);
  }
  return {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    type,
    name,
    email,
    venue: "venue" in input ? input.venue : undefined,
    details,
    ip: meta.ip,
    userAgent: meta.userAgent,
  };
}

// ── Email content ───────────────────────────────────────────────────────────
export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function textToHtml(text: string): string {
  return `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1F2A24">${escapeHtml(text)
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 14px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("")}</div>`;
}

function formatDetails(lead: StoredLead): string {
  const lines = [`Type: ${LABELS[lead.type]}`, `Name: ${lead.name}`, `Email: ${lead.email}`];
  if (lead.venue) lines.push(`Venue: ${lead.venue}`);
  for (const [k, v] of Object.entries(lead.details)) {
    if (k === "inputs" || k === "breakdown") continue;
    if (v === "" || v === undefined) continue;
    lines.push(`${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`);
  }
  if (typeof lead.details.breakdown === "string") lines.push("", lead.details.breakdown);
  lines.push("", `Received: ${lead.receivedAt}`, `Lead ID: ${lead.id}`);
  return lines.join("\n");
}

export function buildOwnerEmail(lead: StoredLead) {
  const text = formatDetails(lead);
  return {
    subject: `New lead: ${LABELS[lead.type]} from ${lead.name}${lead.venue ? ` (${lead.venue})` : ""}`,
    text,
    html: textToHtml(text),
  };
}

export function buildAutoReply(lead: StoredLead) {
  const firstName = lead.name.split(" ")[0];
  const bookingLine = /^https?:\/\//.test(site.bookingUrl) ? `\n\nBook a time: ${site.bookingUrl}` : "";
  const footer =
    "\n\nYou're receiving this one-off email because you submitted a form on our website. We won't add you to any marketing list unless you ask us to.";
  let copy: { subject: string; intro: string };
  let extra = "";
  switch (lead.type) {
    case "audit":
      copy = emails.auditReply;
      extra = bookingLine;
      break;
    case "health-check":
      copy = emails.healthCheckReply;
      break;
    case "calculator":
      copy = emails.calculatorReply;
      extra = `\n\n${lead.details.breakdown as string}\n\nThis is an estimate based on the assumptions you entered. It is not a guarantee of results.${bookingLine}`;
      break;
    case "testimonial":
      copy = emails.testimonialReply;
      break;
  }
  const text = `Hi ${firstName},\n\n${copy.intro}${extra}\n\n${emails.signoff}${footer}`;
  return { subject: copy.subject, text, html: textToHtml(text) };
}

// ── Delivery ────────────────────────────────────────────────────────────────
async function sendViaResend(msg: { to: string; subject: string; text: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.info(`[leads] RESEND_API_KEY/EMAIL_FROM not set; would send "${msg.subject}" to ${msg.to}`);
    return { skipped: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [msg.to],
      subject: msg.subject,
      text: msg.text,
      html: msg.html,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
  return { skipped: false };
}

/**
 * Store the lead. In order of preference:
 *  1. Google Sheet via an Apps Script web app (SHEETS_WEBHOOK_URL) - see docs/google-sheets-apps-script.js
 *  2. Local JSON-lines file (.data/leads.jsonl) when running locally
 *  3. Server log (always), so nothing is silently lost on Vercel
 */
async function storeLead(lead: StoredLead) {
  console.info("[leads] received", JSON.stringify({ id: lead.id, type: lead.type, venue: lead.venue }));
  const hook = process.env.SHEETS_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.SHEETS_WEBHOOK_SECRET ?? "", lead }),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Sheets webhook error ${res.status}`);
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (data && data.ok === false) throw new Error(`Sheets webhook rejected lead: ${data.error ?? "unknown"}`);
    return;
  }
  if (!process.env.VERCEL) {
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n", "utf8");
  }
}

export async function processLead(input: LeadInput, meta: { ip?: string; userAgent?: string }) {
  const lead = toStoredLead(input, meta);
  const owner = process.env.LEAD_NOTIFY_EMAIL;

  // Storage and owner notification are the critical path: if both fail, the
  // visitor gets an error so they can try again or email directly.
  const results = await Promise.allSettled([
    storeLead(lead),
    owner ? sendViaResend({ to: owner, replyTo: lead.email, ...buildOwnerEmail(lead) }) : Promise.resolve({ skipped: true }),
  ]);
  const [stored, notified] = results;
  if (stored.status === "rejected") console.error("[leads] storage failed", stored.reason);
  if (notified.status === "rejected") console.error("[leads] owner email failed", notified.reason);
  if (stored.status === "rejected" && notified.status === "rejected") {
    throw new Error("Lead could not be stored or delivered");
  }

  // Auto-reply is best effort.
  try {
    await sendViaResend({ to: lead.email, ...buildAutoReply(lead) });
  } catch (err) {
    console.error("[leads] auto-reply failed", err);
  }
  return lead;
}
