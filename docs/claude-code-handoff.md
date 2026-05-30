# Sentence Structure — Claude Code Handoff

> **SUPERSEDED for engineering truth by `CLAUDE.md`.** This document is the original pre-build plan; where it disagrees with `CLAUDE.md` or the code, they win. The body below has been spot-patched for the most dangerous contradictions (versions, content-collections API, no adapter, six columns), but treat `CLAUDE.md` + the live source as authoritative. The build-order/phase history is retained as provenance.

## Purpose of this document

You are Claude Code, working with Alex Fritz on a personal blog publication called Sentence Structure. This document is the engineering bridge between two design documents and the actual build. It commits the code-shaped artifacts (schemas, theme config, file structure, build order, dependencies) and flags the things most likely to go wrong during implementation.

This document does not re-spec the design or the content. It points at:

- **`sentence-structure-foundational-context.md`** — the canonical design system and information architecture. Every page type, treatment, and design decision lives there.
- **`sentence-structure-placeholder-content.md`** — sixteen frontmatter-formatted pieces of placeholder content for design testing, plus lorem-convention examples for filling density.

Both should be in your context as project knowledge. When this handoff says "see foundational doc," follow that pointer. Re-deriving design decisions from this handoff alone will produce drift.

## Working relationship with Alex

Alex has a CIS Web Developer Certificate from Edmonds College, strong preferences for TypeScript, Tailwind, modern React patterns, and Astro. He wants direct feedback. If a request will not work or there is a better approach, say so and explain why; do not flatter or hedge.

Decisions kept small and sequential. Do not try to resolve five things at once.

Voice for the publication itself: darkly comedic, memoir-first, outsider-legible. Voice for working conversations: direct, honest, willing to push back.

## Project context (one paragraph)

Sentence Structure is a personal blog about the prison experience with adjacent columns for personal writing and rehabilitative practice. Six columns: Memoir, Concrete Truths, Economics of, Hearsay, Off the Record, Protective Factors. The Memoir column has a chronological architecture (the spine) not shared by the other columns. The publication's authority comes from lived experience; design should support reading and stay out of the way. Dark mode mandatory from day one.

## Tech stack — versions and dependencies


```json
// package.json dependencies — CORRECTED to the as-built versions.
// (Original plan targeted Astro 5 / MDX 4 / Zod 3 / TS 5.6; the build
//  moved to Astro 6 + the Content Layer API. CLAUDE.md is authoritative.)
{
  "dependencies": {
    "astro": "^6.3.1",
    "@astrojs/mdx": "^5.0.0",
    "tailwindcss": "^4.3.0",
    "@tailwindcss/vite": "^4.3.0",
    "remark-breaks": "^4.0.0",
    "@fontsource-variable/newsreader": "^5.2.0",
    "@fontsource-variable/ibm-plex-sans": "^5.2.0",
    "@fontsource/ibm-plex-mono": "^5.2.0",
    "zod": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^6.0.0",
    "vite": "^7.3.2",
    "@types/node": "^22.0.0"
  }
}
```

Version notes (as-built):
- **Zod is imported from `zod` directly**, not from `astro:content` (Astro 6 deprecated the re-export).
- **`vite@^7.3.2` is pinned at the top level** to dedupe — without it `@tailwindcss/vite` pulls Vite 8 (Rolldown) and the build breaks.
- **Tailwind v4 is wired via the `@tailwindcss/vite` plugin** under `vite.plugins`, not via a Cloudflare/Astro adapter.
- **`remark-breaks`** renders single newlines as `<br>` (OTR poetry line breaks, stacked Protective Factors lists).
- Node `>=22.12`.



Notes:
- **Tailwind v4 uses CSS-first config via `@theme`, not `tailwind.config.js`.** This is a major shift from v3. The full theme config goes in `src/styles/global.css`. There is no JS config file.
- **Fontsource Variable** packages give us optical-size-axis support for Newsreader and weight-axis support for Plex Sans without managing separate weight files.
- **Plex Mono** is not variable; the standard package is correct.
- **Zod** ships with Astro's content collections; the explicit dependency line is for direct schema work outside collections.

