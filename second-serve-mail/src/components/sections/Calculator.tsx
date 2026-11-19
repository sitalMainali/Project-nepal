"use client";

import { useMemo, useRef, useState } from "react";
import {
  DEFAULT_INPUTS,
  LIMITS,
  calculate,
  clampValue,
  formatAUD,
  formatMultiple,
  formatNumber,
  formatPayback,
  type CalculatorInputs,
} from "@/lib/calculator";
import { calculatorContent } from "@/content";
import { track } from "@/lib/analytics";
import { CountUp } from "@/components/ui/CountUp";
import { T } from "@/components/ui/T";
import { CalculatorEmailForm } from "@/components/forms/CalculatorEmailForm";

type Key = keyof CalculatorInputs;

type FieldDef = {
  key: Key;
  label: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
};

const MAIN_FIELDS: FieldDef[] = [
  { key: "venues", label: "Number of venues" },
  { key: "guests", label: "Guests in your email/SMS database", hint: "Per venue. Contacts you have permission to message." },
  { key: "lapsedSharePct", label: "Share who haven't visited in 90+ days", suffix: "%" },
  { key: "avgSpend", label: "Average spend per visit", prefix: "$" },
  { key: "winBackRatePct", label: "Conservative win-back rate", suffix: "%", hint: "Share of lapsed guests who come back. Range 0.5% to 8%." },
  { key: "visitsPerGuest", label: "Visits per won-back guest over 12 months" },
];

const OPTIONAL_FIELDS: FieldDef[] = [
  { key: "marginPct", label: "Gross margin", suffix: "%", hint: "Leave at 100% to show revenue only." },
  { key: "monthlyFee", label: "Monthly fee per venue", prefix: "$", hint: "" },
];

const initial = (): CalculatorInputs => ({ ...DEFAULT_INPUTS, monthlyFee: calculatorContent.defaultMonthlyFee });

function toText(v: number) {
  return String(v);
}

