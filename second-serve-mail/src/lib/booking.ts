import { site } from "@/content";

export const hasBookingUrl = /^https:\/\//.test(site.bookingUrl);

/** Embed URL for Cal.com or Calendly inline iframes. */
export function bookingEmbedUrl(url: string = site.bookingUrl): string | null {
  if (!/^https:\/\//.test(url)) return null;
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("calendly.com")) {
      u.searchParams.set("hide_gdpr_banner", "1");
      u.searchParams.set("primary_color", "B94E2A");
      return u.toString();
    }
    if (u.hostname.endsWith("cal.com")) {
      u.searchParams.set("embed", "true");
      u.searchParams.set("theme", "light");
      return u.toString();
    }
    return u.toString();
  } catch {
    return null;
  }
}
