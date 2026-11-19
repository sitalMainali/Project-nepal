"use client";

import { useState } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { LeadInput } from "@/lib/schemas";

export type SubmitState = "idle" | "submitting" | "success" | "error";

export function useLeadSubmit<T extends FieldValues>(setError: UseFormSetError<T>) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetKey, setResetKey] = useState(0);

  async function submit(payload: LeadInput): Promise<boolean> {
    setState("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, turnstileToken: turnstileToken || undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[]>;
      };
      if (!res.ok || !data.ok) {
        if (data.fieldErrors) {
          for (const [k, v] of Object.entries(data.fieldErrors)) {
            if (v?.[0]) setError(k as Path<T>, { type: "server", message: v[0] });
          }
        }
        setState("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        setResetKey((k) => k + 1);
        return false;
      }
      try {
        sessionStorage.setItem("ss-lead-submitted", "1");
      } catch {}
      setState("success");
      return true;
    } catch {
      setState("error");
      setMessage("We couldn't reach the server. Check your connection and try again.");
      setResetKey((k) => k + 1);
      return false;
    }
  }

  return { state, message, submit, setTurnstileToken, resetKey };
}
