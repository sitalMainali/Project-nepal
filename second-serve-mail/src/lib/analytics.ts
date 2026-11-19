/**
 * Analytics events. Sends to Plausible and/or GA4, but only after the visitor
 * accepts the cookie banner (the scripts aren't loaded before then, so these
 * calls are no-ops).
 */
export type AnalyticsEvent =
  | "calculator_used"
  | "calculator_reset"
  | "calculator_email_submitted"
  | "audit_form_submitted"
  | "health_check_submitted"
  | "testimonial_submitted"
  | "booking_click"
  | "cta_click";

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, { props });
    window.gtag?.("event", event, props);
  } catch {
    /* never let analytics break the page */
  }
}
