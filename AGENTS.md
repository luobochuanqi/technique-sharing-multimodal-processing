# AGENTS.md

## Project Overview

A Vue 3 + Vite + Reveal.js presentation application for web technique sharing on multimodal AI processing.

## Structure

```
technique-sharing-multimodal-processing/
├── slides/           # Main app (Vue 3 + Vite + Reveal.js)
│   ├── src/
│   │   ├── components/Presentation.vue  # Reveal.js integration
│   │   ├── App.vue
│   │   └── main.js                      # Pinia state management
│   ├── package.json
│   └── vite.config.js
├── docs/
│   └── draft.md        # Content outline for presentations
└── assets/
    └── images/         # Presentation assets
```

## Commands

All commands run from `slides/` directory:

```bash
cd slides
bun install    # or npm install
bun run dev    # start dev server
bun run build  # production build
bun run preview # preview production build
```

## Key Tech Stack

- **Vue 3** with `<script setup>` SFCs
- **Vite** (v8) - build tool
- **Reveal.js** (v6) - presentation framework
- **Pinia** - state management
- **VueUse** - composition utilities

## Content Workflow

1. Edit slide content in `slides/src/components/Presentation.vue`
2. Reference `docs/draft.md` for topic outlines (Omni models, OCR, context engineering)
3. Place images in `assets/images/`
4. Dev server auto-reloads on changes

## Notes

- Project uses Bun as package manager (see `bun.lock`)
- Reveal.js uses dark theme (`black.css`)
- Hash routing enabled for direct slide links
