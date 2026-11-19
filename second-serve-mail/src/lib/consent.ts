export const CONSENT_KEY = "ss-cookie-consent";
export const CONSENT_EVENT = "ss-consent-change";
export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* storage blocked: banner will show again next visit */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}
