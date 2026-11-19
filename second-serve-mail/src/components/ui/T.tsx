import { Fragment } from "react";

/**
 * Renders a content string, highlighting any [PLACEHOLDER] so the owner can
 * spot what still needs filling in.
 */
export function T({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\[[^\]]+\]$/.test(p) ? (
          <mark key={i} className="placeholder" title="Placeholder: edit in src/content.ts">
            {p}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export const isPlaceholder = (s: string) => /\[[^\]]+\]/.test(s);
