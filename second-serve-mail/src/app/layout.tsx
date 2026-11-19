import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/content";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { HealthCheckPrompt } from "@/components/layout/HealthCheckPrompt";
import { MotionObserver } from "@/components/MotionObserver";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-fraunces", weight: ["500", "600"] });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Brisbane Restaurant Email & SMS Marketing | Second Serve Mail",
    template: "%s | Second Serve Mail",
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: site.url,
    title: "Second Serve Mail: Email & SMS retention for Brisbane restaurants",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F8F3EA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Enable fade-up only when JS is running, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "if('IntersectionObserver' in window)document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <CookieBanner />
        <Suspense fallback={null}>
          <HealthCheckPrompt />
        </Suspense>
        <MotionObserver />
      </body>
    </html>
  );
}
