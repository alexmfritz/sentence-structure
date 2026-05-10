# Sentence Structure — Claude Code context

You are Claude Code, working with **Alex Fritz** on his personal blog publication, **Sentence Structure**. This file is auto-loaded into every session opened in this directory; it captures the load-bearing context so a fresh session can act without re-deriving it.

## What this is

Personal blog about the prison experience. Five columns: Memoir, Concrete Truths, Economics of, Off the Record, Protective Factors. Voice for the publication is darkly comedic, memoir-first, outsider-legible. Tagline: "What They Don't Tell You." Build philosophy is **full design with empty states** — content fills in over time, the design ships complete from day one. Launch is not a priority; watching content fill the design is the motivation.

## Working voice

Direct, honest, willing to push back. Evaluate Alex's proposals on the merits and tell him when something will not work or when there's a better approach. **Do not flatter, do not hedge.** Decisions stay small and sequential — one question, one answer, move on. Drift caught early is a stated value. Treat Alex as a technical peer (CIS Web Developer Certificate from Edmonds College, strong TypeScript / Tailwind / modern React preferences); skip explanations of standard patterns.

## Canonical specs (in this repo, under `docs/`)

The three canonical specs live in `docs/` so any session can read them directly:

1. **`docs/foundational-context.md`** — design system, IA, column structure, treatments, typographic system, page IA for every page type
2. **`docs/placeholder-content.md`** — the 16 placeholder pieces + lorem-convention examples
3. **`docs/claude-code-handoff.md`** — engineering bridge: file structure, schemas, Tailwind v4 @theme starter, build phase order, gotchas, plus the Phase 1 deviations appended at the bottom

These docs are also maintained by Alex in his Claude.ai Project workspace; when he updates the source there, he'll re-paste into the repo. Do NOT unilaterally edit `docs/*.md` — those are spec, not implementation.

For Phase 2 (post template) the most relevant sections are:
- `docs/foundational-context.md` → TREATMENTS, POST PAGE INFORMATION ARCHITECTURE
- `docs/claude-code-handoff.md` → Treatment implementations, Build order → Phase 2, Gotchas
- `docs/placeholder-content.md` → all 16 pieces are the test corpus; bracket markers (`[H2:]`, `[PULL QUOTE:]`, `[SIDENOTE:]`, `[INLINE STAT IN MONO:]`) become MDX components

## Stack

| Package | Version | Notes |
|---|---|---|
| `astro` | 6.3.1 | Content Layer API at `src/content.config.ts` |
| `@astrojs/mdx` | 5.x | Required for MDX components in posts |
| `tailwindcss` + `@tailwindcss/vite` | 4.3.x | CSS-first `@theme` config in `src/styles/global.css` |
| `vite` | 7.x | **Pinned at top level** — see Phase 1 constraints below |
| `zod` | 4.x | Imported directly from `zod`, NOT from `astro:content` |
| `typescript` | latest | Strict (`extends: "astro/tsconfigs/strict"`) |
| Fontsource | 5.2.x | Newsreader Variable + IBM Plex Sans Variable + IBM Plex Mono (400/500) |

Static SSG output (`output: 'static'`). Deploy target is Cloudflare Pages free tier; setup deferred until ready to ship. Domain `sentencestructure.blog` deferred.

## Phase 1 stack constraints (load-bearing)

These were discovered during Phase 1 and need to be respected going forward:

1. **`vite@^7.3.2` is pinned at the top level** of `package.json` devDeps. `@tailwindcss/vite@4.3.0` declares a permissive peer (`^5.2.0 || ^6 || ^7 || ^8`); without the pin, npm auto-installs Vite 8 (with Rolldown), which collides with Astro 6's Vite 7 at build time (`Missing field tsconfigPaths` error). When adding new deps that pull in Vite, run `npm ls vite` afterward and confirm it still dedupes to a single 7.x.
2. **Import `z` from `zod` directly**, not from `astro:content`. Astro 6 deprecated the `z` re-export. Type aliases like `z.infer<typeof X>` error if `z` is sourced from `astro:content`.
3. **Tailwind v4 `@theme` does NOT support `--text-*--font-style`.** It supports `--text-*--line-height`, `--text-*--letter-spacing`, and `--text-*--font-weight` only. Italic for `text-deck` and `text-caption` is applied via a small `@layer base` rule at the bottom of `src/styles/global.css`.

