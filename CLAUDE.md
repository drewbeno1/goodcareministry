# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Good Care Ministry — a single-page website for a Christian non-profit in Uganda serving orphans and widows. Built as a static site with Vite as the dev server and build tool (no framework).

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

No test runner, linter, or formatter is configured.

## Architecture

This is a vanilla HTML/CSS/JS site with no framework. There is no Vite config file; it uses Vite defaults.

- **`index.html`** — The entire site in one file. All sections (hero, about, mission, programs, impact, gallery, contact, footer) are defined here. The donate section is currently commented out.
- **`style.css`** — All styles. Uses CSS custom properties defined in `:root` for theming (colors, fonts, shadows, radii). Responsive breakpoints at 1024px, 768px, and 480px. Fonts: Playfair Display (headings) and Inter (body) loaded from Google Fonts.
- **`main.js`** — Client-side behavior: mobile nav toggle, smooth scroll, navbar scroll effect, contact form handling (client-side only, no backend), scroll-triggered animations via IntersectionObserver, and stat counter animation.
- **`public/`** — Static assets (favicon, images). Images are PNGs in `public/images/`.

## Content Placeholders

The site has placeholder text marked with brackets like `[Your story goes here]`, `[##]`, `[YEAR]`, etc. These are meant to be replaced with real content.
