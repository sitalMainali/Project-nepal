"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cta, nav } from "@/content";
import { Logo } from "@/components/ui/Logo";
import { CtaLink } from "@/components/ui/CtaLink";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Second Serve Mail, home" className="flex min-h-[44px] items-center">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="inline-flex min-h-[44px] items-center rounded-full px-3 text-[15px] font-medium text-ink hover:bg-surface">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <CtaLink href="/#contact" className="hidden !min-h-[44px] !px-5 !py-2 text-[15px] sm:inline-flex" event="cta_click" eventProps={{ location: "nav" }}>
            {cta.primary}
          </CtaLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-cream lg:hidden">
        <ul className="mx-auto max-w-content px-4 py-3">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)} className="flex min-h-[48px] items-center border-b border-line/60 text-lg font-medium">
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/resources" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center text-lg font-medium">
              Resources
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
