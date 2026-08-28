# Mascot AI — Marketing Site

The public site at [mascot-ai.com](https://mascot-ai.com). Built with
[Astro](https://astro.build) + Tailwind CSS, animated with GSAP, deployed as
static files to GitHub Pages.

This site has no auth and no app logic. "Request beta access" links to the
student beta Google Form; "Log in" links to the app at `dev.mascot-ai.com`.

## Run locally

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev       # dev server at http://localhost:4321
```

Other scripts:

```bash
npm run build     # static output to dist/
npm run preview   # serve the built dist/ at http://localhost:4321
```

## Structure

```
src/
  pages/           one file per route (index, features, pricing, about, contact, privacy, terms)
  layouts/
    BaseLayout.astro   <head>, nav, footer, theme script, loads the animation bundle
  components/
    Nav.astro          sticky header + mobile menu + theme toggle
    Footer.astro
    FeatureBlock.astro  alternating copy/visual row used across pages
    BrowserFrame.astro  chrome frame around a screenshot or recreation
    VoiceRecreation.astro  animated fake voice-chat transcript (not a screenshot)
    RadarChart.astro       animated "story coverage" chart
    ShotPlaceholder.astro  temporary striped stand-in for a screenshot
    CtaBand.astro
  lib/
    site.js         all external links + copy constants (beta form, app URL, contact email)
    anim.js         GSAP + ScrollTrigger setup, imported once by BaseLayout
  styles/global.css brand color tokens (light/dark), base styles, .btn / .legal helpers
public/             copied as-is: CNAME, mascot-bear.png, robots.txt, sitemap.xml, screenshots/
```

### Editing content

- Links, contact email, university count: `src/lib/site.js`
- Page copy: the matching file in `src/pages/`
- Brand colors: the `:root` / `.dark` token blocks in `src/styles/global.css`
- Nav items: `NAV_LINKS` in `src/lib/site.js`

### Animation

Elements with `data-anim` fade up on scroll; `data-anim-group` staggers its
`data-anim` children. Everything is disabled under
`prefers-reduced-motion: reduce`, and content still shows if the JS bundle
fails to load (the hide rule is scoped to `html.js`).

## Screenshots

`src/pages/*.astro` currently use `<ShotPlaceholder>` for most product shots.
Replace each with a real image once captured:

```astro
<BrowserFrame label="app.mascot-ai.com/matches">
  <img src="/screenshots/matches.webp" alt="..." width="1440" height="900" loading="lazy" />
</BrowserFrame>
```

Capture by running the web app locally against the dev API, logging in with a
test account, at a 1440×900 viewport in light mode. Save to
`public/screenshots/`.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/`
to GitHub Pages. One-time setup: repo **Settings → Pages → Source: GitHub
Actions**. `CNAME` (in `public/`) keeps the `mascot-ai.com` domain; DNS is
unchanged from the previous static site.

## Notes / open items

- Most product screenshots are still `<ShotPlaceholder>` stand-ins.
- `og.png` (social share image, ~1200×630) referenced by `BaseLayout` does not
  exist yet — links shared to Slack/iMessage show text only until it's added to
  `public/`.
