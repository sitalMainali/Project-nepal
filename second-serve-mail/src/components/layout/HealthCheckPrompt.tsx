"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { healthCheck } from "@/content";
import { HealthCheckForm } from "@/components/forms/HealthCheckForm";

const SEEN_KEY = "ss-hc-prompt-seen";
const SUBMITTED_KEY = "ss-lead-submitted";
const SKIP_PATHS = ["/book", "/thank-you", "/privacy", "/terms", "/spam-act-compliance"];
const TIMED_DELAY_MS = 45_000;
const MIN_DESKTOP_DELAY_MS = 8_000;

function ss(get: string): string | null {
  try {
    return sessionStorage.getItem(get);
  } catch {
    return null;
  }
}

/**
 * Exit-intent (desktop) or timed (mobile) prompt for the free health check.
 * Shown at most once per browser session, never after a form submit, and
 * dismissible with the close button, Escape or a click outside.
 */
export function HealthCheckPrompt() {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setMounted(true);
    d.showModal();
  }, []);

  useEffect(() => {
    if (params.get("healthcheck") === "1") {
      open();
      return;
    }
    if (SKIP_PATHS.includes(pathname)) return;
    if (ss(SEEN_KEY) || ss(SUBMITTED_KEY)) return;
    if (navigator.webdriver) return; // keep automated tests and crawlers unblocked

    const start = Date.now();
    const canShow = () => !ss(SEEN_KEY) && !ss(SUBMITTED_KEY) && !document.querySelector("dialog[open]");

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget && Date.now() - start > MIN_DESKTOP_DELAY_MS && canShow()) open();
    };
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) document.addEventListener("mouseout", onLeave);
    const timer = window.setTimeout(() => canShow() && open(), TIMED_DELAY_MS);
    return () => {
      document.removeEventListener("mouseout", onLeave);
      window.clearTimeout(timer);
    };
  }, [pathname, params, open]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="hc-prompt-title"
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="m-auto max-h-[92vh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto rounded-card bg-cream p-0 text-ink shadow-2xl backdrop:bg-ink/60"
      data-testid="hc-prompt"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h2 id="hc-prompt-title" className="pr-10 text-2xl font-semibold">{healthCheck.promptHeading}</h2>
        <p className="mt-2 text-muted">{healthCheck.promptBody}</p>
        <div className="mt-6">{mounted && <HealthCheckForm idPrefix="hc-prompt" onDone={close} />}</div>
      </div>
    </dialog>
  );
}
