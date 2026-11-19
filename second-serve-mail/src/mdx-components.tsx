import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { T } from "@/components/ui/T";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children }) =>
      href.startsWith("/") ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    Placeholder: ({ children }: { children: string }) => <T>{children}</T>,
    ...components,
  };
}
