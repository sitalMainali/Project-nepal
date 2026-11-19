import { cta } from "@/content";
import { T } from "./T";

export function RiskReversal({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 text-sm text-muted ${className}`}>
      <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 flex-none text-terracotta-dark" aria-hidden="true">
        <path fill="currentColor" d="M10 1.5 3 4.2v5.1c0 4.3 3 7.9 7 9.2 4-1.3 7-4.9 7-9.2V4.2L10 1.5zm-1.1 11.8L5.6 10l1.3-1.3 2 2 4.2-4.2 1.3 1.3-5.5 5.5z" />
      </svg>
      <span><T>{cta.riskReversal}</T></span>
    </p>
  );
}
