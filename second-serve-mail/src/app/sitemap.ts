import type { MetadataRoute } from "next";
import { resources, site } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "monthly"],
    ["/book", 0.9, "monthly"],
    ["/reviews", 0.6, "monthly"],
    ["/resources", 0.6, "monthly"],
    ["/spam-act-compliance", 0.4, "yearly"],
    ["/privacy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority })),
    ...resources.map((r) => ({ url: `${site.url}/resources/${r.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