Verify versions before installing — these are the versions current as of this handoff. Use `npm install` defaults unless versions have moved significantly.

## File structure


```
sentence-structure/
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   └── images/
│       └── placeholder/          # solid-color column blocks during build
├── src/
│   ├── content/
│   │   ├── config.ts             # Zod schemas — see "Content collections" below
│   │   ├── memoir/
│   │   ├── concrete-truths/
│   │   ├── economics-of/
│   │   ├── off-the-record/
│   │   └── protective-factors/
│   ├── components/
│   │   ├── chrome/
│   │   │   ├── TopNav.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ReadingProgress.astro
│   │   │   ├── NewsletterPrompt.astro
│   │   │   ├── MenuWheel.astro          # desktop homepage signature
│   │   │   └── HamburgerMenu.astro      # mobile equivalent
│   │   ├── post/
│   │   │   ├── ArticleHeader.astro
│   │   │   ├── BylineStrip.astro
│   │   │   ├── ColumnTagPill.astro
│   │   │   ├── PullQuote.astro          # MDX component
│   │   │   ├── Sidenote.astro           # MDX component
│   │   │   ├── Stat.astro               # MDX component for inline mono stats
│   │   │   ├── BlockQuote.astro         # MDX component
│   │   │   └── RelatedPosts.astro
│   │   ├── homepage/
│   │   │   ├── Hero.astro
│   │   │   ├── MosaicAnchorRow.astro
│   │   │   ├── MosaicColumnShowcase.astro
│   │   │   ├── MosaicArchiveSampler.astro
│   │   │   └── ManifestoStrip.astro
│   │   ├── column-landing/
│   │   │   ├── ColumnHeader.astro
│   │   │   ├── BaseTemplate.astro       # used by CT, EoO, PF
│   │   │   ├── MemoirSpine.astro
│   │   │   ├── MemoirMiniSpine.astro
│   │   │   ├── OffTheRecordList.astro
│   │   │   └── ColumnEmptyState.astro
│   │   └── archive/
│   │       ├── FilterChrome.astro
│   │       ├── ResultsRegion.astro
│   │       └── ArchiveEmptyState.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro             # html/head/footer wrapper
│   │   ├── PostLayout.astro             # column-agnostic, column-themed
│   │   └── PageLayout.astro             # for about, archive
│   ├── pages/
│   │   ├── index.astro                  # homepage
│   │   ├── about.astro
│   │   ├── archive.astro
│   │   ├── memoir/
│   │   │   ├── index.astro              # column landing (spine variant)
│   │   │   └── [slug].astro             # post pages
│   │   ├── concrete-truths/
│   │   │   ├── index.astro              # base template
│   │   │   └── [slug].astro
│   │   ├── economics-of/
│   │   │   ├── index.astro              # base template
│   │   │   └── [slug].astro
│   │   ├── off-the-record/
│   │   │   ├── index.astro              # editorial-list variant
│   │   │   └── [slug].astro
│   │   └── protective-factors/
│   │       ├── index.astro              # base template
│   │       └── [slug].astro
│   ├── styles/
│   │   └── global.css                   # Tailwind import + @theme config
│   └── lib/
│       ├── content.ts                   # sorting, filtering, recency utilities
│       ├── memoir-spine.ts              # phase ordering, density mode, "I am here"
│       └── columns.ts                   # column metadata (color, slug, name, etc.)
└── README.md
```



Architectural note on routing: column landings are static-per-column files because each column has distinct landing shape (base template vs. spine vs. editorial list); putting them all behind a single dynamic route would force a giant conditional. Post pages use one `[slug].astro` per column folder for clarity, even though the inner logic is mostly shared via `PostLayout`. Five small near-identical files is cleaner than one big conditional file for this size of project.

## Content collections

> **CORRECTED.** The live config is `src/content.config.ts` using the **Content Layer API** (`glob()` loaders), with `z` imported from `zod`. A shared `basePostFields` object (title, deck?, publishedDate, tags, `crisisResources`) is spread into each collection's schema function, where `image()` supplies an optional `heroImage`. Memoir additionally carries `phase`, `experienceDate`, and `hearsay` references; **hearsay** is its own sixth base collection. The `type: 'content'` code block below is the original pre-build plan, retained as provenance only — `src/content.config.ts` is authoritative.

