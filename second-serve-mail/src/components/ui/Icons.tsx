import type { CompareStatus } from "@/content";

export function StatusIcon({ status, className = "h-5 w-5" }: { status: CompareStatus; className?: string }) {
  if (status === "yes")
    return (
      <svg viewBox="0 0 20 20" className={`${className} text-[#2F6B45]`} aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
        <path d="m5.8 10.3 2.7 2.7 5.7-5.9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (status === "no")
    return (
      <svg viewBox="0 0 20 20" className={`${className} text-terracotta-dark`} aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
        <path d="m7 7 6 6m0-6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" className={`${className} text-[#7A5A12]`} aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
      <path d="M6 10h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export const statusLabel: Record<CompareStatus, string> = { yes: "Yes", no: "No", partly: "Partly" };

export function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="m5 10.5 3.2 3.2L15 6.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="flex gap-0.5" role="img" aria-label={`Rated ${r} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < r ? "text-[#A0700F]" : "text-line"}`} aria-hidden="true">
          <path fill="currentColor" d="m10 1.6 2.5 5.4 5.9.6-4.4 4 1.2 5.8L10 14.5l-5.2 2.9L6 11.6l-4.4-4 5.9-.6z" />
        </svg>
      ))}
    </span>
  );
}
