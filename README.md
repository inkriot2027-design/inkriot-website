# INKRIOT® — Creative & Digital Studio Website

A production-ready, multidisciplinary creative-studio website built with **Next.js 14 (App Router)**. Light editorial design, real WebGL/interaction work, and the genuine React Bits component library integrated into the INKRIOT system.

> **We create. You get noticed.** — Different mediums. One creative mindset.

---

## Highlights

- **Image-trail cursor** — a GSAP image-trail (Codrops-style) that reveals INKRIOT imagery along the pointer's path, tuned and integrated as a transparent, click-through overlay. The native arrow cursor always stays usable.
- **Editorial image hero** — a light, premium Home entrance built around a hero image (the mannequin), with an oversized brand wordmark, restrained typography and a subtle fade/scale entrance. (The earlier scroll-scrub video hero was removed; the MP4s remain in `public/videos/` for future use.)
- **Real React Bits components** — Bubble Menu (nav), Dock (home), Chroma Grid (Time Pass), Stepper (Careers), Glass Icons, Border Glow, Glare Hover, Gradient Waves, and the text animations (Blur / Shiny / Gradient / Fold / True Focus / Rotating / Split), vendored from the React Bits source and adapted to the INKRIOT design system.
- **Light design system** — off-white `#F5F4F0` base, black typography, intentional INKRIOT accents (red / green / blue / orange / yellow). No dark page backgrounds.
- **Firebase-ready auth** with a local mock fallback, and a working contact form backend.

---

## Tech stack

- **Framework:** Next.js 14.2.x (App Router, JavaScript)
- **UI:** React 18
- **3D / WebGL:** three.js (Spirit cursor), ogl (Gradient Waves)
- **Animation:** GSAP + @gsap/react, motion (Framer Motion), Lenis (smooth scroll)
- **Physics:** matter-js (Time Pass playground)
- **Auth:** Firebase Auth (optional) + local mock
- **Styling:** CSS Modules + a global design-token system

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional — all values optional
npm run dev                    # http://localhost:3000

