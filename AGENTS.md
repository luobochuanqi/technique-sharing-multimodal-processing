# AGENTS.md

## Project Overview

Vue 3 + Vite presentation application for multimodal AI processing technique sharing. Custom slide navigation with GSAP animations.

## Structure

```
technique-sharing-multimodal-processing/
├── slides/
│   ├── src/
│   │   ├── components/Presentation.vue  # All slide content & navigation logic
│   │   ├── App.vue
│   │   └── main.js
│   └── package.json
├── docs/draft.md        # Content outline (Omni models, OCR, context engineering)
└── assets/images/       # Presentation images
```

## Commands (run from `slides/`)

```bash
cd slides
bun install
bun run dev      # localhost:5173
bun run build
```

## Key Architecture

- **Single-file presentation**: All slides in `Presentation.vue` with custom navigation (arrow keys, space, F for fullscreen)
- **Animation system**: GSAP for slide transitions and entrance animations
- **Vue 3** with `<script setup>`, no Pinia
- **Recommended VSCode extension**: Vue.volar

## Content Workflow

1. Edit slides in `slides/src/components/Presentation.vue`
2. Reference `docs/draft.md` for topic outlines
3. Images go in `assets/images/`, referenced as `/images/filename.png`

## Critical Gotchas

- **Image paths**: Always use `/images/filename.png` (root-relative, not relative to slide component)
- **Slide count**: `totalSlides` in `Presentation.vue` must match actual slide count or navigation breaks
- **Animation locking**: `isAnimating` flag prevents rapid key mashing—don't remove
- **Package manager**: **Bun** required (see `bun.lock`)—do not use npm/yarn/pnpm

## Agent Guidelines

- When adding/removing slides, update `totalSlides`, `chapters`, and `showHeader` range in `Presentation.vue`
- Header visibility controlled by `showHeader` computed (slides 3–10)
- All GSAP animations are in `Presentation.vue`—no external animation config files
- No Pinia store: all state is local component state

## Notes

- 12 slides total (0-indexed): cover, TOC, 3 parts with sub-slides, ending
- Navigation via arrow keys/space
- No Three.js dependency (removed for performance)
