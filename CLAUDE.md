# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for **Green Root Concepts** (Chef Dali Solene). All design, copy, colors, and imagery were derived from `Green Root Concepts(1).pdf` in the project root — that PDF is the source of truth for brand voice and visual direction.

**Hard constraint:** only use colors that appear in the PDF. The palette is defined as CSS variables in `site/css/style.css` (`--forest`, `--forest-deep`, `--cream`, `--cream-warm`, `--ink`, `--sage`). Do not introduce new colors.

## Running locally

No build step. Site is plain static HTML/CSS/JS served by MAMP:

```
http://localhost:8888/dali/site/
```

When you change CSS, the `<link>` tag in every HTML file uses `?v=N` cache-busting — bump it (or hard-refresh ⇧⌘R) if changes don't appear.

## Architecture

### Pages (5)
`site/index.html` (home) · `about.html` · `services.html` (the 4 pillars) · `ethos.html` · `contact.html`. Each is hand-written HTML, not templated.

### Shared layout via JS injection
`site/js/layout.js` injects the **nav, slide-in menu, and footer** into every page on load via `insertAdjacentHTML`. **All five pages must include `<script src="js/layout.js"></script>`** — otherwise the logo/menu/footer go missing on that page (this has happened before). Editing nav, menu items, contact info, or footer means editing `layout.js`, not the HTML files.

### Single stylesheet
`site/css/style.css` holds everything. Key conventions:
- Sections alternate `.sec-cream` / `.sec-forest` (cream/dark backgrounds).
- Two-column layouts use `.grid.g-split`; 3- and 4-up grids use `.g-3` / `.g-4` and default to 2 columns on mobile.
- Mobile breakpoint is `@media(max-width:700px)` at the bottom of the file — it overrides base font size, section padding, hero text, menu sizing, and gives the fixed nav a solid forest background so it stays legible while scrolling.
- Tablet override: `@media(max-width:1024px)` only adjusts base font.
- **Menu reveal** uses `clip-path: circle(0 → 250vmax at top-right)`. Use `vmax`, not `%`, or it will not cover wide aspect ratios. The menu has `z-index:9000` with `isolation:isolate`; nav is `z-index:9999`. Don't add `mix-blend-mode` to the nav — it broke stacking previously.

### JS
- `js/main.js` — burger toggle, scroll-reveal `IntersectionObserver`, ripple effect on `.ripple` elements, and a Three.js particle field for `#particles` (only initialized if the canvas exists). Must load **after** `layout.js` so injected DOM is queryable.
- Three.js is loaded from a CDN `<script>` tag, only on `index.html`.

### Assets
- `site/assets/img/` — photos cropped from PDF page renders (`pages/page-XX.jpg` are the raw renders, kept for reference).
- `site/assets/img/clean-images/` — cleaner PNG assets (bio portrait, four pillar icons named `icons.regen.png`, `icons.foodmedicine.png`, `icons.consciouscooking.png`, `icons.property.png`). Prefer these over the PDF-derived crops when both exist.
- `site/assets/logo.svg` — wordmark logo. Used in nav (via `layout.js`) and menu overlay. Do **not** also place it in the hero — the nav already carries it.

## Typography

The PDF's display face is a high-contrast flared serif (likely commercial — Migra/Beastly/Ogg family). The closest free substitute in use is **Italiana** for headings, **Cormorant Garamond** for body, and **Dancing Script** for the "thank you" script. If a better font becomes available, swap `font-family` on `h1,h2,h3,h4` in `style.css`.

## Recurring pitfalls

- **Don't hardcode nav/menu/footer in a page** — always use `layout.js`. Drift between pages is the most common bug.
- **Don't use percentage radii on the menu's `clip-path`** — use `vmax`.
- **Don't introduce off-palette colors.** Pull only from the CSS variables.
- **Hero image** is set as a CSS `background: cover` on `.hero` itself, not a child `<img>`, to guarantee full-bleed coverage.