export function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initial);
  const [texts, setTexts] = useState<Record<Key, string>>(() => {
    const i = initial();
    return Object.fromEntries(Object.entries(i).map(([k, v]) => [k, toText(v)])) as Record<Key, string>;
  });
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [showEmail, setShowEmail] = useState(false);
  const used = useRef(false);

  const results = useMemo(() => calculate(inputs), [inputs]);

  function markUsed() {
    if (!used.current) {
      used.current = true;
      track("calculator_used");
    }
  }

  function setValue(key: Key, value: number) {
    markUsed();
    setInputs((p) => ({ ...p, [key]: value }));
    setTexts((p) => ({ ...p, [key]: toText(value) }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function onType(key: Key, raw: string) {
    markUsed();
    setTexts((p) => ({ ...p, [key]: raw }));
    const n = Number(raw.replace(/[^0-9.\-]/g, ""));
    const { min, max } = LIMITS[key];
    if (raw.trim() === "" || !Number.isFinite(n)) {
      setErrors((p) => ({ ...p, [key]: "Please enter a number." }));
      return;
    }
    if (n < min || n > max) {
      setErrors((p) => ({ ...p, [key]: `Enter a value between ${formatNumber(min)} and ${formatNumber(max)}.` }));
      setInputs((p) => ({ ...p, [key]: clampValue(key, n) }));
      return;
    }
    setErrors((p) => ({ ...p, [key]: undefined }));
    setInputs((p) => ({ ...p, [key]: clampValue(key, n) }));
  }

  function onBlur(key: Key) {
    const v = clampValue(key, texts[key], inputs[key]);
    setValue(key, v);
  }

  function reset() {
    const i = initial();
    setInputs(i);
    setTexts(Object.fromEntries(Object.entries(i).map(([k, v]) => [k, toText(v)])) as Record<Key, string>);
    setErrors({});
    track("calculator_reset");
  }

  const renderField = (f: FieldDef) => {
    const limit = LIMITS[f.key];
    const v = inputs[f.key];
    const inputId = `calc-${f.key}`;
    const err = errors[f.key];
    const hint = f.key === "monthlyFee" ? calculatorContent.feeHint : f.hint;
    // Large ranges use a gentler slider max so the useful range is reachable.
    const sliderMax = f.key === "guests" ? 50_000 : f.key === "avgSpend" ? 500 : f.key === "monthlyFee" ? 5_000 : f.key === "venues" ? 20 : limit.max;
    return (
      <div key={f.key} className="border-b border-line py-4 last:border-b-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label htmlFor={inputId} className="text-[15px] font-semibold text-ink">
            {f.label}
          </label>
          <div className="flex items-center rounded-xl border border-[#8C8577] bg-white focus-within:ring-2 focus-within:ring-ink">
            {f.prefix && <span className="pl-3 text-muted" aria-hidden="true">{f.prefix}</span>}
            <input
              id={inputId}
              data-testid={inputId}
              type="text"
              inputMode="decimal"
              value={texts[f.key]}
              onChange={(e) => onType(f.key, e.target.value)}
              onBlur={() => onBlur(f.key)}
              aria-invalid={err ? "true" : "false"}
              aria-describedby={[hint ? `${inputId}-hint` : "", err ? `${inputId}-error` : ""].join(" ").trim() || undefined}
              className="min-h-[44px] w-24 bg-transparent px-3 py-2 text-right font-semibold tabular-nums text-ink outline-none"
            />
            {f.suffix && <span className="pr-3 text-muted" aria-hidden="true">{f.suffix}</span>}
          </div>
        </div>
        <input
          type="range"
          aria-label={`${f.label} slider`}
          min={limit.min}
          max={sliderMax}
          step={limit.step}
          value={Math.min(v, sliderMax)}
          onChange={(e) => setValue(f.key, clampValue(f.key, Number(e.target.value)))}
          style={{ ["--fill" as string]: `${Math.max(0, Math.min(100, ((Math.min(v, sliderMax) - limit.min) / (sliderMax - limit.min)) * 100))}%` }}
          className="mt-1"
        />
        {hint && (
          <p id={`${inputId}-hint`} className="text-sm text-muted">
            <T>{hint}</T>
          </p>
        )}
        {err && (
          <p id={`${inputId}-error`} role="alert" className="field-error">
            {err}
          </p>
        )}
      </div>
    );
  };

  const hasFee = results.returnOnFee !== null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div className="card bg-white/80" data-fade>
        <fieldset>
          <legend className="font-serif text-xl font-semibold">Your numbers</legend>
          {MAIN_FIELDS.map(renderField)}
        </fieldset>
        <fieldset className="mt-4">
          <legend className="font-serif text-lg font-semibold">
            Optional <span className="font-sans text-sm font-normal text-muted">for profit and return on fee</span>
          </legend>
          {OPTIONAL_FIELDS.map(renderField)}
        </fieldset>
        <button
          type="button"
          onClick={reset}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-full px-4 font-semibold text-terracotta-dark ring-1 ring-inset ring-terracotta-dark/40 hover:bg-surface"
        >
          Reset to defaults
        </button>
      </div>

      <div className="lg:sticky lg:top-24" data-fade>
        <div className="rounded-card bg-ink p-6 text-cream sm:p-8" aria-live="polite" aria-atomic="false">
          <h3 className="font-serif text-xl font-semibold">Your estimate</h3>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 p-4">
              <dt className="text-sm text-cream/80">Lapsed guests</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold tabular-nums" data-testid="out-lapsed">
                {formatNumber(results.lapsedGuests)}
              </dd>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <dt className="text-sm text-cream/80">Guests won back</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold tabular-nums" data-testid="out-wonback">
                {formatNumber(results.guestsWonBack)}
              </dd>
            </div>
            <div className="col-span-2 rounded-xl bg-white/5 p-4">
              <dt className="text-sm text-cream/80">Estimated extra revenue (12 months)</dt>
              <dd className="mt-1 font-serif text-4xl font-semibold tabular-nums text-gold sm:text-5xl" data-testid="out-revenue">
                <CountUp value={results.extraRevenue} format={formatAUD} />
              </dd>
            </div>
            {results.extraProfit !== null && (
              <div className="col-span-2 rounded-xl bg-white/5 p-4">
                <dt className="text-sm text-cream/80">Estimated extra profit (at {inputs.marginPct}% margin)</dt>
                <dd className="mt-1 font-serif text-2xl font-semibold tabular-nums" data-testid="out-profit">
                  {formatAUD(results.extraProfit)}
                </dd>
              </div>
            )}
            {hasFee && (
              <>
                <div className="rounded-xl bg-white/5 p-4">
                  <dt className="text-sm text-cream/80">Return on fee</dt>
                  <dd className="mt-1 font-serif text-2xl font-semibold tabular-nums" data-testid="out-roi">
                    {formatMultiple(results.returnOnFee)}
                  </dd>
                  {results.profitReturnOnFee !== null && (
                    <dd className="text-sm text-cream/80">{formatMultiple(results.profitReturnOnFee)} on profit</dd>
                  )}
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <dt className="text-sm text-cream/80">Payback period</dt>
                  <dd className="mt-1 font-serif text-2xl font-semibold tabular-nums" data-testid="out-payback">
                    {formatPayback(results.paybackMonths)}
                  </dd>
                </div>
              </>
            )}
          </dl>
          {hasFee ? (
            <p className="mt-4 text-sm text-cream/80">
              Based on an annual fee of {formatAUD(results.annualFee)} ({formatAUD(inputs.monthlyFee)} × 12 months × {inputs.venues}{" "}
              {inputs.venues === 1 ? "venue" : "venues"}).
            </p>
          ) : (
            <p className="mt-4 text-sm text-cream/80">Add a monthly fee under Optional to see return on fee and payback.</p>
          )}
          <p className="mt-5 border-t border-white/15 pt-4 text-sm font-medium text-cream" data-testid="calc-disclaimer">
            {calculatorContent.disclaimer}
          </p>
          <p className="mt-2 text-xs text-cream/75">
            How it works: lapsed guests = guests × share lapsed; won back = lapsed × win-back rate; revenue = won back × visits × average
            spend × venues.
          </p>
          <button
            type="button"
            aria-expanded={showEmail}
            aria-controls="calc-email-panel"
            onClick={() => setShowEmail((s) => !s)}
            className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gold px-6 font-semibold text-ink hover:bg-[#EDC56F]"
          >
            {showEmail ? "Hide email form" : "Email me this breakdown"}
          </button>
        </div>
        {showEmail && (
          <div id="calc-email-panel" className="card mt-4 bg-white">
            <CalculatorEmailForm inputs={inputs} />
          </div>
        )}
      </div>
    </div>
  );
}
