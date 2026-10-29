import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Sections are anchors on one page, so only the actual page URL belongs here.
  return site.url ? [{ url: `${site.url}/` }] : [];
}