# production
npm run build
npm run start
```

The site runs fully **without any configuration** — Firebase and the contact webhook both have graceful fallbacks.

---

## Environment variables

All optional. Copy `.env.example` → `.env.local`.

| Variable | Purpose | If empty |
| --- | --- | --- |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase web config for real auth | Local mock auth is used |
| `CONTACT_WEBHOOK_URL` | Where contact submissions are POSTed | Submissions are logged, success returned |
| `CONTACT_FORWARD_EMAIL` | Notification address | Ignored |

---

## Routes

`/` Home · `/about` · `/services` · `/portfolio` + `/portfolio/[slug]` · `/digital` · `/store` · `/careers` · `/lab` · `/time-pass` · `/journal` · `/gallery` · `/contact` · `/sign-in` · `/api/contact`

---

## Project structure

```
src/
├─ app/                      App Router routes (one folder per page)
│  ├─ layout.js              root layout, SEO metadata, fonts
│  ├─ page.js                HOME (video hero, dock, sections)
│  ├─ <route>/page.js        each page
│  └─ api/contact/route.js   contact endpoint
├─ components/
│  ├─ cursor/                SpiritCursor + authentic shaders
│  ├─ home/                  HomeVideoSequence (dual-video scrub), HomeDock, CreativeWorlds
│  ├─ layout/                AppShell, MainNav (BubbleMenu), SmoothScroll, LoadingExperience, Footer
│  ├─ gallery/               InteractiveGallery
│  ├─ portfolio/             DissolveImage
│  ├─ timepass/              PhysicsTags (matter-js)
│  ├─ reactbits/             REAL React Bits components + INKRIOT adapters
│  └─ ui/                    icons, primitives
├─ data/                     all site content (nav, services, portfolio, …)
├─ hooks/                    reduced-motion, in-view, …
├─ lib/                      firebase.js, auth.jsx
└─ styles/                   globals.css (light design system), fonts.css
```

---

## React Bits integration

The real components live in `src/components/reactbits/`. Because the jsrepo CLI needs network access not available in every build environment, the components were taken from the React Bits source and vendored directly. Where a component's raw API differed from how INKRIOT uses it, a thin **adapter** wraps the real component (e.g. `GradientWaves.jsx` → `GradientWavesReal.jsx`, `GlassIcons.jsx` → `GlassIconsReal.jsx`, `BorderGlow.jsx` → `BorderGlowReal.jsx`, `GlareHover.jsx` → `GlareHoverReal.jsx`). The `*Real.jsx` file is the untouched component; the adapter maps INKRIOT props/colors onto it.

Component mapping:

| Component | Used for |
| --- | --- |
| Bubble Menu | main navigation (`MainNav`) |
| Dock | Home quick-nav |
| Chroma Grid | Time Pass gallery |
| Stepper | Careers application |
| Glass Icons | Services / Portfolio discipline tiles |
| Border Glow | premium cards / CTAs |
| Glare Hover | work cards, media, shapes |
| Gradient Waves | page/section backgrounds (light horizon; never over the video) |
| Blur / Shiny / Gradient / Fold / True Focus / Rotating / Split Text | selective supporting text & headings |
| Animated List | Services "at a glance" list |

---

## Signature features

### Image-trail cursor (`components/cursor/ImageTrailCursor.jsx`)
A React/Next port of the supplied GSAP image-trail: as the pointer moves past a
distance threshold, the next image in a cycling pool of local INKRIOT visuals is
revealed at the cursor and tweened (expo.out) toward the live pointer, then faded
(power1.out) and scaled down (power4.out). Fixed, `pointer-events:none` overlay so
it never blocks clicks/scroll/menu/dock; disabled on touch and reduced-motion;
single RAF loop with full GSAP + listener cleanup on unmount (no duplicate trails
across route changes). Uses only local images — no external requests.


### Home hero (`components/home/HomeHero.jsx`)
A light editorial entrance: the hero image is the visual anchor, centered over an
oversized outlined INKRIOT wordmark, flanked by a headline (with Gradient/Rotating
text) and supporting copy + CTAs. Enters with a restrained fade + 96%→100% scale
and a staggered reveal of the rails, then settles so normal scrolling continues.
The image uses `object-fit: contain` (never cropped/stretched) and its background
was matched to the page's `#F5F4F0` so it blends seamlessly — no dark container.
Fully responsive (rails stack below the figure on small screens). No video canvas,
RAF loop, or preloads run on Home anymore.


### Fonts (Tungsten / Oswald)
The identity uses **Tungsten** (licensed). To keep the project runnable, `Tungsten` maps to **Oswald** (loaded via `<link>` in `layout.js`). Drop real `Tungsten-*.woff2` into `public/fonts/` and uncomment the `@font-face` blocks in `src/styles/fonts.css` to override.

> Fonts load at runtime via `<link>` (build-time font optimization is disabled via `optimizeFonts: false` so the build never needs to reach Google Fonts). Swap to `next/font/google` if you prefer.

---

## Accessibility & performance

- `prefers-reduced-motion` respected across cursor, video scrub, waves, physics, and smooth-scroll.
- Bubble Menu is keyboard operable and closes on route change; Spirit cursor never blocks clicks/scroll.
- WebGL features gate on capability and fall back silently.
- RAF loops pause off-screen / when the tab is hidden; images lazy-load; heavy client pieces are `ssr:false` dynamic imports; three.js is transpiled and code-split.

---

## Deployment

Standard Next.js 14 app — deploy on Vercel (recommended) or any Node host (`npm run build && npm run start`). Set the same env vars in your host.

---

## Credits

- Spirit cursor engine after **"The Spirit" by Edan Kwan**, ported to modern three.js.
- UI components from **React Bits** (github.com/DavidHDev/react-bits), adapted to the INKRIOT system.
- Replace placeholder store prices and social links before launch. Add your Tungsten license files as described above.

Built with ideas, curiosity & a little creative chaos. **INKRIOT®**
