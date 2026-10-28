# Ivan Ilanić — personal portfolio

A cinematic first homepage built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and Motion for React. Includes a full-color photographic hero with image-filled typography and a manual three-scene selector, editorial about section, filterable photography gallery with an accessible lightbox, travel journal preview, project disclosure, and contact section.

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

- `src/app/page.tsx`: section composition and contact copy.
- `src/data/profile.ts`: editable profile roles, introduction, three personal themes, and metadata summary.
- `src/components/`: interactive landscape hero, responsive navigation, gallery, shared entrance animation, and icons. The hero scene records live alongside the hero component.
- `src/hooks/use-pointer-parallax.ts`: spring-smoothed, mouse-only layered movement with reduced-motion and touch safeguards.
- `src/data/portfolio.ts`: typed photograph records, captions, alternative text, categories, and credits.
- `src/app/globals.css`: Tailwind entry point, shared design tokens, editorial layouts, breakpoints, and reduced-motion styles.
- `src/app/layout.tsx`: local fonts and page metadata.
- `public/images/`: sample photographs. Credits are visible on the website and in each gallery record. The reference project's MIT notice is retained here.

The default hero uses the photograph supplied by Ivan. The gallery photographs and alternate hero scenes are still credited design samples, **not Ivan's own work**. Biography copy is a draft. No personal achievements, travel history, film releases, or contact email are invented; these sections can grow as real content is supplied. The GitHub profile is the initial contact destination.

## Why this structure?

The page stays a Server Component. Only interactions and animated reveals use client components, limiting browser JavaScript. The hero has three manually selected scenes, with no autoplay, canvas, or additional animation dependencies. CSS clips a photographic texture into the oversized name, with a solid-text fallback. The surrounding palette is charcoal and silver with restrained blush accents; hero photographs keep their natural color. The default Dusk scene uses IvanHero.jpg, supplied by Ivan. The image-filled title uses a lightly highlighted, optimized texture for legibility over darker photographs. `next/image` supplies responsive optimized images; the hero is preloaded and other photography is lazy-loaded. Local fonts avoid build-time network dependencies. Native `<dialog>` provides focus containment and Escape behavior, with explicit focus restoration and scroll locking. Native `<details>` handles project disclosure without additional JavaScript.

Motion animates transforms and opacity once as content enters view. On mouse movement (including on touch-capable laptops), the hero landscape follows the cursor with a noticeable opposite offset while the title moves more gently in the other direction. Overscan hides image edges. Spring motion values keep pointer updates outside React rendering; movement resets on pointer exit or window blur and ignores touch gestures and turns off for reduced motion, including preference changes while the page is open. The CSS hero entrance and anchor scrolling respect reduced-motion preferences. GSAP, Lenis, and React Three Fiber are intentionally deferred until a specific interaction calls for them.

Next steps: replace samples with personal photos, approve the biography, add a real contact destination, and expand the first travel or project story. Video, a full achievements timeline, and 3D effects are future iterations.

## Add your photos

1. Drag your photo files into `public/images/` in your editor. Use simple names such as `my-mountain.jpg`. There is no in-site upload form; these files are part of the project.
2. For the homepage scenes, edit `src/components/hero.tsx`. Change a scene's `src` to `/images/my-mountain.jpg` and update its `alt`, `label`, and `note`.
3. For the gallery, edit `src/data/portfolio.ts`. Update a record's `src`, `title`, `alt`, `location`, and credits. A public URL starts at `/images/`, never `/public/images/`.
4. Landscape JPEG or WebP files around 2000–3000 pixels wide work well for the fullscreen hero. Use new filenames when replacing photos to avoid a browser serving an older optimized image.

If development styles or motion appear stale after pulling an update, stop the server with Ctrl+C, run `git pull origin main`, run `npm ci` if dependencies changed, then start `npm run dev` again and refresh the browser. Mouse parallax respects your system's reduced-motion setting, so it stays still when reduced motion is enabled.

## Scuba diving section

`src/data/diving.ts` holds the story, certification progression, and three photo records. Open Water Diver and Advanced Open Water Diver are marked completed; Divemaster is a summer goal, not an earned qualification. No certification agency, dive counts, or dates are assumed.

To add the three photos:

1. Put `diving-01.jpg`, `diving-02.jpg`, and `diving-03.jpg` in `public/images/`.
2. In `src/data/diving.ts`, replace each photo's `src: null` with its path, e.g. `src: "/images/diving-01.jpg"`.
3. Update each `alt` to describe your actual photograph and edit its caption if needed.

Until paths are supplied, the section renders intentional underwater-themed placeholders, with no requests for missing images. The photo layout and lazy-loaded Next.js images adapt to desktop and mobile screens.

The diving photos appear as cream paper prints with tilted resting angles, paper edges, tape, and soft shadows. Mouse movement adds spring-smoothed CSS 3D rotation and lift; touch gestures remain still, and reduced motion immediately disables interactive tilt. No WebGL dependency is needed. Click or keyboard-activate a print to view the uncropped photo; use left/right arrows to browse and Escape to close. Focus returns to the print you opened.

The print gallery lives in `src/components/diving-photo-gallery.tsx`, with motion behavior in `src/hooks/use-photo-tilt.ts`. Photos and captions remain in `src/data/diving.ts`.

## Snowboarding section

