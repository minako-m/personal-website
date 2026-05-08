# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start local dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Architecture

Single-page React + Vite personal website. All content is hardcoded in the component files — no backend, no CMS.

```
src/
  App.jsx          # root layout: Navbar + all sections + Footer
  App.css          # all component styles (single stylesheet)
  index.css        # CSS reset, design tokens (CSS variables), .container utility
  components/
    Navbar.jsx     # sticky top nav, smooth-scroll anchor links
    Hero.jsx       # full-viewport hero with name, tagline, social links
    Experience.jsx # work experience cards — edit the `experiences` array
    Projects.jsx   # project grid cards — edit the `projects` array
    Education.jsx  # education card + GPA display
    Hobbies.jsx    # emoji hobby grid
```

## Design system

Defined via CSS custom properties in `src/index.css`:
- **Fonts**: Space Grotesk (headings) + Inter (body) via Google Fonts in `index.html`
- **Accent color**: `--accent: #7C3AED` (purple)
- **Alternate section bg**: `--bg-alt: #F7F6FF`
- **Cards**: white bg, `var(--border)` outline, `var(--shadow)` + hover lift via `transform: translateY`

## Updating content

All content lives in plain JS arrays at the top of each component file. To update your info, edit the arrays in `Experience.jsx`, `Projects.jsx`, `Education.jsx`, and `Hobbies.jsx`, and update the hardcoded strings in `Hero.jsx` and `Navbar.jsx`.
