import type { Metadata } from "next";
import { contact, cta } from "@/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookingEmbed } from "@/components/sections/BookingEmbed";
import { AuditForm } from "@/components/forms/AuditForm";
import { RiskReversal } from "@/components/ui/RiskReversal";

export const metadata: Metadata = {
  title: "Book a free guest-list audit",
  description: "Book a free 20-minute guest-list audit call with Second Serve Mail, Brisbane's email and SMS retention specialist for restaurants and bars.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <PageHeader eyebrow={cta.primary} title={contact.heading} intro={<><p>{contact.body}</p><RiskReversal className="mt-4" /></>} />
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">{contact.bookingHeading}</h2>
          <BookingEmbed height={760} />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">{contact.formHeading}</h2>
          <div className="card bg-white">
            <AuditForm idPrefix="book" />
          </div>
        </div>
      </div>
    </>
  );
}