```typescript
// src/content/config.ts  (ORIGINAL PLAN — live file is src/content.config.ts)
import { defineCollection, z } from 'astro:content';

const phaseEnum = z.enum([
  'jail',
  'shelton',
  'coyote-ridge',
  'monroe',
  'community-custody',
]);

const basePostSchema = z.object({
  title: z.string(),
  deck: z.string().optional(),
  publishedDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
});

// Memoir extends with phase + experienceDate.
// These are required, not optional — type system catches missing values at build time.
const memoirSchema = basePostSchema.extend({
  phase: phaseEnum,
  experienceDate: z.coerce.date(),
});

export const collections = {
  memoir: defineCollection({ type: 'content', schema: memoirSchema }),
  'concrete-truths': defineCollection({ type: 'content', schema: basePostSchema }),
  'economics-of': defineCollection({ type: 'content', schema: basePostSchema }),
  'off-the-record': defineCollection({ type: 'content', schema: basePostSchema }),
  'protective-factors': defineCollection({ type: 'content', schema: basePostSchema }),
};

export type Phase = z.infer<typeof phaseEnum>;
export type MemoirPost = z.infer<typeof memoirSchema>;
export type BasePost = z.infer<typeof basePostSchema>;
```



Notes:
- `z.coerce.date()` parses YAML date strings (`2026-04-12`) into JavaScript Date objects.
- `tags` defaults to empty array so you can omit the field entirely in frontmatter when a post has no tags.
- `column` is implicit from the collection key, not stored in frontmatter. The placeholder content includes a `column:` field in its YAML for human readability; ignore it when wiring into Astro — the collection key is the source of truth.
- The phase enum order in the Zod definition matters: it's the canonical phase order used everywhere downstream (mini-spine, full spine, archive filter UI). Do not reorder.

## Memoir spine logic

The spine has three behaviors that need real code, not just CSS:

1. **Phase ordering** — sort posts within a phase block by `experienceDate` ascending; phase blocks themselves render in fixed enum order.
2. **Density mode per phase** — count posts in each phase, switch the phase block's render mode at thresholds (sparse 1–5, standard 6–15, dense 16+). Standard mode is deferred to a future enhancement; render sparse for now and dense above 15.
3. **"I am here" marker** — anchored to community custody phase, positioned by real-world date relative to phase boundaries. Stays present even at zero posts.


```typescript
// src/lib/memoir-spine.ts
import type { Phase, MemoirPost } from '../content/config';

export const PHASE_ORDER: Phase[] = [
  'jail',
  'shelton',
  'coyote-ridge',
  'monroe',
  'community-custody',
];

export const PHASE_LABELS: Record<Phase, string> = {
  jail: 'Jail',
  shelton: 'Shelton',
  'coyote-ridge': 'Coyote Ridge',
  monroe: 'Monroe',
  'community-custody': 'Community Custody',
};

// Schematic phase weights — proportional to phase DURATION, not post count.
// These drive phase block heights so empty space communicates unwritten time.
// Tune in production based on Alex's actual timeline.
export const PHASE_WEIGHTS: Record<Phase, number> = {
  jail: 1,           // weeks
  shelton: 1,        // weeks
  'coyote-ridge': 4, // years
  monroe: 4,         // years
  'community-custody': 2, // medium, ongoing
};

export type DensityMode = 'sparse' | 'standard' | 'dense';

export function getDensityMode(postCount: number): DensityMode {
  if (postCount <= 5) return 'sparse';
  if (postCount <= 15) return 'standard';
  return 'dense';
}

export function groupByPhase(posts: MemoirPost[]): Record<Phase, MemoirPost[]> {
  const grouped = Object.fromEntries(
    PHASE_ORDER.map((p) => [p, [] as MemoirPost[]])
  ) as Record<Phase, MemoirPost[]>;

  for (const post of posts) {
    grouped[post.data.phase].push(post);
  }

  // Sort within each phase by experienceDate ascending
  for (const phase of PHASE_ORDER) {
    grouped[phase].sort(
      (a, b) =>
        a.data.experienceDate.getTime() - b.data.experienceDate.getTime()
    );
  }

  return grouped;
}
```



