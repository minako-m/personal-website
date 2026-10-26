# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start local dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm test         # run Vitest once (jsdom env, configured in vite.config.js)
npm run lint     # ESLint
```

Tests live next to the code they cover (`*.test.js` / `*.test.jsx`) and use Vitest + @testing-library/react.

## Architecture

Single-page React + Vite personal website. All content is hardcoded in the component files — no backend, no CMS.

```
src/
  App.jsx          # root layout: Navbar + the active tab's section + Footer
  App.css          # all component styles (single stylesheet)
  index.css        # CSS reset, design tokens (CSS variables), .container utility
  data/
    projects.js    # `projects` array + getAllTags() / filterByTag() helpers
  components/
    Navbar.jsx         # sticky top nav; tabs switch which section App shows
    Hero.jsx           # name, tagline, social links; wires the shelves to the character
    PixelCharacter.jsx # pixel-art "me" beside the first name: idle loop, drink → jump → heart burst when fed
    Shelves.jsx        # shelves of draggable matcha; dropping one on the character feeds her
    Experience.jsx     # work experience cards — edit the `experiences` array
    Projects.jsx       # tag filter pills (All + one per tag, selected tag in state) + project grid
    Education.jsx      # education card with the cheering Stanford character
    Hobbies.jsx        # emoji hobby grid
  assets/
    character/     # character frames (idle-*, drink-*, jump-*), one shared 220x308 cell
    heart-burst/   # 5 heart-burst frames
    matcha/        # matcha-1..19, numbered in sheet order
    shelf.png      # stretched with border-image; the bracket ends stay fixed
art/               # source sprite sheets the assets above were cropped from (not loaded by the site)
```

## Design system

Defined via CSS custom properties in `src/index.css`:
- **Fonts**: Space Grotesk (headings) + Inter (body) via Google Fonts in `index.html`
- **Accent color**: `--accent: #56769C` (denim, sampled from the character sprite)
- **Secondary accent**: `--matcha: #5B7611` (matcha green) for quieter elements (outline buttons, tags, list bullets) and as the main text colour (`--text`)
- **Alternate section bg**: `--bg-alt: #F5F8FC`
- **Cards**: white bg, `var(--border)` outline, `var(--shadow)` + hover lift via `transform: translateY`

## Updating content

All content lives in plain JS arrays at the top of each component file (except projects, which live in `src/data/projects.js`). Filter pills are generated from project tags automatically; tag matching is case-insensitive. To update your info, edit the arrays in `Experience.jsx`, `src/data/projects.js`, `Education.jsx`, and `Hobbies.jsx`, and update the hardcoded strings in `Hero.jsx` and `Navbar.jsx`.
