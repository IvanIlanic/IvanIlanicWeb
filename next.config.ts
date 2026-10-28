import type { NextConfig } from "next";
import imageSizes from "./src/lib/static-image-config.json";

const staticExport = process.env.CLOUDFLARE_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  ...(staticExport && {
    output: "export",
    images: {
      loader: "custom",
      loaderFile: "./src/lib/cloudflare-image-loader.ts",
      ...imageSizes,
    },
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