The "I am here" marker position requires Alex's actual community custody dates to compute correctly. Hardcode a placeholder constant for now and flag it; Alex will provide real dates before the spine renders against truth.


```typescript
// Placeholder — replace with real dates before launch
export const COMMUNITY_CUSTODY_START = new Date('2025-08-22');
export const COMMUNITY_CUSTODY_END = new Date('2026-08-22'); // estimated
```



## Tailwind v4 @theme config


```css
/* src/styles/global.css */
@import "tailwindcss";

@import "@fontsource-variable/newsreader";
@import "@fontsource-variable/ibm-plex-sans";
@import "@fontsource/ibm-plex-mono/400.css";
@import "@fontsource/ibm-plex-mono/500.css";

@theme {
  /* ============================================================
     TYPOGRAPHY — twelve semantic tokens
     ============================================================ */

  /* Display tier (hand-tuned, mobile clamps) */
  --text-manifesto: clamp(42px, 3.13vw + 32px, 64px);
  --text-manifesto--line-height: 1.05;
  --text-manifesto--font-weight: 500;

  --text-hero: clamp(36px, 2.3vw + 29px, 52px);
  --text-hero--line-height: 1.10;
  --text-hero--font-weight: 600;

  --text-title: clamp(30px, 2vw + 24px, 44px);
  --text-title--line-height: 1.15;
  --text-title--font-weight: 600;

  /* Editorial middle (modular 1.250) */
  --text-pull: 28px;
  --text-pull--line-height: 1.35;
  --text-pull--font-weight: 500;

  --text-h2: 24px;
  --text-h2--line-height: 1.25;
  --text-h2--font-weight: 500;

  --text-deck: 22px;
  --text-deck--line-height: 1.40;
  --text-deck--font-weight: 400;
  --text-deck--font-style: italic;

  --text-h3: 19px;
  --text-h3--line-height: 1.30;
  --text-h3--font-weight: 500;

  --text-body: 18px;
  --text-body--line-height: 1.65;
  --text-body--font-weight: 400;

  --text-verse: 18px;
  --text-verse--line-height: 1.45;
  --text-verse--font-weight: 400;

  /* UI tier */
  --text-meta: 14px;
  --text-meta--line-height: 1.40;
  --text-meta--font-weight: 400;

  --text-caption: 13px;
  --text-caption--line-height: 1.40;
  --text-caption--font-weight: 400;
  --text-caption--font-style: italic;

  --text-eyebrow: 12px;
  --text-eyebrow--line-height: 1.30;
  --text-eyebrow--font-weight: 500;
  --text-eyebrow--letter-spacing: 0.02em;

  /* ============================================================
     FONT FAMILIES
     ============================================================ */

  --font-serif: 'Newsreader Variable', Georgia, serif;
  --font-sans: 'IBM Plex Sans Variable', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  /* ============================================================
     COLUMN PALETTES — six stops each
     STARTING VALUES — verify against real imagery and dark mode contrast
     ============================================================ */

  /* Memoir — coral (hue ~25) */
  --color-memoir-100: oklch(0.92 0.04 25);
  --color-memoir-200: oklch(0.82 0.10 25);
  --color-memoir-300: oklch(0.70 0.16 25);
  --color-memoir-400: oklch(0.58 0.20 25);  /* primary accent */
  --color-memoir-500: oklch(0.45 0.18 25);
  --color-memoir-600: oklch(0.32 0.10 25);  /* faint borders */

  /* Concrete Truths — blue (hue ~245) */
  --color-concrete-truths-100: oklch(0.92 0.04 245);
  --color-concrete-truths-200: oklch(0.82 0.10 245);
  --color-concrete-truths-300: oklch(0.68 0.16 245);
  --color-concrete-truths-400: oklch(0.52 0.20 245);
  --color-concrete-truths-500: oklch(0.40 0.18 245);
  --color-concrete-truths-600: oklch(0.28 0.10 245);

  /* Economics of — amber (hue ~75) */
  --color-economics-of-100: oklch(0.94 0.04 75);
  --color-economics-of-200: oklch(0.85 0.10 75);
  --color-economics-of-300: oklch(0.72 0.14 75);
  --color-economics-of-400: oklch(0.60 0.16 75);
  --color-economics-of-500: oklch(0.48 0.14 75);
  --color-economics-of-600: oklch(0.34 0.08 75);

  /* Off the Record — sage (hue ~150) */
  --color-off-the-record-100: oklch(0.92 0.04 150);
  --color-off-the-record-200: oklch(0.82 0.08 150);
  --color-off-the-record-300: oklch(0.68 0.12 150);
  --color-off-the-record-400: oklch(0.55 0.14 150);
  --color-off-the-record-500: oklch(0.42 0.12 150);
  --color-off-the-record-600: oklch(0.30 0.07 150);

  /* Protective Factors — teal (hue ~195) */
  --color-protective-factors-100: oklch(0.92 0.04 195);
  --color-protective-factors-200: oklch(0.82 0.09 195);
  --color-protective-factors-300: oklch(0.68 0.13 195);
  --color-protective-factors-400: oklch(0.55 0.16 195);
  --color-protective-factors-500: oklch(0.42 0.14 195);
  --color-protective-factors-600: oklch(0.30 0.08 195);

  /* Structural purple/indigo — publication voice color
     Used for manifesto strip, newsletter prompt, about page progress bar.
     Deliberately separate from column palette. */
  --color-structural-100: oklch(0.92 0.04 280);
  --color-structural-200: oklch(0.80 0.10 280);
  --color-structural-300: oklch(0.66 0.16 280);
  --color-structural-400: oklch(0.50 0.20 280);  /* primary */
  --color-structural-500: oklch(0.38 0.18 280);
  --color-structural-600: oklch(0.26 0.10 280);

  /* ============================================================
     NEUTRALS (dark mode default)
     ============================================================ */

  --color-bg: oklch(0.15 0.005 280);          /* primary background */
  --color-bg-elevated: oklch(0.20 0.005 280); /* card surfaces */
  --color-text: oklch(0.95 0.005 280);        /* primary text */
  --color-text-secondary: oklch(0.72 0.005 280);
  --color-text-tertiary: oklch(0.50 0.005 280);
  --color-border: oklch(0.30 0.005 280);
}
```



