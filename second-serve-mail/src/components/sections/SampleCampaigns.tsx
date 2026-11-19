"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { samples } from "@/content";
import { T } from "@/components/ui/T";

const TABS = [
  { id: "email", label: "Email examples" },
  { id: "sms", label: "SMS examples" },
] as const;

function SampleBadge() {
  return <span className="rounded-full bg-gold/35 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-ink">Sample</span>;
}

export function SampleCampaigns() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("email");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    setActive(TABS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Sample campaign type" className="inline-flex rounded-full bg-surface p-1 ring-1 ring-line">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-[44px] rounded-full px-5 font-semibold transition-colors ${
              active === t.id ? "bg-ink text-cream" : "text-ink hover:bg-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">All examples are written for {samples.venue}.</p>

      <div role="tabpanel" id="panel-email" aria-labelledby="tab-email" hidden={active !== "email"} tabIndex={0} className="mt-6">
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {samples.email.map((e) => (
            <li key={e.name} className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-line">
              <div className="flex items-center justify-between border-b border-line bg-surface/60 px-5 py-3">
                <p className="text-sm font-semibold">{e.name} email</p>
                <SampleBadge />
              </div>
              <div className="px-5 pt-4 text-sm">
                <p>
                  <span className="text-muted">Subject: </span>
                  <span className="font-semibold">{e.subject}</span>
                </p>
                <p className="mt-1 text-muted">{e.preheader}</p>
              </div>
              <div className="flex flex-1 flex-col px-5 py-4">
                <p className="font-serif text-2xl font-semibold text-terracotta-dark">Fig &amp; Ember</p>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed">
                  {e.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <span className="mt-5 inline-flex min-h-[44px] items-center justify-center self-start rounded-full bg-terracotta px-5 text-sm font-semibold text-white" aria-hidden="true">
                  {e.button}
                </span>
                <p className="mt-auto pt-5 text-xs text-muted">
                  <T>{e.footer}</T>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div role="tabpanel" id="panel-sms" aria-labelledby="tab-sms" hidden={active !== "sms"} tabIndex={0} className="mt-6">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {samples.sms.map((s) => (
            <li key={s.name} className="rounded-card bg-ink p-5 text-cream">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{s.name}</p>
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-ink">Sample</span>
              </div>
              <p className="mt-4 rounded-2xl rounded-tl-sm bg-cream px-4 py-3 text-[15px] leading-relaxed text-ink">{s.body}</p>
              <p className="mt-3 text-xs text-cream/75">{s.body.length} characters</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
