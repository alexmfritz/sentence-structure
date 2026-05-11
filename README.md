# Sentence Structure

A personal blog publication about the prison experience. Five columns of writing across two thematic groupings:

| Column | Slug | Group |
|---|---|---|
| Memoir | `memoir` | prison experience |
| Concrete Truths | `concrete-truths` | prison experience |
| Economics of | `economics-of` | prison experience |
| Off the Record | `off-the-record` | adjacent personal work |
| Protective Factors | `protective-factors` | adjacent personal work |

Tagline: **"What They Don't Tell You."**

The site is structurally complete through Phase 7 — all page types, all chrome, full a11y baseline. Remaining work is operational (real content, real imagery, domain + deploy) and editorial (writing the manifesto-bio, drafting real pieces, replacing placeholder copy). See `CLAUDE.md` for the load-bearing project context and current phase status.

## Stack

| | Version | Notes |
|---|---|---|
| Astro | 6.x | Static SSG output, Content Layer API for collections. |
| TypeScript | strict | `extends: "astro/tsconfigs/strict"`. |
| Tailwind v4 | 4.3.x | CSS-first `@theme` config in `src/styles/global.css`. |
| MDX | 5.x | Required for posts using PullQuote / Sidenote / Stat / Figure / BlockQuote. |
| Zod | 4.x | Imported directly from `zod`, not from `astro:content`. |
| Vite | **7.x (pinned)** | Top-level `vite@^7.3.2` to dedupe — without it `@tailwindcss/vite` pulls Vite 8 with Rolldown and the build breaks. |
| Fontsource | 5.2.x | Newsreader Variable + IBM Plex Sans Variable + IBM Plex Mono. |
| remark-breaks | latest | Single newlines render as `<br>`. Required for OTR poetry line breaks and stacked Protective Factors lists. |

Deploy target: Cloudflare Pages free tier (setup deferred until launch).
Domain: `sentencestructure.blog` (registration deferred).

## Local development

```bash
npm install            # install dependencies
npm run dev            # dev server at http://localhost:4321
npm run build          # static build to dist/
npm run preview        # serve the built site locally
npx astro check        # TypeScript verification
npx astro sync         # regenerate content collection types after schema changes
```

If `astro check` ever reports a Vite plugin type mismatch, run `npm ls vite` first — it's almost certainly a deduped-Vite issue. The top-level pin in `package.json` should keep Vite at 7.x.

## Routes

```
/                                          homepage (hero + three-row mosaic + manifesto)
/about                                     manifesto-bio essay
/archive                                   filterable archive with URL-state filters
/memoir                                    column landing — spine variant (chronological)
/memoir/[slug]                             memoir post pages
/concrete-truths                           column landing — base template
/concrete-truths/[slug]                    concrete-truths post pages
/economics-of                              column landing — base template
/economics-of/[slug]                       economics-of post pages
/off-the-record                            column landing — editorial-list variant
/off-the-record/[slug]                     off-the-record post pages
/protective-factors                        column landing — base template
/protective-factors/[slug]                 protective-factors post pages
```

24 pages total at build time (16 placeholder posts + 5 column landings + homepage + /about + /archive). `/rss.xml` is referenced in the footer but the route is not yet built — deferred.

## Project structure

