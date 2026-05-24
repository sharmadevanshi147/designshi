# Designshi — Portfolio

A React + Vite portfolio for Devanshi Sharma, UX Designer specialising in Healthcare UX.

## Features

- **Book-style page flip** — scrolling down flips the Hero page right-to-left, revealing the About section; scrolling up from the top of About back-flips to Hero
- **Name morph animation** — 2 seconds after load, "Devanshi" morphs letter-by-letter into "Designshi" with spring physics
- **Ruled notebook aesthetic** — consistent lined-paper background across all sections
- **Cream About card** — `#FFFAEE` card with pennant tape SVG and entrance animations
- **Accessible** — `prefers-reduced-motion` respected throughout; semantic HTML landmarks

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 5 |
| Framer Motion | 11 |
| CSS Modules | — |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  components/
    Navbar/           # Fixed top navigation
    Hero/             # Landing section with name morph
    About/            # Cream card + tape + bio
    PageFlipTransition/ # 3-D book-flip engine
  styles/
    globals.css       # CSS custom properties + resets
  App.jsx
  main.jsx
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, deployed code |
| `dev`  | Active development; PRs merged here first |
