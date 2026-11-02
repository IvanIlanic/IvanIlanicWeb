# Deploy the portfolio to Cloudflare

The portfolio is a static Next.js site: its galleries, globe, marker animation, navigation, and project disclosures run in the browser. Cloudflare can serve the complete site as static assets without a running Next.js server, an API key, a database, or a paid image transformation service.

## Existing Worker: ivanilanicweb

The current Cloudflare project is a Worker named `ivanilanicweb`. Use Workers Static Assets to serve the same prepared export. `wrangler.worker.jsonc` explicitly names that Worker and serves `out/`, with the exported 404 page. It has no service self-reference or Images binding.

1. Open **Workers & Pages → ivanilanicweb → Settings → Build**.
2. Edit and save these build settings:

   | Field | Value |
   | --- | --- |
   | Production branch | `main` |
   | Build command | `npm run build:cloudflare` |
   | Deploy command | `npm run deploy:cloudflare` |
   | Preview / non-production deploy command, if shown | `npm run upload:cloudflare` |
   | Root directory | Repository root; leave the default `/` or blank |

3. Run/retry the build for the **latest commit on `main`**, containing `wrangler.worker.jsonc` and the deployment scripts. Retrying an older commit will not include the fix.
4. On success, open the Worker's **Visit** / `workers.dev` URL. To add a domain, use **Settings → Domains & Routes → Add → Custom Domain** and follow Cloudflare's instructions.

The deployment and version-upload scripts explicitly pass `--config wrangler.worker.jsonc`, which prevents framework auto-configuration from generating a different Next.js server Worker. Wrangler is versioned in `package.json` and installed automatically by the Git build. No account token or application secret needs adding to the repository; Cloudflare supplies deployment authorization for its Git integration.

The preferred search address is already configured as `https://ivanilanic.com`; no `SITE_URL` variable is required. If an older `SITE_URL` build variable is present, remove it or set it to `https://ivanilanic.com`, since it overrides the default. The optional public **build** variable `GOOGLE_SITE_VERIFICATION` can hold the HTML-tag verification value from Google Search Console. Rebuild after changing build variables; these are not runtime Worker bindings. Follow [SEARCH.md](./SEARCH.md) for verification and indexing instructions.

### Why error 10143 occurred

The failed deployment targeted `ivanilanicweb`, while a generated `WORKER_SELF_REFERENCE` binding targeted `ivan-portfolio` (the npm package name). Cloudflare could not resolve that service. The static Worker configuration removes that unnecessary binding and matches the actual Worker name. It also uses the already-generated responsive images, without the generated Next.js image service.

## Alternative: create a Cloudflare Pages project

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

## Add a custom domain to a Pages project

1. Open **Workers & Pages → your Pages project → Custom domains**.
2. Choose **Set up a custom domain**, enter the domain or subdomain you own, and continue.
3. Follow Cloudflare's displayed DNS instructions and wait for the domain status to become **Active**. Cloudflare manages HTTPS for the Pages domain.

For an apex domain such as `example.com`, Cloudflare may require the domain's zone/nameservers to be managed in the same Cloudflare account. A subdomain may be connected using the CNAME instructions shown by the dashboard. Do not replace unrelated DNS records.

## Build and preview locally

```powershell
npm ci
npm run build:cloudflare
npm run preview:cloudflare
```

The preview command runs the static Worker locally. To preview the Pages alternative, use `npx wrangler pages dev out`. For normal Next.js development, continue using `npm run dev`. A manual `npm run deploy:cloudflare` requires Cloudflare CLI authentication; the dashboard Git build handles its deployment authorization automatically.

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
