# Sentence Structure — Claude Code context

You are Claude Code, working with **Alex Fritz** on his personal blog publication, **Sentence Structure**. This file is auto-loaded into every session opened in this directory; it captures the load-bearing context so a fresh session can act without re-deriving it.

**This file is the single source of truth for build status and the forward plan**, superseding any external "Build Status & Forward Plan" document.

## What this is

Personal blog about the prison experience. Six columns: Memoir, Concrete Truths, Economics of, Hearsay, Off the Record, Protective Factors. Voice for the publication is darkly comedic, memoir-first, outsider-legible. Tagline: "What They Don't Tell You." Build philosophy is **full design with empty states** — content fills in over time, the design ships complete from day one. Launch is not a priority; watching content fill the design is the motivation.

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

## Stack constraints & build gotchas (load-bearing)

Discovered during the build; respect going forward — each one breaks the build or silently breaks the design:

1. **`vite@^7.3.2` is pinned at the top level** of `package.json` devDeps. `@tailwindcss/vite@4.3.0` declares a permissive peer (`^5.2.0 || ^6 || ^7 || ^8`); without the pin, npm auto-installs Vite 8 (with Rolldown), which collides with Astro 6's Vite 7 at build time (`Missing field tsconfigPaths` error). When adding new deps that pull in Vite, run `npm ls vite` afterward and confirm it still dedupes to a single 7.x.
2. **Import `z` from `zod` directly**, not from `astro:content`. Astro 6 deprecated the `z` re-export. Type aliases like `z.infer<typeof X>` error if `z` is sourced from `astro:content`.
3. **Tailwind v4 `@theme` does NOT support `--text-*--font-style`.** It supports `--text-*--line-height`, `--text-*--letter-spacing`, and `--text-*--font-weight` only. Italic for `text-deck` and `text-caption` is applied via a small `@layer base` rule at the bottom of `src/styles/global.css`.
4. **Tailwind v4 preflight resets `img { max-width: 100% }`.** Any image meant to render *wider than its container* (e.g. the `.article-figure` breakout past the 480px post text column) is silently capped at container width unless the rule explicitly sets `max-width: none`. Symptom: the image collapses to container width and, if it has negative side margins, shifts to one side instead of breaking out symmetrically.
5. **`<Image>` from `astro:assets` takes `format` (singular), not `formats`.** `formats` (array) is a `<Picture>`-only prop; it's silently ignored on `<Image>` and flagged by `astro check`.
6. **The dev server serves stale renders after content-schema or image-pipeline changes.** Editing `content.config.ts` (e.g. adding a schema field) or adding images while `npm run dev` is running leaves stale output — wrong renders, or a `LocalImageUsedWrongly` error. Fix: stop the dev server, `rm -rf .astro node_modules/.astro`, restart. `npm run build` is always correct — trust it over the dev server when they disagree.
7. **A `throw` inside a remark plugin does NOT fail the build.** Astro 6's glob content loader catches it, logs `[ERROR] [glob-loader] Error rendering …`, and the build still exits 0 — it even emits the page. Build-time content validation that must gate CI has to live where a throw propagates: `getStaticPaths`, or an integration hook. The Hearsay 250-word limit is enforced in `src/pages/hearsay/[slug].astro` getStaticPaths for exactly this reason — the remark plugin (`plugins/remark-hearsay-wordcount.mjs`) only counts and injects the word count; it does not gate.

## Six columns + key constants

Phase enum (canonical order — DO NOT REORDER): `jail → shelton → coyote-ridge → monroe → community-custody`.

| Column | Slug | Hue | Grouping |
|---|---|---|---|
| Memoir | `memoir` | 25 (coral) | prison-experience |
| Concrete Truths | `concrete-truths` | 245 (blue) | prison-experience |
| Economics of | `economics-of` | 75 (amber) | prison-experience |
| Hearsay | `hearsay` | 340 (rose) | prison-experience |
| Off the Record | `off-the-record` | 150 (sage) | adjacent |
| Protective Factors | `protective-factors` | 195 (teal) | adjacent |

**Structural purple/indigo (hue 280)** = the publication's editorial voice color. Used ONLY for homepage manifesto strip, post-page newsletter prompt, about-page reading progress bar. NEVER as a column accent. Column-specific empty states use the column's own accent, not structural purple. This split is the single most likely place for design drift — verify before applying any colored surface.

The Memoir column is the only one with the chronological "spine" architecture, dual-date model (`experienceDate` + `publishedDate`), drop cap on first paragraph, and phase tag. The other five columns use only `publishedDate`.

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

## Phase progression — structurally complete

All seven build phases shipped via merged PRs. The publication's chrome, page templates, and a11y baseline are in place. The work that remains is **operational** (real content, real imagery, domain + deploy) and **iterative** (deferred refinements that fire on specific triggers — see "Deferred items" below). No new build phases are planned.

