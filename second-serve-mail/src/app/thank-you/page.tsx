import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content";
import { hasBookingUrl } from "@/lib/booking";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 md:py-28">
      <svg viewBox="0 0 40 40" className="mx-auto h-16 w-16" aria-hidden="true">
        <circle cx="15" cy="20" r="11" fill="#B94E2A" />
        <circle cx="25" cy="20" r="11" fill="#E3B04B" fillOpacity="0.9" />
      </svg>
      <h1 className="mt-6 text-4xl font-semibold sm:text-5xl" data-testid="thank-you-title">
        Thanks, we&apos;ve got your request.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        We&apos;ve emailed you a confirmation and will reply within one business day. If it doesn&apos;t arrive, check your spam folder.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {hasBookingUrl && (
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
            Book a time now<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <Link href="/#calculator" className={buttonClass(hasBookingUrl ? "secondary" : "primary")}>
          Try the revenue calculator
        </Link>
        <Link href="/resources" className={buttonClass("secondary")}>
          Read our guides
        </Link>
      </div>
    </div>
  );
}
