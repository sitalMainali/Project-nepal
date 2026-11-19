import Link from "next/link";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-serif text-7xl font-semibold text-terracotta-dark">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">This table&apos;s not on the floor plan.</h1>
      <p className="mt-4 text-lg text-muted">The page you&apos;re after has moved or never existed. Let&apos;s get you back to somewhere useful.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className={buttonClass("primary")}>Back to home</Link>
        <Link href="/#calculator" className={buttonClass("secondary")}>Try the calculator</Link>
      </div>
    </div>
  );
}
