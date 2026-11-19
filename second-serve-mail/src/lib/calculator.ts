/**
 * Revenue calculator maths. Pure functions, no React, fully unit-tested
 * (tests/calculator.test.ts). Percentages are stored as whole numbers
 * (60 means 60%).
 */

export type CalculatorInputs = {
  /** Number of venues, each with a database of `guests`. */
  venues: number;
  /** Guests in the email/SMS database, per venue. */
  guests: number;
  /** % of the list who haven't visited in 90+ days. */
  lapsedSharePct: number;
  /** Average spend per visit, AUD. */
  avgSpend: number;
  /** Conservative % of lapsed guests won back. */
  winBackRatePct: number;
  /** Visits per won-back guest over 12 months. */
  visitsPerGuest: number;
  /** Gross margin %. 100 means "show revenue only". */
  marginPct: number;
  /** Our monthly fee per venue, AUD. 0 means not set. */
  monthlyFee: number;
};

export type Limit = { min: number; max: number; step: number; integer?: boolean };

export const LIMITS: Record<keyof CalculatorInputs, Limit> = {
  venues: { min: 1, max: 50, step: 1, integer: true },
  guests: { min: 0, max: 500_000, step: 100, integer: true },
  lapsedSharePct: { min: 0, max: 100, step: 1 },
  avgSpend: { min: 0, max: 2_000, step: 5 },
  winBackRatePct: { min: 0.5, max: 8, step: 0.5 },
  visitsPerGuest: { min: 0, max: 24, step: 1 },
  marginPct: { min: 1, max: 100, step: 1 },
  monthlyFee: { min: 0, max: 20_000, step: 10 },
};

export const DEFAULT_INPUTS: CalculatorInputs = {
  venues: 1,
  guests: 3_000,
  lapsedSharePct: 60,
  avgSpend: 120,
  winBackRatePct: 2,
  visitsPerGuest: 2,
  marginPct: 100,
  monthlyFee: 0,
};

/** Clamp a single value into its allowed range. NaN/non-finite falls back. */
export function clampValue(key: keyof CalculatorInputs, value: unknown, fallback?: number): number {
  const limit = LIMITS[key];
  const cleaned = typeof value === "string" ? value.replace(/[^0-9.\-]/g, "") : null;
  if (cleaned === "") return fallback ?? DEFAULT_INPUTS[key];
  const n = cleaned !== null ? Number(cleaned) : Number(value);
  if (!Number.isFinite(n)) return fallback ?? DEFAULT_INPUTS[key];
  let v = Math.min(limit.max, Math.max(limit.min, n));
  if (limit.integer) v = Math.round(v);
  return v;
}

/** Validate and clamp every input (no negatives, sensible caps). */
export function sanitiseInputs(raw: Partial<Record<keyof CalculatorInputs, unknown>>, base: CalculatorInputs = DEFAULT_INPUTS): CalculatorInputs {
  const out = { ...base };
  for (const key of Object.keys(LIMITS) as (keyof CalculatorInputs)[]) {
    if (raw[key] !== undefined) out[key] = clampValue(key, raw[key], base[key]);
  }
  return out;
}

/** Lapsed guests = guests × lapsed share (per venue). */
export function lapsedGuests(guests: number, lapsedSharePct: number): number {
  return guests * (lapsedSharePct / 100);
}

/** Guests won back = lapsed guests × win-back rate (per venue). */
export function guestsWonBack(lapsed: number, winBackRatePct: number): number {
  return lapsed * (winBackRatePct / 100);
}

/** Extra revenue over 12 months = won back × visits × average spend × venues. */
export function extraRevenue(wonBack: number, visitsPerGuest: number, avgSpend: number, venues: number): number {
  return wonBack * visitsPerGuest * avgSpend * venues;
}

/** Extra profit = revenue × margin. */
export function extraProfit(revenue: number, marginPct: number): number {
  return revenue * (marginPct / 100);
}

/** Annual fee = monthly fee × 12 × venues. */
export function annualFee(monthlyFee: number, venues: number): number {
  return monthlyFee * 12 * venues;
}

/** Return on fee = gain ÷ annual fee. Null when no fee is set. */
export function returnOnFee(gain: number, fee: number): number | null {
  if (!(fee > 0)) return null;
  return gain / fee;
}

