"use client";

import type { ImageLoaderProps } from "next/image";

/** Responsive files are generated locally at build time for Cloudflare Pages. */
export default function cloudflareImageLoader({
  src,
  width,
}: ImageLoaderProps) {
  if (src.endsWith(".svg")) return src;
  if (!src.startsWith("/") || src.startsWith("//") || /[?#]/.test(src)) {
    throw new Error(
      "The static image loader requires a local public image path.",
    );
  }
  const version = process.env.NEXT_PUBLIC_IMAGE_VERSION;
  if (!version) {
    throw new Error("Use npm run build:cloudflare to generate static images.");
  }
  return encodeURI(`/_optimized/${version}${src}-${width}.webp`);
}