**Critical color note.** OKLCH values above are *starting points*. Verify on real imagery before committing. Specifically:

- WCAG AA contrast must hold for `text-color-{column}-100 on bg`. Test each column's 100-stop against the dark background.
- Pull quote treatment uses 400-stop for the left rule and 100-stop for the text. The 400-stop must read as "accent" not "muted" against the dark background.
- Dashed borders in empty states use 600-stop. They should be visible but quiet.

If contrast fails any check, adjust the lightness on the failing stop and re-verify. Don't move chroma to fix contrast — that shifts the hue identity of the column.

## Treatment implementations

The foundational doc specifies the treatments. Code-side notes for the trickier ones:

### Drop cap (Memoir only)

CSS `::first-letter` on the first paragraph of memoir post body. Scope by class on the post body wrapper.


```css
.post-body--memoir > p:first-of-type::first-letter {
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: 60px;
  line-height: 1;
  float: left;
  margin: 0.1em 0.1em 0 0;
  color: var(--color-text); /* primary text, not column accent */
}
```



The drop cap is a memoir signal, not a column-color signal. Do not apply column color here. Holds at 60px on mobile because it's measured against body, not viewport.

### Pull quote (MDX component)


```astro
---
// src/components/post/PullQuote.astro
interface Props {
  column: string;
}
const { column } = Astro.props;
---

<blockquote class={`pull-quote pull-quote--${column}`}>
  <slot />
</blockquote>

<style>
  .pull-quote {
    border-left: 3px solid var(--rule-color);
    padding-left: 22px;
    margin: 1.75rem 0;
    font: var(--text-pull);
    font-family: var(--font-serif);
    color: var(--text-color);
  }
  .pull-quote--memoir {
    --rule-color: var(--color-memoir-400);
    --text-color: var(--color-memoir-100);
  }
  .pull-quote--concrete-truths {
    --rule-color: var(--color-concrete-truths-400);
    --text-color: var(--color-concrete-truths-100);
  }
  /* ... and so on for each column */
</style>
```



