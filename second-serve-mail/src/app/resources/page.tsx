import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/content";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Resources: email and SMS marketing for restaurants",
  description: "Practical guides on restaurant welcome emails, win-back timing and SMS consent for Brisbane and Australian venues.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesIndex() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="Guides for venue owners" intro="Short, practical reads on email and SMS for restaurants and bars." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {resources.map((r) => (
            <li key={r.slug}>
              <Link href={`/resources/${r.slug}`} className="card group flex h-full flex-col bg-white transition-shadow hover:shadow-lg">
                <h2 className="text-xl font-semibold group-hover:text-terracotta-dark">{r.title}</h2>
                <p className="mt-2 flex-1 text-muted">{r.description}</p>
                <span className="mt-4 font-semibold text-terracotta-dark">Read the guide <span aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
