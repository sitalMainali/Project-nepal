import { describe, expect, it } from "vitest";
import {
  DEFAULT_INPUTS,
  LIMITS,
  annualFee,
  breakdownText,
  calculate,
  clampValue,
  extraProfit,
  extraRevenue,
  formatAUD,
  formatMultiple,
  formatPayback,
  guestsWonBack,
  lapsedGuests,
  paybackMonths,
  returnOnFee,
  sanitiseInputs,
} from "@/lib/calculator";

describe("individual formulas", () => {
  it("lapsed guests = guests × lapsed share", () => {
    expect(lapsedGuests(3000, 60)).toBe(1800);
    expect(lapsedGuests(0, 60)).toBe(0);
    expect(lapsedGuests(1000, 0)).toBe(0);
    expect(lapsedGuests(1000, 100)).toBe(1000);
  });

  it("guests won back = lapsed × win-back rate", () => {
    expect(guestsWonBack(1800, 2)).toBeCloseTo(36);
    expect(guestsWonBack(1000, 0.5)).toBeCloseTo(5);
    expect(guestsWonBack(1000, 8)).toBeCloseTo(80);
  });

  it("extra revenue = won back × visits × spend × venues", () => {
    expect(extraRevenue(36, 2, 120, 1)).toBeCloseTo(8640);
    expect(extraRevenue(36, 2, 120, 3)).toBeCloseTo(25920);
    expect(extraRevenue(36, 0, 120, 1)).toBe(0);
  });

  it("extra profit = revenue × margin", () => {
    expect(extraProfit(10000, 65)).toBeCloseTo(6500);
    expect(extraProfit(10000, 100)).toBe(10000);
  });

  it("annual fee = monthly fee × 12 × venues", () => {
    expect(annualFee(500, 1)).toBe(6000);
    expect(annualFee(500, 3)).toBe(18000);
    expect(annualFee(0, 3)).toBe(0);
  });

  it("return on fee = gain ÷ annual fee, null without a fee", () => {
    expect(returnOnFee(12000, 6000)).toBe(2);
    expect(returnOnFee(12000, 0)).toBeNull();
  });

  it("payback months = annual fee ÷ monthly gain", () => {
    expect(paybackMonths(12000, 6000)).toBe(6);
    expect(paybackMonths(24000, 1000)).toBeCloseTo(0.5);
    expect(paybackMonths(0, 6000)).toBe(Infinity);
    expect(paybackMonths(12000, 0)).toBeNull();
  });
});

describe("calculate()", () => {
  it("matches the worked example with defaults", () => {
    const r = calculate(DEFAULT_INPUTS);
    expect(r.lapsedGuests).toBeCloseTo(1800);
    expect(r.guestsWonBack).toBeCloseTo(36);
    expect(r.extraRevenue).toBeCloseTo(8640);
    expect(r.extraProfit).toBeNull(); // margin 100% = revenue only
    expect(r.returnOnFee).toBeNull(); // no fee set
    expect(r.paybackMonths).toBeNull();
  });

  it("scales by venues", () => {
    const r = calculate({ ...DEFAULT_INPUTS, venues: 2 });
    expect(r.lapsedGuests).toBeCloseTo(3600);
    expect(r.guestsWonBack).toBeCloseTo(72);
    expect(r.extraRevenue).toBeCloseTo(17280);
  });

  it("computes profit, return on fee and payback when margin and fee are set", () => {
    const r = calculate({ ...DEFAULT_INPUTS, marginPct: 50, monthlyFee: 360 });
    // revenue 8640, profit 4320, annual fee 4320
    expect(r.extraProfit).toBeCloseTo(4320);
    expect(r.annualFee).toBe(4320);
    expect(r.returnOnFee).toBeCloseTo(2);
    expect(r.profitReturnOnFee).toBeCloseTo(1);
    expect(r.paybackMonths).toBeCloseTo(12); // payback uses profit when margin set
  });

  it("payback uses revenue when margin is 100%", () => {
    const r = calculate({ ...DEFAULT_INPUTS, monthlyFee: 360 });
    expect(r.paybackMonths).toBeCloseTo(6);
  });

  it("never returns negative numbers, even for bad input", () => {
    const r = calculate({ ...DEFAULT_INPUTS, guests: -500, avgSpend: -10, winBackRatePct: -3 });
    expect(r.lapsedGuests).toBeGreaterThanOrEqual(0);
    expect(r.extraRevenue).toBeGreaterThanOrEqual(0);
  });
});

describe("validation", () => {
  it("clamps to min and max", () => {
    expect(clampValue("winBackRatePct", 20)).toBe(LIMITS.winBackRatePct.max);
    expect(clampValue("winBackRatePct", 0)).toBe(LIMITS.winBackRatePct.min);
    expect(clampValue("guests", -1)).toBe(0);
    expect(clampValue("guests", 10_000_000)).toBe(LIMITS.guests.max);
    expect(clampValue("lapsedSharePct", 140)).toBe(100);
  });

  it("rounds integer fields", () => {
    expect(clampValue("venues", 2.6)).toBe(3);
    expect(clampValue("venues", 0)).toBe(1);
  });

  it("falls back to defaults for junk", () => {
    expect(clampValue("avgSpend", "abc")).toBe(DEFAULT_INPUTS.avgSpend);
    expect(clampValue("avgSpend", NaN)).toBe(DEFAULT_INPUTS.avgSpend);
    expect(clampValue("avgSpend", "")).toBe(DEFAULT_INPUTS.avgSpend);
  });

  it("parses formatted strings", () => {
    expect(clampValue("guests", "3,500")).toBe(3500);
    expect(clampValue("avgSpend", "$95")).toBe(95);
  });

  it("sanitiseInputs only touches provided keys", () => {
    const s = sanitiseInputs({ guests: 5000 });
    expect(s).toEqual({ ...DEFAULT_INPUTS, guests: 5000 });
  });
});

describe("formatting", () => {
  it("formats AUD without cents", () => {
    expect(formatAUD(8640)).toBe("$8,640");
    expect(formatAUD(1234.6)).toBe("$1,235");
  });
  it("formats multiples and payback", () => {
    expect(formatMultiple(2)).toBe("2.0×");
    expect(formatMultiple(null)).toBe("n/a");
    expect(formatPayback(6)).toBe("6.0 months");
    expect(formatPayback(0.4)).toBe("Under 1 month");
    expect(formatPayback(Infinity)).toBe("Not within 12 months");
  });
  it("breakdown text includes key lines", () => {
    const text = breakdownText({ ...DEFAULT_INPUTS, monthlyFee: 360, marginPct: 50 });
    expect(text).toContain("Estimated extra revenue (12 months): $8,640");
    expect(text).toContain("Estimated extra profit (12 months): $4,320");
    expect(text).toContain("Payback period: 12.0 months");
  });
});