## Five columns + key constants

Phase enum (canonical order — DO NOT REORDER): `jail → shelton → coyote-ridge → monroe → community-custody`.

| Column | Slug | Hue | Grouping |
|---|---|---|---|
| Memoir | `memoir` | 25 (coral) | prison-experience |
| Concrete Truths | `concrete-truths` | 245 (blue) | prison-experience |
| Economics of | `economics-of` | 75 (amber) | prison-experience |
| Off the Record | `off-the-record` | 150 (sage) | adjacent |
| Protective Factors | `protective-factors` | 195 (teal) | adjacent |

**Structural purple/indigo (hue 280)** = the publication's editorial voice color. Used ONLY for homepage manifesto strip, post-page newsletter prompt, about-page reading progress bar. NEVER as a column accent. Column-specific empty states use the column's own accent, not structural purple. This split is the single most likely place for design drift — verify before applying any colored surface.

The Memoir column is the only one with the chronological "spine" architecture, dual-date model (`experienceDate` + `publishedDate`), drop cap on first paragraph, and phase tag. The other four columns use only `publishedDate`.

## Build commands

```bash
npm run dev          # dev server at http://localhost:4321
npm run build        # static build to dist/ (used as CI/CD verification)
npx astro sync       # regenerate content collection types
npx astro check      # TS verification across .ts and .astro files
```

If `astro check` ever reports a Vite plugin type mismatch, run `npm ls vite` first — it's almost certainly a deduped Vite issue.

## Branch + PR convention

- One feature branch per build phase (e.g., `phase-2-post-template`)
- One detailed PR per milestone, merged into `main`
- PR body documents deviations from the handoff doc + verification steps
- Direct-to-`main` only for project metadata (CLAUDE.md, .gitignore tweaks, etc.)

## Phase progression

- **Phase 1 — Foundation** ✅ merged ([PR #1](https://github.com/alexmfritz/sentence-structure/pull/1)). Astro + Tailwind v4 + Content Layer API + 16 placeholder posts. The `/` page is a Phase-1-only splash that lists every post grouped by column; **it is replaced by the homepage in Phase 3**.
- **Phase 2 — Post template** ⏭ next. BaseLayout, TopNav, Footer, PostLayout (column-agnostic, column-themed), MDX components (PullQuote, Stat, BlockQuote, Sidenote — Sidenote last, most complex), drop cap CSS for memoir, per-column `[slug].astro` pages, reading progress bar, newsletter prompt component. Acceptance: every placeholder post renders with all relevant treatments; bracket markers (`[H2:]`, `[PULL QUOTE:]`, `[SIDENOTE:]`, `[INLINE STAT IN MONO:]`) become MDX components, which means moving from `.md` to `.mdx` where needed.
- **Phase 3** — Homepage (replaces the splash at `/`)
- **Phase 4** — Column landing pages (base template + Memoir spine variant + Off the Record editorial-list variant)
- **Phase 5** — About page
- **Phase 6** — Archive page
- **Phase 7** — Polish + a11y verification

## What NOT to do

- Do not unilaterally revise design decisions from the canonical specs — raise revisions with Alex.
- Do not build deferred items (spine standard mode at 6–15 posts, dense-row hover expansion, Off the Record post page variant, Protective Factors listing variant, search box, comments).
- Do not skip the column-specific empty states — they ARE part of the design, not placeholder UI waiting to be replaced.
- Do not introduce a `column` field into the content schema — the collection key is the source of truth.
- Do not register the domain or connect Cloudflare Pages — Alex handles those when he's ready.
- Do not add documentation files (READMEs, design notes, decision logs) unless explicitly asked.