- **Phase 1 — Foundation** ✅ [PR #1](https://github.com/alexmfritz/sentence-structure/pull/1). Astro + Tailwind v4 + Content Layer API. The 16 placeholder posts that seeded the design have since been replaced by real pieces in `src/content/`.
- **Phase 2 — Post template** ✅ [PR #2](https://github.com/alexmfritz/sentence-structure/pull/2). BaseLayout, PostLayout (column-agnostic, column-themed via `[data-column]` CSS vars), TopNav with `<details>` Columns dropdown, Footer, MDX components (PullQuote, Stat, BlockQuote, Sidenote, Figure), Memoir-only drop cap, per-column `[slug].astro`, ReadingProgress, NewsletterPrompt. Bracket markers in placeholder content converted; 7 of 16 files moved to `.mdx`. `remark-breaks` added so single newlines render as `<br>`.
- **Phase 3 — Homepage** ✅ [PR #3](https://github.com/alexmfritz/sentence-structure/pull/3). Hero with translucent glass title card, three-row mosaic (anchor / column showcase / archive sampler), manifesto strip with sparse-vs-standard mode, MenuWheel (desktop staircase cascade with full keyboard nav) + HamburgerMenu (mobile full-screen).
- **Phase 3.5 — Glass-surface tokenization.** Promoted ~17 inline `oklch()` translucents to 12 `--glass-*` semantic tokens in `@theme`; collapsed four per-component `prefers-reduced-transparency` blocks into one global token-override. Sets the retrofit path for any future light/HC-mode work to be a token-swap rather than per-component edits.
- **Phase 4 — Column landings** ✅ [PR #4](https://github.com/alexmfritz/sentence-structure/pull/4). Base template (CT, EoO, PF) + Memoir spine variant (mini-spine, full vertical spine with phase blocks, "I am here" pulse marker) + OTR editorial-list variant (full poem bodies rendered inline with asterism separators). Empty states for each variant.
- **Phase 5 — About page** ✅ [PR #5](https://github.com/alexmfritz/sentence-structure/pull/5). `/about` + `AboutLayout`, `WhereToStart` six-column listing, real manifesto-bio essay in `src/pages/about.mdx`. `ReadingProgress` gained a `variant` prop (`'column'` default, `'structural'` for about). Body width is 560px (slightly wider than post-page 480px) to read better against the essay's density.
- **Phase 6 — Archive** ✅ [PR #6](https://github.com/alexmfritz/sentence-structure/pull/6). Filter chrome (column / phase / tag / year / sort), tile grid with data-attribute filtering, URL-state sync via `pushState`, "Load more" pagination at 24/page, no-match + threshold (<6 posts) empty states. Vanilla TS, no framework.
- **Phase 7 — Polish + a11y** ✅ [PR #7](https://github.com/alexmfritz/sentence-structure/pull/7). 39 OKLCH contrast pairs computed at AA, text-tertiary lightness bumped 0.50 → 0.60. Global `prefers-reduced-motion` safety net. Sitewide skip-link + `<main id="main">` wrapper in BaseLayout. Global `:focus-visible` ring. Heading-hierarchy fixes (homepage h1, archive h2).

## Deferred items (do NOT implement unless the trigger condition fires)

These were intentionally not built. Each has a stated trigger; if a future session encounters one of these, the right move is usually to flag it and ask, not to silently build it.

- **Light mode / High contrast theme.** Phase 3.5 makes this a token-swap. Trigger: Alex updates "Dark mode mandatory" in the foundational doc to allow alternate themes.
- **Memoir spine standard mode** (6–15 posts per phase). Sparse and dense exist; standard is intentionally undesigned. Trigger: any phase reaches 6 posts.
- **Spine experienceDate-relative post placement.** Currently `space-around`. Spec implies date-positioned. Trigger: a phase has 3+ posts and the visual difference matters.
- **OTR long-piece soft-fade + "Read full piece →" button.** Triggers at ~700px rendered height. Trigger: any OTR piece exceeds.
- **OTR "Notes →" affordance.** Surfaces only when an OTR piece has notes. Trigger: such a piece is published.
- **OTR post page variant.** Currently uses standard PostLayout. Trigger: OTR posts feel templated against standard layout.
- **Protective Factors listing variant.** Currently uses base template. Trigger: column populates and base feels wrong.
- **Archive layout adaptation thresholds.** "Row-1 breathing-room layout" at <6 results. Built always-3-col grid. Trigger: filtered views routinely surface 1–6 results and feel under-laid-out.
- **Tag "more" affordance** in archive filter chrome. Currently shows all tags upfront (30 distinct across real content as of this writing). Trigger: tag count crosses ~50.
- **Spine dense-row inline expansion** on hover/focus. Held until dense mode is implemented.
- **`aria-current="page"`** on TopNav links. Polish-on-polish item.

## Real-content prerequisites for launch

- **Manifesto-bio essay** at `src/pages/about.mdx` — ✅ drafted (`lastUpdated: 2026-05-11`); no placeholder blocks remain. Refine on revision.
- **Real generative-portrait imagery** — in progress. Real heroes/inline images exist in `src/assets/` (about, columns, per-piece); remaining placeholder gradients fill in as pieces publish.
- **Real planned-piece descriptions** in `COLUMN_EMPTY_STATES` (`src/lib/column-landing.ts`) — currently generic-thematic.
- **Real `COMMUNITY_CUSTODY_END`** date in `src/lib/memoir-spine.ts` — the one real-content date Alex still owes. `COMMUNITY_CUSTODY_START` is now `2025-05-23` (real); `END` is a refined estimate `2027-04-01` (~spring 2027 per Alex), exact date still TBD (FIXME in code). The "I am here" position is computed from both, so the marker stays approximate until the precise END lands.
- **Newsletter form handler** — currently `<form onsubmit="return false">`. Wire to Formspree or similar.
- **`/rss.xml` route** — Footer links to it but the route doesn't exist.

## What NOT to do

- Do not unilaterally revise design decisions from the canonical specs — raise revisions with Alex. Caveat: per-session memory note `feedback_spec_skepticism.md` — strong assertions in docs/ may be prior-Claude drift rather than explicit Alex decisions; verify before pushing back on them.
- Do not build deferred items (above) without the stated trigger.
- Do not skip the column-specific empty states — they ARE part of the design, not placeholder UI waiting to be replaced.
- Do not introduce a `column` field into the content schema — the collection key is the source of truth.
- Do not register the domain or connect Cloudflare Pages — Alex handles those when he's ready.
- Do not add documentation files (READMEs, design notes, decision logs) unless explicitly asked.
