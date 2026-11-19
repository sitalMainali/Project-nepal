"use client";

import Link from "next/link";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { ReactNode } from "react";
import type { SubmitState } from "./useLeadSubmit";

type BaseProps = {
  id: string;
  label: string;
  error?: FieldError;
  hint?: string;
  optional?: boolean;
  registration: UseFormRegisterReturn;
};

function describedBy(id: string, error?: FieldError, hint?: string) {
  return [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
}

function Label({ id, label, optional }: { id: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={id} className="field-label">
      {label} {optional && <span className="font-normal text-muted">(optional)</span>}
    </label>
  );
}

function FieldErrorMsg({ id, error }: { id: string; error?: FieldError }) {
  return error?.message ? (
    <p id={`${id}-error`} className="field-error" role="alert">
      {error.message}
    </p>
  ) : null;
}

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  ...p
}: BaseProps & { type?: string; autoComplete?: string; inputMode?: "text" | "email" | "tel" | "numeric" }) {
  return (
    <div>
      <Label {...p} />
      <input
        id={p.id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="field"
        aria-invalid={p.error ? "true" : "false"}
        aria-required={!p.optional}
        aria-describedby={describedBy(p.id, p.error, p.hint)}
        {...p.registration}
      />
      {p.hint && <p id={`${p.id}-hint`} className="field-hint">{p.hint}</p>}
      <FieldErrorMsg id={p.id} error={p.error} />
    </div>
  );
}

export function TextArea(p: BaseProps & { rows?: number }) {
  return (
    <div>
      <Label {...p} />
      <textarea
        id={p.id}
        rows={p.rows ?? 4}
        className="field"
        aria-invalid={p.error ? "true" : "false"}
        aria-required={!p.optional}
        aria-describedby={describedBy(p.id, p.error, p.hint)}
        {...p.registration}
      />
      {p.hint && <p id={`${p.id}-hint`} className="field-hint">{p.hint}</p>}
      <FieldErrorMsg id={p.id} error={p.error} />
    </div>
  );
}

export function SelectField(p: BaseProps & { options: string[]; placeholder?: string }) {
  return (
    <div>
      <Label {...p} />
      <select
        id={p.id}
        className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><path d=%22M5 7l5 5 5-5%22 fill=%22none%22 stroke=%22%231F2A24%22 stroke-width=%222%22/></svg>')] bg-[length:20px] bg-[right_0.9rem_center] bg-no-repeat pr-10"
        aria-invalid={p.error ? "true" : "false"}
        aria-required={!p.optional}
        aria-describedby={describedBy(p.id, p.error, p.hint)}
        defaultValue=""
        {...p.registration}
      >
        <option value="" disabled={!p.optional}>
          {p.placeholder ?? "Choose one"}
        </option>
        {p.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldErrorMsg id={p.id} error={p.error} />
    </div>
  );
}

export function Checkbox({ id, registration, error, children }: { id: string; registration: UseFormRegisterReturn; error?: FieldError; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-6 w-6 flex-none cursor-pointer rounded border-[#8C8577] accent-terracotta"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...registration}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink">
          {children}
        </label>
      </div>
      <FieldErrorMsg id={id} error={error} />
    </div>
  );
}

export function ConsentText() {
  return (
    <>
      I agree to Second Serve Mail using these details to respond to me, as described in the{" "}
      <Link href="/privacy" className="font-semibold text-terracotta-dark underline underline-offset-2">
        privacy policy
      </Link>
      . We won&apos;t add you to any marketing list without asking.
    </>
  );
}

/** Honeypot: hidden from people and assistive tech; bots fill it in. */
export function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}

export function SubmitButton({ state, children }: { state: SubmitState; children: ReactNode }) {
  const busy = state === "submitting";
  return (
    <button
      type="submit"
      disabled={busy}
      aria-disabled={busy}
      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-terracotta-dark disabled:cursor-wait disabled:opacity-80 sm:w-auto"
    >
      {busy && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
          <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      )}
      {busy ? "Sending…" : children}
    </button>
  );
}

export function FormStatus({ state, message }: { state: SubmitState; message: string }) {
  return (
    <div aria-live="polite" role="status">
      {state === "error" && (
        <p className="rounded-xl bg-[#F7E2DA] px-4 py-3 text-sm font-medium text-[#7A2E15]">{message}</p>
      )}
    </div>
  );
}

export function SuccessPanel({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div role="status" aria-live="polite" className="rounded-card bg-[#E4EEE5] p-6 text-ink ring-1 ring-[#B9D2BE]" data-testid="form-success">
      <p className="font-serif text-xl font-semibold">{title}</p>
      {children && <div className="mt-2 text-muted">{children}</div>}
    </div>
  );
}
