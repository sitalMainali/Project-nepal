"use client";

import { usePathname } from "next/navigation";
import { cta } from "@/content";
import { CtaLink } from "@/components/ui/CtaLink";

const HIDDEN_ON = ["/book", "/thank-you"];

export function MobileCtaBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden" data-testid="mobile-cta">
      <CtaLink href="/#contact" className="w-full" event="cta_click" eventProps={{ location: "mobile-bar" }}>
        {cta.mobileBar}
      </CtaLink>
    </div>
  );
}