/**
 * Payback period in months = annual fee ÷ monthly gain.
 * Null when no fee is set; Infinity when there is no gain.
 */
export function paybackMonths(gain: number, fee: number): number | null {
  if (!(fee > 0)) return null;
  const monthlyGain = gain / 12;
  if (!(monthlyGain > 0)) return Infinity;
  return fee / monthlyGain;
}

export type CalculatorResults = {
  lapsedGuests: number; // across all venues
  guestsWonBack: number; // across all venues
  extraRevenue: number;
  /** Null when margin is 100% (revenue only). */
  extraProfit: number | null;
  annualFee: number;
  /** Revenue ÷ annual fee, e.g. 3.2 means 3.2×. */
  returnOnFee: number | null;
  /** Profit ÷ annual fee, when a margin is given. */
  profitReturnOnFee: number | null;
  /** Months to cover the fee (uses profit if a margin is given, else revenue). */
  paybackMonths: number | null;
};

export function calculate(rawInputs: CalculatorInputs): CalculatorResults {
  const i = sanitiseInputs(rawInputs);
  const lapsedPerVenue = lapsedGuests(i.guests, i.lapsedSharePct);
  const wonPerVenue = guestsWonBack(lapsedPerVenue, i.winBackRatePct);
  const revenue = extraRevenue(wonPerVenue, i.visitsPerGuest, i.avgSpend, i.venues);
  const hasMargin = i.marginPct < 100;
  const profit = hasMargin ? extraProfit(revenue, i.marginPct) : null;
  const fee = annualFee(i.monthlyFee, i.venues);
  return {
    lapsedGuests: lapsedPerVenue * i.venues,
    guestsWonBack: wonPerVenue * i.venues,
    extraRevenue: revenue,
    extraProfit: profit,
    annualFee: fee,
    returnOnFee: returnOnFee(revenue, fee),
    profitReturnOnFee: profit === null ? null : returnOnFee(profit, fee),
    paybackMonths: paybackMonths(profit ?? revenue, fee),
  };
}

// ── Formatting (en-AU) ──────────────────────────────────────────────────────
const aud = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 });

export const formatAUD = (n: number) => aud.format(Math.round(n));
export const formatNumber = (n: number) => num.format(Math.round(n));
export function formatMultiple(n: number | null): string {
  if (n === null) return "n/a";
  return `${n.toFixed(1)}×`;
}
export function formatPayback(n: number | null): string {
  if (n === null) return "n/a";
  if (!Number.isFinite(n)) return "Not within 12 months";
  if (n < 1) return "Under 1 month";
  return `${n.toFixed(1)} months`;
}

/** Plain-text breakdown used in emails. */
export function breakdownText(inputs: CalculatorInputs): string {
  const i = sanitiseInputs(inputs);
  const r = calculate(i);
  const lines = [
    "YOUR INPUTS",
    `Venues: ${i.venues}`,
    `Guests in database (per venue): ${formatNumber(i.guests)}`,
    `Share not visited in 90+ days: ${i.lapsedSharePct}%`,
    `Average spend per visit: ${formatAUD(i.avgSpend)}`,
    `Win-back rate: ${i.winBackRatePct}%`,
    `Visits per won-back guest (12 months): ${i.visitsPerGuest}`,
    `Gross margin: ${i.marginPct}%`,
    `Monthly fee per venue: ${i.monthlyFee > 0 ? formatAUD(i.monthlyFee) : "not set"}`,
    "",
    "ESTIMATE",
    `Lapsed guests: ${formatNumber(r.lapsedGuests)}`,
    `Guests won back: ${formatNumber(r.guestsWonBack)}`,
    `Estimated extra revenue (12 months): ${formatAUD(r.extraRevenue)}`,
  ];
  if (r.extraProfit !== null) lines.push(`Estimated extra profit (12 months): ${formatAUD(r.extraProfit)}`);
  if (r.returnOnFee !== null) {
    lines.push(`Annual fee: ${formatAUD(r.annualFee)}`);
    lines.push(`Return on fee (revenue): ${formatMultiple(r.returnOnFee)}`);
    if (r.profitReturnOnFee !== null) lines.push(`Return on fee (profit): ${formatMultiple(r.profitReturnOnFee)}`);
    lines.push(`Payback period: ${formatPayback(r.paybackMonths)}`);
  }
  return lines.join("\n");
}
