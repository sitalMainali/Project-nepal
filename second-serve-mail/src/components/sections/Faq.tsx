"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/content";
import { T } from "@/components/ui/T";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line rounded-card bg-white ring-1 ring-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const btnId = `faq-btn-${i}`;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={f.q}>
            <h3 className="font-sans text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-semibold hover:bg-cream/60"
              >
                <span>{f.q}</span>
                <svg viewBox="0 0 20 20" className={`h-5 w-5 flex-none text-terracotta-dark transition-transform ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="px-5 pb-5 leading-relaxed text-muted">
              <p>
                <T>{f.a}</T>
              </p>
              {/Spam Act/.test(f.q) && (
                <p className="mt-2">
                  <Link href="/spam-act-compliance" className="font-semibold text-terracotta-dark underline underline-offset-2">
                    Read our Spam Act and consent policy
                  </Link>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