Pass `column` from the post page: `<PullQuote column={post.collection}>...</PullQuote>`.

### Sidenote (MDX component, dual-mode)

Desktop: 140px right-margin column, 28–32px gap from body. Mobile: inline expansion below the referencing paragraph. Use a single component with media-query-driven layout.

The inline reference (the superscript number) and the note body need to be linked. Suggested approach: numbered prop, both reference and note use the same `n`, container queries or media queries handle the layout.

This is the most complex treatment in the spec. Build it last among the post-page components, against The First Count placeholder content which uses two sidenotes deliberately positioned to test both desktop margin column and inline mobile rendering.

### Inline mono stat

Cleanest as a small MDX component:


```astro
---
// src/components/post/Stat.astro
---
<span class="inline-stat"><slot /></span>

<style>
  .inline-stat {
    font-family: var(--font-mono);
  }
</style>
```



Used inline: `approximately <Stat>$1.40</Stat> at current rates`.

The placeholder content uses bracket markers `[INLINE STAT IN MONO: \`$0.06\`]` to indicate where these go. Convert to `<Stat>` components when wiring up.

### Reading progress bar

Client-side. Use vanilla JS or a small Astro `<script>`-based component. No React needed for this. Update CSS custom property `--progress` based on scroll position, render the bar as a gradient using that variable.

## Build order

The foundational doc commits this order. Encode it as phases:

### Phase 1 — Foundation (1–2 days)

1. `npm create astro@latest sentence-structure`
2. Install dependencies (see "Tech stack" above)
3. Configure `astro.config.mjs` for MDX, the `@tailwindcss/vite` plugin, and `remark-breaks`. No Cloudflare/SSR adapter — `output: 'static'` is sufficient for SSG.
4. Create file structure (above)
5. Write `src/content/config.ts` with full Zod schemas
6. Write `src/styles/global.css` with full `@theme` config
7. Drop placeholder content files into `src/content/{column}/` directories (split from the placeholder content doc)
8. Verify `npm run dev` builds without errors and content collections type-check

### Phase 2 — Post template (2–3 days)

The post template is built first deliberately — it forces real writing into the system, validates the column-agnostic-but-column-themed template against actual content, and gives a complete reader experience for any single post before any other surface depends on it.

1. `BaseLayout.astro` (html/head/footer wrapper)
2. `TopNav.astro`, `Footer.astro` (release-on-scroll, no menu wheel here)
3. `PostLayout.astro` (column-agnostic, column-themed via prop)
4. `ColumnTagPill.astro`, `ArticleHeader.astro`, `BylineStrip.astro`
5. `PullQuote.astro`, `Stat.astro`, `BlockQuote.astro` (MDX components)
6. `Sidenote.astro` (last — most complex)
7. Drop cap CSS for memoir
8. `[slug].astro` for each column folder (5 near-identical files)
9. Reading progress bar
10. Newsletter prompt component (will be reused on multiple pages)
11. Render every placeholder post; verify all treatments work

Acceptance criteria for Phase 2: every placeholder post in the placeholder content doc renders correctly with all relevant treatments. Drop cap on memoir posts. Pull quotes in correct column color. Sidenotes margin-positioned on desktop and inline-expanded on mobile. Inline mono stats render in Plex Mono.

### Phase 3 — Homepage (2 days)

Per the foundational doc's homepage IA. Build with conditional rendering for sparse content — at low post counts, the manifesto strip sits more prominently and shrinks as content fills in.

### Phase 4 — Column landing pages (3–4 days)

In this order: base template first (used by three columns), then Memoir spine variant, then Off the Record editorial-list variant. Each gets both populated and empty states.

### Phase 5 — About page (1 day)

Per the about page IA. Title is "How I Got Here." Hero image is generative-portrait treatment (run through Nano Banana or similar) — placeholder solid color block until real imagery exists.

