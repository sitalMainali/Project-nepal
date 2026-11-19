import Link from "next/link";
import { site } from "@/content";
import { Logo } from "@/components/ui/Logo";
import { T, isPlaceholder } from "@/components/ui/T";
import { CookieSettingsButton } from "./CookieBanner";

export function Footer() {
  const socials = site.social.filter((s) => s.href);
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-content gap-10 px-4 pb-28 pt-14 sm:px-6 md:grid-cols-4 md:pb-14">
        <div className="md:col-span-2">
          <div className="inline-flex rounded-xl bg-cream px-3 py-2">
            <Logo />
          </div>
          <p className="mt-4 max-w-sm text-cream/85">{site.tagline}</p>
          <address className="mt-4 not-italic text-cream/85">
            {site.locality}, {site.region}, Australia
            <br />
            {isPlaceholder(site.email) ? (
              <T>{site.email}</T>
            ) : (
              <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-gold">{site.email}</a>
            )}
            <br />
            {isPlaceholder(site.phone) ? (
              <T>{site.phone}</T>
            ) : (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="underline underline-offset-2 hover:text-gold">{site.phone}</a>
            )}
          </address>
          <p className="mt-2 text-sm text-cream/75">ABN <T>{site.abn}</T></p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-cream/75">Explore</h2>
          <ul className="mt-3 space-y-1">
            {[
              ["/#how-it-works", "How it works"],
              ["/#calculator", "Revenue calculator"],
              ["/#pricing", "Pricing"],
              ["/#health-check", "Free health check"],
              ["/resources", "Resources"],
              ["/reviews", "Reviews"],
              ["/book", "Book a call"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-[44px] items-center hover:text-gold">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-cream/75">Legal</h2>
          <ul className="mt-3 space-y-1">
            <li><Link href="/privacy" className="inline-flex min-h-[44px] items-center hover:text-gold">Privacy policy</Link></li>
            <li><Link href="/terms" className="inline-flex min-h-[44px] items-center hover:text-gold">Terms</Link></li>
            <li><Link href="/spam-act-compliance" className="inline-flex min-h-[44px] items-center hover:text-gold">Spam Act and consent policy</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
          {socials.length > 0 && (
            <>
              <h2 className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-cream/75">Follow</h2>
              <ul className="mt-3 flex flex-wrap gap-x-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center hover:text-gold">
                      {s.label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <p className="border-t border-cream/15 pt-6 text-sm text-cream/75 md:col-span-4">
          © {new Date().getFullYear()} {site.name}. Every message we send is consent-based and includes a working unsubscribe.
        </p>
      </div>
    </footer>
  );
}
