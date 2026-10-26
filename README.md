# Ivan Ilanić — personal portfolio

A cinematic first homepage built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and Motion for React. Includes a monochrome landscape hero with image-filled typography and a manual three-scene selector, editorial about section, filterable photography gallery with an accessible lightbox, travel journal preview, project disclosure, and contact section.

## Develop

Use Node.js 24 LTS and npm (verified with Node 24.19.0 / npm 11.9.0).

```sh
npm ci
npm run dev -- --hostname 0.0.0.0
```

No credentials, database, or environment variables are required. Images and fonts are local; normal rendering requires no third-party image or font requests.

## Validate

```sh
npm run lint
npm run build
npm run start -- --hostname 0.0.0.0
```

The build includes TypeScript checking. Stop the development server before starting production on the same port. Keep build and dev runs separate to avoid stale development artifacts.

Browser checks for this iteration: gallery filtering; open/close lightbox; previous/next and arrow keys; Escape and restored trigger focus; mobile menu; expandable project; no horizontal overflow at 375, 390, 768, and 1440 pixels; reduced-motion rendering; successful image loads; no browser exceptions.

## Make it yours

- `src/app/page.tsx`: section composition and draft biography/contact copy.
- `src/components/`: interactive landscape hero, responsive navigation, gallery, shared entrance animation, and icons. The hero scene records live alongside the hero component.
- `src/data/portfolio.ts`: typed photograph records, captions, alternative text, categories, and credits.
- `src/app/globals.css`: Tailwind entry point, shared design tokens, editorial layouts, breakpoints, and reduced-motion styles.
- `src/app/layout.tsx`: local fonts and page metadata.
- `public/images/`: sample photographs. Credits are visible on the website and in each gallery record. The reference project's MIT notice is retained here.

The photographs are design samples, **not Ivan's own work**. Biography copy is a draft. No personal achievements, travel history, film releases, or contact email are invented; these sections can grow as real content is supplied. The GitHub profile is the initial contact destination.

## Why this structure?

The page stays a Server Component. Only interactions and animated reveals use client components, limiting browser JavaScript. The hero has three manually selected scenes, with no autoplay, canvas, or additional animation dependencies. CSS clips a photographic texture into the oversized name, with a solid-text fallback. The palette is charcoal and silver with restrained blush accents. `next/image` supplies responsive optimized images; the hero is preloaded and other photography is lazy-loaded. Local fonts avoid build-time network dependencies. Native `<dialog>` provides focus containment and Escape behavior, with explicit focus restoration and scroll locking. Native `<details>` handles project disclosure without additional JavaScript.

Motion animates transforms and opacity once as content enters view. The CSS hero entrance and anchor scrolling respect reduced-motion preferences. GSAP, Lenis, and React Three Fiber are intentionally deferred until a specific interaction calls for them.

Next steps: replace samples with personal photos, approve the biography, add a real contact destination, and expand the first travel or project story. Video, a full achievements timeline, and 3D effects are future iterations.