### Phase 6 — Archive page (2 days)

Last in build order because it depends on tag taxonomy stabilizing across all the content. Below 6 posts total, archive renders the threshold empty state. Filter chrome scrolls away with content (not sticky). URL params for filter state.

### Phase 7 — Polish and a11y verification (1–2 days)

Run through the accessibility requirements (next section). Test in actual reduced-motion and reduced-transparency environments, not just by toggling a CSS class.

## Accessibility requirements

These are non-negotiable, committed in the foundational doc:

- **WCAG AA contrast** on all text-over-image treatments. Test pull quote text colors, hero glass card text on full-bleed images, related-post tile titles. Use a tool, don't eyeball.
- **`prefers-reduced-transparency`** respected. Liquid Glass surfaces should fall back to solid backgrounds. Audit every glass surface (hero card, header, etc.) and provide a solid-bg fallback.
- **`prefers-reduced-motion`** respected. The "I am here" pulse animation falls back to static glow. Any other animations need explicit reduced-motion handling.
- **Full keyboard navigation for the menu wheel.** This is the single most likely a11y failure point. The wheel is a desktop signature with non-standard layout; it needs explicit tab order, focus indicators, and arrow-key navigation between menu items. Test with keyboard only.

## Deployment configuration

Target: Cloudflare Pages, free tier.


```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://sentencestructure.blog', // replace with .pages.dev URL during build
  integrations: [mdx()],
  output: 'static', // SSG — no SSR needed for this project
});
```


During development the site lives at the platform subdomain (e.g., `sentence-structure.pages.dev`). Custom domain attaches later via DNS without affecting the build pipeline. Setup deferred until build is ready to deploy.

For Cloudflare Pages connection: Git repository → Cloudflare Pages dashboard → create project → connect repo → set build command `npm run build` and output directory `dist/`. Per-branch preview URLs come for free.

## What NOT to build

The foundational doc lists Future enhancements (deferred items). Do not build any of these unless explicitly asked:

- **Spine standard mode** (6–15 posts per phase). Render sparse mode for 1–15 posts, dense mode for 16+, until standard mode design exists.
- **Spine dense-row inline expansion** on hover/focus. Not yet designed.
- **Mobile spine layout details** (alternating cards collapsing to single side). Build a minimum-viable mobile spine; full mobile design pass comes later.
- **Off the Record post page variant** (collapsed elements, Notes affordance integration, dedications/epigraphs treatment). Use the standard post template for Off the Record posts for now; the variant comes later.
- **Protective Factors listing pattern variant.** Use base template for Protective Factors; reconsider when that column populates.
- **Search box on archive.** Defer entirely.
- **Comments anywhere.** Not part of the design.
- **Social proof, press logos, testimonials, popup CTAs.** All explicitly excluded.

Empty states for content that doesn't exist yet *are* part of the design. Build them.

## Gotchas — things most likely to go wrong

1. **Tailwind v4 is not v3.** No `tailwind.config.js`. All config in CSS via `@theme`. Custom utilities use CSS variables, not theme function calls. If you find yourself reaching for v3 patterns, stop and check the v4 docs.

2. **Astro content collections require `npm run dev` to generate types.** If you write a query against a collection and the types aren't found, the dev server hasn't run yet. Start it.

3. **MDX components must be passed via the `components` prop** of `<Content />` — they're not auto-resolved. Set up a `mdx-components.ts` re-export pattern or pass explicitly:
   ```astro
   <Content components={{ PullQuote, Sidenote, Stat, BlockQuote }} />
   ```

4. **Drop cap is Memoir-only.** Scope the CSS by class. If you put `::first-letter` styling on `.post-body` globally, every column gets a drop cap and the spec breaks.

5. **`text-verse` is verse-only.** Don't apply it to prose paragraphs in Off the Record (dedications, epigraphs, short personal essays). The placeholder content doesn't include any prose pieces in Off the Record yet, but the Off the Record column landing template needs to handle both.

6. **The Off the Record column landing renders full poems on the listing page.** This is not a tiles grid. It's an editorial list at ~520px reading measure with poems rendered inline, separated by asterism. See foundational doc for the full spec.

