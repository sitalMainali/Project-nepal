"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent, type ConsentValue } from "@/lib/consent";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
export const analyticsConfigured = Boolean(PLAUSIBLE_DOMAIN || GA4_ID);

const OPEN_EVENT = "ss-open-cookie-settings";

/** Loads analytics scripts only after the visitor has said yes. */
function Analytics() {
  return (
    <>
      {PLAUSIBLE_DOMAIN && (
        <>
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
          </Script>
          <Script src={PLAUSIBLE_SRC} data-domain={PLAUSIBLE_DOMAIN} strategy="afterInteractive" />
        </>
      )}
      {GA4_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentValue | null | "unknown">("unknown");
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentValue>).detail);
    const onOpen = () => setForceOpen(true);
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  if (!analyticsConfigured) return null;

  const choose = (v: ConsentValue) => {
    writeConsent(v);
    setForceOpen(false);
    // Turning analytics off after it loaded needs a reload to unload scripts.
    if (v === "denied" && consent === "granted") window.location.reload();
  };

  const showBanner = consent === null || forceOpen;

  return (
    <>
      {consent === "granted" && <Analytics />}
      {showBanner && (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-[88px] z-50 mx-auto max-w-xl rounded-card bg-ink p-5 text-cream shadow-2xl md:bottom-4"
          data-testid="cookie-banner"
        >
          <p className="text-[15px] leading-relaxed">
            We&apos;d like to use privacy-friendly analytics to see which pages help venues most. Nothing loads unless you say yes.{" "}
            <Link href="/privacy#cookies" className="font-semibold text-gold underline underline-offset-2">
              Learn more
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => choose("granted")} className="min-h-[44px] rounded-full bg-gold px-5 font-semibold text-ink hover:bg-[#EDC56F]">
              Accept analytics
            </button>
            <button type="button" onClick={() => choose("denied")} className="min-h-[44px] rounded-full px-5 font-semibold text-cream ring-1 ring-inset ring-cream/40 hover:bg-white/10">
              No thanks
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  if (!analyticsConfigured) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className="inline-flex min-h-[44px] items-center text-left hover:text-gold">
      Cookie settings
    </button>
  );
}