`src/data/snowboarding.ts` contains the story, current skills, favorite terrain, and instructor ambition. The section describes snowboarding being financially out of reach in childhood, loving it now, frontside/backside 180s, butter 360s, switch riding, jumps, powder, and black runs. Becoming an instructor is presented as a goal for the coming years, not a current qualification.

A winter-themed illustration occupies the personal-photo slot until a photo is supplied. To add one, place your image in `public/images/` and change `snowboarding.photo.src` from `null` to a public path such as `"/images/snowboarding-01.jpg"`; update its `alt` and caption to match. The section component is `src/components/snowboarding-section.tsx`.

## Problems and projects

`src/data/projects.ts` holds three problem/approach case studies: Beerluga, Defend the Flag, and small-business digitalization with Kazuni Nina as a concrete storefront example. `src/components/projects-section.tsx` renders the section. Project branding assets are copied from Ivan's public repositories; the artwork panels show project identity, not application screenshots. The cards avoid unverified adoption, performance, client, revenue, or research claims.

Source material reviewed:

- `IvanIlanic/beerluga`: README, `src/main.jsx`, package manifest, and the canonical website URL in `index.html`. Current source uses MapLibre, despite the older README mentioning Leaflet.
- `IvanIlanic/defendTheFlag`: README, learning-model copy in `frontend/src/pages/Home.jsx`, frontend manifest, backend models, and practice-challenge directories.
- `IvanIlanic/KazuniNina`: README and package manifest describing the storefront and request workflow. No production deployment, paid-client relationship, online payments, or commercial outcomes are claimed.

Ivan supplied the Defend the Flag paper link: https://skemman.is/handle/1946/53559?locale=en. It is saved in `paperUrl` and shown as “Read the paper.” Although the network proxy blocks Skemman, the uploaded PDF has now been reviewed. The source is _Defend the Flag: The Educational Prospect of Creating Defensive Cybersecurity Challenges_, Ivan Ilanic, bachelor’s thesis in Computer Science, Reykjavík University, May 18, 2026. The case study follows the abstract and chapters 1, 3, 5–8: narrative-led local Ubuntu VM challenges, system-state checking, progressive terminal guidance, two challenge instances (SQL injection and Ubuntu administration), and a reusable challenge-creation template. The team-based React/Django web model is distinguished from the thesis’s main challenge prototype. Chapter 7 identifies learner evaluation as future work; no measured learning gains, study results, grades, or peer-review status are claimed. The uploaded PDF is used as a source and is not copied into the public site. The Beerluga website URL comes from its source metadata; live availability was not established from this environment.

## Animated editing study

The photography section includes `src/components/editing-story.tsx`: a four-stage editing thought process that starts once the example frame is mostly in view. Thicker hand-drawn SVG paths and stroke-by-stroke marker lettering annotate shadow recovery, subject brightening, background darkening, and a soft upper-right exposure gradient. The sequence takes six seconds. The annotations use hand-authored pen centerlines in `src/data/marker-lettering.ts`, with no font or text reveal mask. Every letter stroke draws in writing order, including pen lifts, dots, and crossbars; the two-line subject note writes its second line after its first. Stroke lengths determine the writing pace. The six-second sequence and its exposure adjustments share one progress value, so pause, replay, and manual step selection stay synchronized. Replay, pause/continue, individual-step controls, and a notes toggle keep the sequence controllable. It pauses when the frame leaves view and shows a still final state for reduced motion; step controls remain usable without animation.

`src/data/editing-story.ts` holds the image, alt text, captions, step notes, duration, and subject-mask paths. The current image is Ivan’s full-resolution `public/images/Vehicle.jpg`. The earlier AI-retouched demonstration PNG is no longer used in this section. Replace `image.src` and update the caption when changing the photo; align the masks if the crop changes. The paths use a 640 × 960 portrait coordinate system. Runtime SVG layers illustrate the editing decisions without modifying the image file. The light adjustment uses a gradient-masked exposure filter on the same photo, rather than a painted flare; professional retouching may require refined masks or a separately prepared final image.

The optimized image URL from Next.js is shared by all SVG layers. It is requested near the viewport; animations run only for this finite sequence. No GSAP, canvas, or additional animation dependencies are installed. All layers reuse the optimized `Vehicle.jpg` request.

## Travel journal and photo booth

The former journal placeholder is now a personal travel story about openness to opportunities, unfamiliar places, and stepping outside a comfort zone. It follows the full-screen travel introduction and links from the Travel navigation item.

`src/data/travel.ts` contains the story and all 18 personal travel photographs supplied by Ivan under `public/images/Travel*.png`. Each record has descriptive alternative text, a short caption, and an optional `objectPosition` to keep subjects visible in the cropped previews. Edit the array to reorder the collection, change captions, or add photographs. No dates or unverified itineraries are invented.

`src/components/travel-photo-booth.tsx` displays all 18 photographs together in six three-frame cream paper strips. A responsive CSS grid scatters the strips around the central story and across the rest of the section; tablet and mobile layouts use staggered columns. Each strip has its own resting angle, optional mouse/keyboard 3D tilt, and a small scroll-linked drift. There is no autoplay or pagination. Reduced-motion preferences disable drift and tilt, while the resting print angles remain. Click any photograph to open an uncropped native-dialog viewer with previous/next buttons, left/right arrow keys, Escape, focus restoration, and background scroll locking. Next.js lazy-loads optimized responsive images while preserving the originals. `src/components/travel-section.tsx` passes its server-rendered story into the collage. No additional dependencies are needed.