```
sentence-structure/
├── CLAUDE.md                          load-bearing project context, auto-loaded by Claude Code sessions
├── docs/                              canonical specs (foundational, placeholder content, handoff)
├── public/                            static assets (favicon, future imagery)
├── src/
│   ├── content/
│   │   ├── memoir/                    .md + .mdx post files (6 placeholder)
│   │   ├── concrete-truths/           .mdx (2)
│   │   ├── economics-of/              .mdx (2)
│   │   ├── off-the-record/            .md poems (4)
│   │   └── protective-factors/        .mdx (2)
│   ├── content.config.ts              Zod schemas: basePostSchema + memoirSchema (phase + experienceDate)
│   ├── components/
│   │   ├── chrome/                    TopNav, Footer, MenuWheel, HamburgerMenu, ReadingProgress, NewsletterPrompt
│   │   ├── post/                      ArticleHeader, BylineStrip, ColumnTagPill, PhaseTagPill, MDX components
│   │   ├── homepage/                  Hero, MosaicAnchorRow, MosaicColumnShowcase, MosaicArchiveSampler, ManifestoStrip
│   │   ├── column-landing/            ColumnHeader, BaseTemplate, MemoirMiniSpine, MemoirSpine, OffTheRecordList, ColumnEmptyState, ColumnSubscribePrompt
│   │   ├── about/                     WhereToStart
│   │   └── archive/                   FilterChrome, ResultsRegion, ArchiveEmptyState
│   ├── layouts/                       BaseLayout, PostLayout, AboutLayout
│   ├── lib/                           columns, memoir-spine, content, reading-time, homepage, column-landing, archive
│   ├── pages/                         route files
│   └── styles/
│       └── global.css                 Tailwind import + @theme tokens + base layer rules
└── astro.config.mjs                   static output, MDX integration, remark-breaks, Tailwind v4 vite plugin
```

## Writing content

### Posts

Each column has its own directory under `src/content/`. Add new posts as `.md` (plain markdown) or `.mdx` (when you need MDX components for PullQuote, Sidenote, Stat, Figure, or BlockQuote).

Frontmatter for base columns (Concrete Truths, Economics of, Off the Record, Protective Factors):

```yaml
---
title: "Post title"
deck: "Optional one-sentence summary."
publishedDate: 2026-05-10
tags: [phone-calls, family]
---
```

Memoir adds two required fields:

```yaml
phase: jail               # one of: jail, shelton, coyote-ridge, monroe, community-custody
experienceDate: 2018-04-12
```

For MDX posts, use the inline components:

```mdx
<PullQuote>The quotation text, no quote marks.</PullQuote>

Mid-paragraph<Sidenote n={1}>The sidenote text appears in the right margin on desktop and inline on mobile.</Sidenote> continues here.

Inline data like <Stat>$1.40</Stat> renders in IBM Plex Mono.

<Figure caption="Caption text in italic Plex Sans." ratio="4:3" />

<BlockQuote source="Citation">An external quotation, italic.</BlockQuote>
```

### About page

`src/pages/about.mdx` currently holds the placeholder scaffolding (six bracketed-mono paragraphs across two H2 subheads). Replace each `<p class="placeholder">[ ... ]</p>` with real markdown prose; the `.placeholder` styling drops automatically when the class is removed. Move `<WhereToStart />` wherever fits the essay flow.

Update `lastUpdated` in the frontmatter when publishing revisions.

### Column empty-state copy

`src/lib/column-landing.ts` exports `COLUMN_EMPTY_STATES`. Each column has a `manifesto` paragraph + 3 placeholder tile descriptions (or 1 for OTR's editorial-list shape). These render when a column has zero posts. Per the foundational spec, the placeholder tile titles should describe **real planned pieces** — replace the generic-thematic copy before any column ships truly empty.

## Branch + PR convention

- One feature branch per build phase (e.g., `phase-2-post-template`).
- One detailed PR per milestone, merged into `main`. PR body documents deviations from the canonical specs + verification steps.
- Direct-to-`main` only for project metadata (`CLAUDE.md`, `.gitignore` tweaks).

All seven build phases shipped via merged PRs (see `CLAUDE.md` for links and per-phase summaries).

## Canonical specs

Three canonical design documents live in `docs/`:

- `docs/foundational-context.md` — design system, IA, column structure, treatments, page IA for every page type.
- `docs/placeholder-content.md` — the 16 placeholder pieces + lorem-convention examples.
- `docs/claude-code-handoff.md` — engineering bridge: file structure, schemas, build phase order, gotchas.

Maintained in Alex's Claude.ai project workspace; re-pasted into the repo when revised. Do not unilaterally edit `docs/*.md` — those are spec, not implementation.
