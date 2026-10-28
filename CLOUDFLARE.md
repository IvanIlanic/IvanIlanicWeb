# Deploy the portfolio to Cloudflare Pages

The portfolio is a static Next.js site: its galleries, globe, marker animation, navigation, and project disclosures run in the browser. Cloudflare Pages can serve the complete site without a running Next.js server, an API key, a database, or a paid image transformation service.

## First deployment in the Cloudflare dashboard

1. Open [the Cloudflare dashboard](https://dash.cloudflare.com/) and choose your account.
2. Open **Workers & Pages**, choose **Create application**, and select **Pages**.
3. Choose **Import an existing Git repository** (also called **Connect to Git**).
4. Connect GitHub and allow access to **IvanIlanic/IvanIlanicWeb**. Select that repository and choose **Begin setup**.
5. Use these settings:

   | Field | Value |
   | --- | --- |
   | Project name | `ivan-ilanic-portfolio`, or another available name |
   | Production branch | `main` |
   | Framework preset | `Next.js (Static HTML Export)` |
   | Build command | `npm run build:cloudflare` |
   | Build output directory | `out` |
   | Root directory | Leave blank; `package.json` is at the repository root |
   | Environment variables | None required |

   Replace the preset's default build command with the command above. The image preparation step is part of this command.
6. Select **Save and Deploy**. Cloudflare installs dependencies from the lockfile, generates the responsive photographs, and exports the site.
7. When deployment completes, open the provided **Visit site** / `*.pages.dev` link. This is the public website address; no custom domain is required to use it.

`.node-version` selects Node.js 24 for the build. If your project already has a `NODE_VERSION` override in **Settings → Builds & deployments → Environment variables**, set it to `24` or remove that override so the repository file controls the version. Do not add runtime bindings or environment secrets for this site.

Every subsequent push to `main` triggers a production deployment automatically. Other branches can receive Pages preview deployments.

## Add a custom domain later

1. Open **Workers & Pages → your Pages project → Custom domains**.
2. Choose **Set up a custom domain**, enter the domain or subdomain you own, and continue.
3. Follow Cloudflare's displayed DNS instructions and wait for the domain status to become **Active**. Cloudflare manages HTTPS for the Pages domain.

For an apex domain such as `example.com`, Cloudflare may require the domain's zone/nameservers to be managed in the same Cloudflare account. A subdomain may be connected using the CNAME instructions shown by the dashboard. Do not replace unrelated DNS records.

## Build and preview locally

```powershell
npm ci
npm run build:cloudflare
npx wrangler pages dev out
```

Wrangler is optional for a local Pages preview; the Git-connected dashboard deployment does not require a Wrangler installation, account token, or manual upload command in the repository. For normal development, continue using `npm run dev`.

## How the deployment build works

- `scripts/build-cloudflare.mjs` generates responsive WebP variants for local JPEG/PNG/WebP/AVIF assets using Sharp. Originals remain unchanged in `public/` and Git.
- A content-derived version in every generated URL makes long-lived caching safe when photos change. The build caches image variants under `.next/cache/cloudflare-images/` for reuse.
- The Cloudflare export uses the custom loader in `src/lib/cloudflare-image-loader.ts` and the sizes in `src/lib/static-image-config.json`. Both `<Image>` and `getImageProps` use the same generated assets, including the hero title texture and editing animation.
- The script enables static export for this build only, then writes the complete website to `out/`. Normal Next.js development and Node production builds retain their existing configuration.
- The deployed output omits unused copies of the full-resolution originals, and includes the optimized versions instead. All application image rendering must continue using Next's `<Image>` or `getImageProps`; direct links to original raster paths are not deployment download links. Local SVGs and the geographic map data remain static files.
- `public/_headers` supplies immutable cache headers for versioned images and Next.js assets.
- The final build checks that no file exceeds Pages' 25 MiB per-file limit, that the asset count stays within 20,000, and that the HTML has no dependency on the Next.js image server.
- Generated `out/`, `public/_optimized/`, `.next/`, and `.wrangler/` are ignored by Git. Cloudflare recreates the deployment from the committed source.

If server actions, authenticated server routes, or a backend are added later, reassess the static export before deploying those features.

Official references: [Cloudflare's static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) and [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
