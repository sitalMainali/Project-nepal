"use client";

import { site } from "@/content";
import { bookingEmbedUrl } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { T } from "@/components/ui/T";

export function BookingEmbed({ height = 680 }: { height?: number }) {
  const src = bookingEmbedUrl();
  if (!src) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-card border-2 border-dashed border-line bg-white p-8 text-center" data-testid="booking-placeholder">
        <p className="font-serif text-xl font-semibold">Online booking coming soon</p>
        <p className="mt-2 max-w-sm text-muted">
          Booking calendar: <T>{site.bookingUrl}</T>
        </p>
        <p className="mt-3 text-muted">In the meantime, use the form and we&apos;ll reply within one business day.</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-card bg-white ring-1 ring-line">
      <iframe
        src={src}
        title="Book a free guest-list audit call"
        loading="lazy"
        className="block w-full"
        style={{ height }}
        onFocus={() => track("booking_click", { location: "embed" })}
      />
      <p className="border-t border-line p-3 text-center text-sm">
        Calendar not loading?{" "}
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("booking_click", { location: "embed-fallback" })}
          className="font-semibold text-terracotta-dark underline underline-offset-2"
        >
          Open the booking page<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