7. **The untitled Off the Record poem** has an empty `title` field in frontmatter. The column landing template must detect this and render the poem's first line in italic at `text-pull` size as the entry title. Standard chapbook convention.

8. **`column` field in placeholder content frontmatter is for human readability only.** The Astro content collection key is the source of truth. Don't add a `column` field to the schema.

9. **Phase enum order matters globally.** The order in `PHASE_ORDER` is the canonical order for the mini-spine, full spine, archive filter UI, and any other phase-rendering surface. Don't reorder.

10. **"I am here" marker needs real dates.** Hardcode placeholder constants and flag them. Alex will provide real community custody start/end dates before the spine renders against truth.

11. **Cloudflare Pages build minutes.** The free tier has unlimited bandwidth but capped build minutes (500/month at handoff time). Don't trigger builds on every keystroke — branch deploys only when you push to a branch.

12. **Bracket placeholder convention from the placeholder content doc** (`[SIDENOTE 1: ...]`, `[INLINE STAT IN MONO: \`$0.06\`]`, `[PULL QUOTE: "..."]`) is *for human reading of the placeholder doc only*. When you migrate placeholder content into actual `.md`/`.mdx` files in `src/content/`, convert these markers to real MDX components. The bracket markers should not appear in any rendered page.

## First session moves

When you open a fresh session against this handoff:

1. Read all three project knowledge files in full before writing code.
2. Confirm the file structure with Alex before creating it — there may be preferences not captured here.
3. Set up Phase 1 in one sitting (foundation). Verify the dev server runs and content collections type-check before moving on.
4. Phase 2 (post template) gets multiple sessions; each session should leave the post page renderable for the columns it's worked on.

Ask Alex for clarification when:
- A spec ambiguity surfaces that the foundational doc doesn't resolve.
- A code-side decision affects multiple files in non-obvious ways (e.g., shared utility design).
- You're tempted to build a deferred item because "it would only take a minute." It would not.

## Document ownership

The foundational doc and placeholder content doc are maintained in chat conversations with Alex (not in Claude Code). When design decisions change, Alex will update those documents and re-paste them into project knowledge. Claude Code's job is implementation — if you find yourself wanting to revise the design, raise it with Alex rather than implementing the revision unilaterally.

This handoff document is a snapshot; it does not get updated as the build progresses unless Alex explicitly asks for a revision.

---

## Phase 1 implementation deviations (added by Claude Code, 2026-05-09)

The handoff above is the original specification. Phase 1 build introduced eight deviations, documented in [PR #1](https://github.com/alexmfritz/sentence-structure/pull/1). The most load-bearing for future phases:

1. **Astro Content Layer API** is used instead of legacy `defineCollection({ type: 'content' })`. Config moved from `src/content/config.ts` to `src/content.config.ts`. Each collection uses `loader: glob({ pattern, base })`.
2. **`z` is imported from `zod`**, not `astro:content`. Astro 6 deprecated the re-export. `zod` is a direct dependency.
3. **Tailwind v4 wired via `@tailwindcss/vite`** plugin under `vite.plugins`. The handoff's adapter mention is moot.
4. **`vite@^7.3.2` pinned at top level** of devDeps to dedupe — without it, `@tailwindcss/vite@4.3.0` pulls in Vite 8 (with Rolldown) and the build breaks.
5. **`font-style: italic` for `text-deck` / `text-caption`** is applied via `@layer base`, not via `--text-*--font-style` (Tailwind v4 doesn't support that sub-property).
6. **`column` field stripped from placeholder content frontmatter** — collection key is source of truth (matches handoff gotcha #8).
7. **No Cloudflare Pages adapter** — `output: 'static'` is sufficient for SSG.
8. **`MemoirEntry` type** added to `src/lib/memoir-spine.ts` = `CollectionEntry<'memoir'>`. Distinct from `MemoirPostData` (Zod-inferred frontmatter shape) in `src/content.config.ts`.

See `CLAUDE.md` at the repo root for the post-Phase-1 stack snapshot, build commands, branch/PR convention, and current phase status.
