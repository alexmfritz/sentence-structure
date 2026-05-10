SENTENCE STRUCTURE
Foundational context document

OVERVIEW
Sentence Structure is a personal blog about the prison experience, with adjacent columns for personal writing and rehabilitative practice. The name carries a dual meaning: the prison sentence and the writing sentence. Outsider-legible, signals a writer at work, gives the widest tonal range across darkly comedic memoir and journalistic criticism.
Tagline and editorial promise: "What They Don't Tell You" - used as a tagline on the homepage manifesto strip and as the publication's editorial promise to readers.

VOICE
Darkly comedic, memoir-first, with space for journalistic integrity backed by real statistics. Outsider-legible, not academic, not New Yorker. Personal, grounded, honest. The writing carries the seriousness; design and tone do not over-signal it.

COLUMN STRUCTURE
Five columns, two thematic groupings.

Prison-experience writing:

Memoir - personal narrative writing about the prison experience. Color: coral. See MEMOIR SPINE for the column's chronological architecture.
Concrete Truths - journalistic criticism with statistics, data, and citations. The serious column. Color: blue.
Economics of - satirical economic analysis. "The Economics of Ramen," "The Economics of the Phone Call," "The Economics of the Visit," "The Economics of Good Time." Color: amber.

Adjacent personal work:
4. Off the Record - poetry and personal writing developed as a coping skill, not necessarily about prison. Carries the dual meaning of "off the journalistic record" and "on the personal record." Color: sage.
5. Protective Factors - CBT/DBT content learned in rehabilitative programming. Clinical term with legitimate weight from suicide prevention, addiction recovery, and forensic mental health contexts. Dual reading of clinical concept and personal practice. Color: teal.

Note on the column palette: the five column colors (coral, blue, amber, sage, teal) are reserved for column identity and are the only colors used to label posts, tag pills, related-tile fills, progress bars, and column landing pages. The manifesto strip and newsletter prompt use a structural purple/indigo, deliberately separate from the column palette. Purple/indigo is the publication's editorial voice color; column colors are the labels.

MEMOIR SPINE
The Memoir column has a chronological architecture not shared by the other four columns.

Phase enum (Zod):
- jail
- shelton
- coyote-ridge
- monroe
- community-custody

Phase order is fixed and global. Posts belong to a phase block on the Memoir column landing page, in the order jail → Shelton → Coyote Ridge → Monroe → community custody. Community custody is a bounded post-release supervision phase, not an open-ended "after" — narrowed deliberately to preserve the prison-experience framing of the publication while acknowledging that the legal sentence doesn't end the day you walk out of Monroe.

Dual-date model:
- experienceDate - when the event being written about actually happened. Drives spine position within the phase block.
- publishedDate - when the post goes live. Drives recency surfaces (homepage hero, RSS, recent-archive tiles, newsletter).

Posts can be written in any order. A post about week-one Shelton drafted years after release backfills into the Shelton block at its correct experienceDate position, while still appearing as the most recent post on recency-driven views. Multiple posts in a row about the same phase sit together inside that phase block, ordered by experienceDate.

Edge case noted, not yet resolved: transitions between phases (e.g. the bus ride from Shelton to Coyote Ridge) are real experiences that don't sit cleanly in either phase. Convention to be set when the first transition post is written; current lean is to assign to the destination phase with experienceDate equal to arrival day.

The other four columns (Concrete Truths, Economics of, Off the Record, Protective Factors) do not carry phase or experienceDate fields. Their schemas use publishedDate only. Memoir extends a base post schema rather than putting these as optional global fields, so the type system catches a missing phase at build time.

DESIGN DIRECTION
Aesthetic references:

Apple Newsroom for progressive tile sizing where size encodes editorial weight, not just fills cells
Atavist Magazine for cinematic feature treatments and chapter pacing
Emergence Magazine for photo-led longform and atmospheric mood without gimmickry
Vercel and Linear for technical execution of translucency and blur on the web (with the caveat that both feel too gridlocked or sharp on their own)
Liquid Glass concept from Apple's recent OS updates

Aesthetic anti-references:

rauno.me, lynnandtonic.com, and most personal-portfolio-as-art-piece sites. The publication is blog-as-publication, where the reader should forget the interface and stay in the writing.
The Marshall Project. Too academic and journalistic; the publication is grounded and personal.

Design principles:

Reading is the priority. Every element earns its place by serving reading or a clear secondary purpose.
Asymmetric, not symmetric. Tile sizes vary by editorial weight. Aspect ratios vary deliberately. Some tiles bleed, others have padding.
Liquid Glass is a softening layer, not a structural one. Glass surfaces sit on top of imagery doing work, not flat color.
Translucency and blur respected via prefers-reduced-transparency.
Animations respected via prefers-reduced-motion.
WCAG AA contrast maintained on all text-over-image treatments.
Dark mode mandatory, designed from day one not retrofitted.

IMAGERY SYSTEM
Three categories with distinct roles:
Personal photography. Photos of the author. Used for hero images on Memoir posts and the about page. Grounding, signals memoir.
PNW landscape stock or original photography. Atmospheric, situating, geographically specific to Washington State. Used for posts that need mood without being explicitly about the writer or the subject. Establishes place.
AI-generated abstract or atmospheric, or satirical sketches. Used for posts where literal imagery would be wrong (Concrete Truths data pieces, Economics of pieces, satirical or absurd content). Abstraction does work that photography cannot.
Visual cohesion across categories: consistent color grading (slight desaturation, consistent contrast curve), format consistency (same hero aspect ratios, same overlay treatments), typography as the constant tying it all together.
Satirical sketches require a defined style: line weight, color palette, level of detail. Once defined, applied consistently so they read as a recurring feature.

TYPOGRAPHIC SYSTEM
Three faces, all open-source under SIL OFL, self-hosted via Fontsource on jsdelivr (CDN: cdn.jsdelivr.net/npm/@fontsource-variable/...).

Newsreader Variable (Production Type) - body serif. Workhorse for article body. Also handles all editorial display: post titles, manifesto strip, hero glass card, deck, pull quotes. Optical-size axis built in, so the same family covers 13px sidenotes through 64px manifesto without managing separate weight files.

IBM Plex Sans Variable (IBM / Mike Abbink) - sans pair. Handles UI chrome (top nav, byline strip, buttons, form fields, footer), H2 and H3 subheadings inside articles, captions, eyebrow labels, and column tag pills. Humanist character with a double-story g and slightly mechanical edges. Pairs warmly with Newsreader without competing for attention.

IBM Plex Mono - monospace. Used for the placeholder bracket convention ([ This is a title ]) and for inline statistics and tabular figures inside Concrete Truths posts. Same family relationship to Plex Sans, no third typographic system to maintain.

Type scale: base 18px body, ratio 1.250 (major third) for the modular middle, hand-tuned at the display top end and the UI bottom end. Twelve semantic tokens, defined as Tailwind v4 @theme variables.

Display tier (hand-tuned):
- text-manifesto: 64px / 1.05 / 500 / serif. Manifesto strip ("What They Don't Tell You").
- text-hero: 52px / 1.10 / 600 / serif. Homepage hero glass card title.
- text-title: 44px / 1.15 / 600 / serif. Post title; H1 on column landing and about pages.

Editorial middle (modular 1.250):
- text-pull: 28px / 1.35 / 500 / serif. Pull quote, indented, column accent color. Also used as the entry-title size on the Off the Record column landing.
- text-h2: 24px / 1.25 / 500 / sans. Article subheadings.
- text-deck: 22px / 1.40 / 400 italic / serif. Optional one-sentence summary under post title.
- text-h3: 19px / 1.30 / 500 / sans. Sub-subheadings (rare, mostly Concrete Truths and Protective Factors).
- text-body: 18px / 1.65 / 400 / serif. Article body workhorse, ~480px measure, ~70 chars per line.
- text-verse: 18px / 1.45 / 400 / serif. Poem body on Off the Record column landing and post pages. Same size and family as text-body, tighter leading. Poetry's hard line breaks do work that prose leading does in prose; 1.65 over forced line breaks reads as floating, not breathing. This token's use is scoped strictly to verse; prose paragraphs in any column use text-body.

UI tier (hand-tuned):
- text-meta: 14px / 1.40 / 400 / sans. Byline, nav, button labels, form input, footer.
- text-caption: 13px / 1.40 / 400 italic / sans. Inline image captions, sidenotes when expanded inline on mobile.
- text-eyebrow: 12px / 1.30 / 500 / sans, letter-spacing 0.02em. Column tag pills, overlines, fine UI labels.

Family tokens:
- font-serif: Newsreader Variable, Georgia, serif
- font-sans: IBM Plex Sans Variable, system-ui, sans-serif
- font-mono: IBM Plex Mono, ui-monospace, monospace

Notes on the scale:
- The H2-to-body transition is carried primarily by family change (Plex Sans Medium to Newsreader Regular), not by size jump alone. This is a deliberate editorial decision.
- text-h3 at 19px is intentional. The family change does the hierarchy work. If H3 were much larger than body, it would compete with H2.
- text-eyebrow is the only token with non-default letter-spacing. At 12px on a colored pill, Plex Medium without tracking reads as cramped.
- text-verse is the only token that pairs the same size and family as another token while overriding leading. The pairing is intentional: poems and prose share visual weight on the page, but their internal rhythm differs.
- Display tier scales mobile via clamp(); see TREATMENTS below. Editorial middle and UI tiers stay fixed across viewports.

Component-level usage example: <h2 class="text-h2 font-sans">. Family stays explicit at the component level since most pairings are obvious but a few cross the grain.

TREATMENTS
In-article typographic treatments using the tokens above and the column accent system. Each column inherits its own accent (Memoir coral, Concrete Truths blue, Economics of amber, Off the Record sage, Protective Factors teal); the treatments themselves are column-agnostic in structure.

Drop cap. Memoir column only. Applies to every Memoir post. The first letter of the first body paragraph is set in Newsreader Medium at 60px (approximately 3.5x body), float left, three lines deep, in primary text color (not the column accent). Other columns get no drop cap. The drop cap is a memoir signal, not a column-color signal — making it coral would have it competing with the pull quote for attention. Implementation: CSS ::first-letter on the first paragraph of memoir post body. Drop cap holds at 60px on mobile because it is measured against body, not viewport.

Pull quote. 3px solid left rule in the column accent (column 400 stop). 22px left padding from the rule to the text. text-pull (28px Newsreader Medium). Text in column 100 stop — a light tint of the column color, readable on dark background, signals related-but-elevated. No quotation marks rendered; visual treatment carries the meaning. Vertical margin of 1.5-1.75rem above and below to break the reading rhythm. Stays at 28px on mobile by default. If mobile wrapping feels overwrought in real posts, a clamp can be added later (target range 22-28px), but the default leans toward holding weight on small viewports — a 3-line pull on mobile reinforces the stop-and-look function.

Sidenote (desktop). Right-margin column, 140px wide, separated from the body column by a 28-32px gap. text-caption (13px italic Plex Sans), secondary text color. 1px left rule in column 600 stop (faint, not bright). Numbered marker at the start of each note in column 200 stop, normal weight, 12px. Vertically aligned to the paragraph containing its inline reference.

Sidenote (mobile). No margin column exists; sidenotes expand inline directly below the paragraph that referenced them. Same visual language as desktop (faint column-600 left rule, italic Plex Sans, column-200 numbered marker), now in body flow rather than a parallel column. Always visible, no tap-to-expand. The interruption is intentional on mobile — readers should not have to opt in to see the aside.

Sidenote inline reference. Both desktop and mobile use the same inline marker: 11px Plex Sans Medium superscript in column 200 stop, placed at the end of the relevant clause. On desktop it functions as a visual cue pointing to the margin note; on mobile it functions as a sequential identifier so readers can match reference to expanded note when multiple sidenotes appear close together.

Dialogue. Standard quotation marks, paragraph per speaker, no special spacing or indentation. The voice carries the dialogue; typography stays out of the way. Em-dash dialogue (no quotes, em-dashes mark spoken lines) was considered and rejected for outsider-legibility reasons.

Block quote. Distinct from pull quote. Used when quoting an external source — court documents, regulations, letters from inside, clinical citations, news articles. Indented both sides (1.5rem left and right), italic, 17px Newsreader Regular, secondary text color, no column accent. The absence of column color is the point: the words belong to someone else.

Mobile clamp values. Display tier scales smoothly between mobile and desktop. Editorial middle and UI tiers stay fixed at their tokenized sizes.
- text-title: clamp(30px, 2vw + 24px, 44px). 30px floor at ≤320px viewport, locks at 44px ≥ 1024px.
- text-hero: clamp(36px, 2.3vw + 29px, 52px). 36px floor at ≤320px, locks at 52px ≥ 1024px.
- text-manifesto: clamp(42px, 3.13vw + 32px, 64px). 42px floor at ≤320px, locks at 64px ≥ 1024px.

TECH STACK

Astro for the framework
TypeScript
Tailwind v4 (CSS-first @theme config) for styling
MDX for posts requiring embedded components
Astro content collections with Zod schemas for typed post metadata
Plain Markdown for standard posts
React only where interactivity requires it (charts, calculators, interactive timelines)
Deployment: Cloudflare Pages on the free tier. Unlimited bandwidth, native Astro support, per-branch preview URLs. During development the site lives at the default platform subdomain (e.g. sentence-structure.pages.dev); custom domain attaches later via a DNS change without affecting the build pipeline. Setup deferred until build is ready to deploy.
Formspree or similar for newsletter signup if needed
Domain: sentencestructure.blog. Availability confirmed (DNS lookup negative, zero web references in search). Registration deferred until closer to launch readiness. Recommended registrars at that time: Cloudflare Registrar (ecosystem fit with Pages), Spaceship, or Porkbun. Approximately $30/yr for the .blog TLD; multi-year registration recommended.

Build philosophy: build the full design with all zones, including "Coming soon" empty states for columns and content that does not yet exist. Empty states are part of the design.

HOMEPAGE INFORMATION ARCHITECTURE
Vertical scroll, desktop sized for ~680-1200px content width.
Zone 01 - Header. Wordmark left, minimal. Menu wheel anchored to top-right of hero (not in this header bar) on desktop, hamburger on mobile.
Zone 02 - Hero. Full-bleed image, 2:1 aspect, with translucent glass title card sitting low and left. Single feature, not a carousel. Reserved for latest memoir post or signature features. Menu wheel anchors to top-right of this zone on desktop, opening as down-left wedge into the hero's negative space.
Zone 03 - Mosaic Row 1, the anchor row. One large landscape tile (4x3) plus two stacked square tiles (2x2 each) on the right. Large tile gets editorial weight. Three columns visible above or near the fold.
Zone 04 - Mosaic Row 2, the column showcase. Three vertical 2x3 tiles, one for each prison-experience column (Memoir, Concrete Truths, Economics of) showing the most recent post in each. (To be revisited with five columns - may need to expand.)
Zone 05 - Mosaic Row 3, the archive sampler. Four small 1x1 tiles. Three older posts plus a "view all" tile.
Zone 06 - Manifesto strip. "What They Don't Tell You" tagline in serif (text-manifesto), large weight, generous negative space. Links to about page. Sits more prominently and larger early on while content is sparse, then shrinks to its planned position as content fills in.
Zone 07 - Footer. All five columns, archive, about, newsletter signup, RSS, social.
Mobile: mosaic collapses to single column with varying tile heights preserved. Menu wheel replaced by hamburger opening full-screen typographic menu.

POST PAGE INFORMATION ARCHITECTURE
Vertical scroll, body content max width ~480px (~70 characters per line) for reading comfort.
Zone 00 - Reading progress bar. Thin, top of viewport, fills with column accent color as the reader scrolls.
Zone 01 - Top nav. Wordmark left, links right (Columns, Archive, About, Newsletter). Release-on-scroll, not sticky. No menu wheel here - homepage only.
Zone 02 - Article header. Three sub-zones:

02a Column tag. Pill-shaped, column color, links to column landing page. text-eyebrow.
02b Title. text-title (Newsreader serif), accommodates one or two lines.
02c Deck. Optional one-sentence summary, text-deck (Newsreader italic). Template handles posts with and without.

Zone 03 - Hero image. Full-bleed, no overlay text (title sits above). Column-specific imagery treatment. Some posts (especially Off the Record poems) may omit entirely.
Zone 04 - Byline strip. text-meta. Author, date, read time, share affordance. Single line.
Zone 05 - Article body. text-body (Newsreader serif), generous line height (1.65), ~480px measure.

05a Subheadings. text-h2 (Plex Sans Medium), weight and family break from body serif. text-h3 for sub-subheadings.
05b Pull quotes. text-pull (Newsreader Medium), indented, column accent color. See TREATMENTS for full spec.
05c Inline images. Narrower than hero, with caption (text-caption).
05d Sidenotes. Margin on desktop, expands inline on mobile. See TREATMENTS for full spec. Especially important for Concrete Truths (statistical sources) and Protective Factors (clinical citations).

Zone 06 - Article footer.

06a Author bio strip. Photo, name, brief bio, link to about page.
06b Tags. Link to filtered archive views.
06c Share affordance.

Zone 07 - Related posts. Four small tiles. Algorithm: column first, then tags, then recency. Empty states use dashed-border "Coming soon" tiles styled to match placeholder convention.
Zone 08 - Newsletter prompt. Quiet single-field signup, structural purple accent (matches manifesto strip), no popup or interrupt patterns.
Zone 09 - Footer. Same as homepage.
The template is column-agnostic but column-themed. Each column inherits a color and treatment variant: progress bar accent, column tag fill, pull quote treatment, inline image accent, related-post tiles. Off the Record poetry collapses certain elements (no hero, shorter body, possibly no pull quotes). Protective Factors leans on sidenotes and structured callouts. Memoir posts surface their phase tag alongside the column tag. Memoir posts also receive the drop cap treatment on the first body paragraph (see TREATMENTS).

COLUMN LANDING PAGE INFORMATION ARCHITECTURE
Each column has its own landing page — the page readers arrive at when clicking a column tag pill, the column name in nav, or "View all" from a homepage tile. Five columns, three structural patterns: a base template (Concrete Truths, Economics of, Protective Factors), the Memoir spine variant, and the Off the Record editorial-list variant.

Base template zones:
Zone 01 - Top nav. Same as post page. No menu wheel.
Zone 02 - Column header. Pronounced through context, not type inflation. Tinted gradient panel in column color, eyebrow ("Column"), column name in text-title (44px Newsreader 600), brief one-sentence deck in text-deck italic. Centered composition, generous padding (~3.5rem vertical). The gradient panel and surrounding framing carry the "you've arrived somewhere" signal; text-title (44px) is not inflated to text-hero (52px) — that token is reserved for homepage hero and inflating it here would dilute the type system.
Zone 03 - Feature post. Most recent or signature post given hero treatment: full-bleed image, column tag pill, byline strip, title in serif (32px — smaller than column title 44px to preserve column-as-H1 hierarchy), deck in serif body. The feature title is deliberately smaller than the column title; the column itself is the page's H1, even though the feature is the most prominent post.
Zone 04 - Mosaic listing. Asymmetric three-row pattern. Row 1: one big tile (4:3 aspect) plus two stacked small tiles (16:9 natural fill). The big tile gets stat-led treatment when applicable — Plex Mono for inline statistics in Concrete Truths. Row 2: three medium tiles (3:4 vertical). Row 3: four small tiles (1:1 squares); fourth tile doubles as "View all → Archive" link. All tiles use column-themed backgrounds at varying saturation, hover states brighten background and border.
Zone 05 - Newsletter prompt. Same as post page (publication-wide newsletter, structural purple).
Zone 06 - Footer. Same as homepage.

The mosaic adapts to post count: skipped at zero posts (replaced by empty-state treatment), sparse at low counts (fewer rows), fills out as content grows. Protective Factors may eventually need a different listing pattern (CBT/DBT content has more uniform editorial weight per piece) — to be reconsidered when that column populates.

Base template empty state. When a column has zero posts, zones 03 and 04 are replaced by a designed full-page editorial treatment. Not "Coming soon" placeholder UI — a deliberate page that communicates what the column WILL be.
- Zone 02 expanded — column header gets a longer manifesto paragraph below the deck (text 17px / 1.60 / regular / serif, muted). 2-3 sentences communicating editorial scope.
- Zones 03 + 04 replaced — "Coming to this column" section with three placeholder tiles in row-2 layout (medium 3:4 aspect). Each tile uses the populated tile pattern with empty-state visual treatment: dashed border (1px in column-600 stop), reduced background opacity (~0.45), eyebrow showing topic, bracketed title describing a specific planned piece, "Forthcoming" in mono at the bottom. Placeholder tiles should describe REAL planned pieces, not generic placeholders.
- Zone 05 replaced — column-specific subscribe prompt (replaces publication-wide newsletter). Column-themed panel: "Be notified when [Column Name] begins" heading (Newsreader 28px), brief italic deck, email field + button in column accent. Anti-marketing copy: "A short note when the first piece publishes. No promotion, no list resale, no other publications."

The entire empty state stays in column color — header gradient, placeholder tiles, subscribe prompt all use the column accent. The publication's structural purple/indigo appears only on publication-wide pages (homepage manifesto, post-page newsletter), not on column-specific empty states.

Memoir spine variant. Memoir replaces zones 03 + 04 with a vertical spine — a chronological journey from intake through community custody. The spine is the page's spatial metaphor; the page tells a story by being scrolled.

Mini-spine navigation in column header. Below the deck in zone 02, a horizontal miniature version of the spine: five clickable phase markers connected by a horizontal line, each showing phase name and post count. Tap a marker → smooth-scroll to that phase block. Does four jobs: navigation, structural preview, density signal, current-position marker. Current phase gets the "I am here" highlight treatment (light coral with halo) — same visual logic as the full-spine pulse, so position-in-journey is communicated from page top. Mini-spine works at any density including zero — empty phases show "—" instead of zero counts.

Full vertical spine. Centered 2px coral line with gradient fade at top and bottom edges. Five phase markers: filled circles (36px diameter, coral 400) at each phase boundary, with phase label below the circle. Posts hung off the spine alternating left/right of center, each connected to the spine by a horizontal connector with a small dot at the spine intersection.

Schematic spacing. Phase block heights are proportional to phase DURATION not post count. Jail and Shelton are short blocks (weeks); Coyote Ridge and Monroe are tall blocks (years); community custody is medium and ongoing. If a phase has zero posts, the phase block still renders at its proportional height — empty space communicates duration as unwritten time. If a phase has 50 posts, the phase block is still proportional to duration; the dense mode handles content compression.

Density-adaptive layout per phase. Phase blocks switch visual modes based on post count to handle the full density curve from zero to 50+:
- Sparse mode (1-5 posts): full post cards with eyebrow + title + date, alternating left/right of spine. ~90px per post including spacing. Editorial weight, breathing room.
- Standard mode (6-15 posts): smaller cards, still alternating sides. To be designed when this density appears in real content.
- Dense mode (16+ posts): single-row entries crossing the spine. Eyebrow on left of spine, title and date on right, dot at the spine intersection. Fixed row height ~36px with single-line truncation. Hover states preserved (subtle background tint).

The mode change happens at phase boundaries, not within phases. Each phase declares its mode based on post count and renders consistently from start to end. Texture variation between phases communicates editorial density: a reader can see at a glance which phases were prolific.

"I am here" marker. Coral pulse (14px coral 200 with halo) at the current point in the community custody phase, with italic "[ I am here. ]" label and mono date sublabel. Anchored to real-world time, not content — stays present even when zero posts are written. Animation respects prefers-reduced-motion (falls back to static glow).

Memoir spine empty state. The spine is the empty-state design. With zero posts, the spine still renders fully — phase markers visible, schematic phase block heights intact, "I am here" marker active in community custody.

Each phase shows ONE placeholder card hung off the spine in the same alternating left/right pattern real posts will use. Single placeholder per phase, not multiple, to avoid false specificity. Each placeholder: dashed border (1px in coral-600 stop), reduced background opacity (~0.4), bracketed title describing the editorial scope of that phase (e.g. "[ Posts on intake, processing, and the first weeks of holding ]" for jail), "Forthcoming" status in mono. No date, no eyebrow.

Empty space within phase blocks communicates duration as unwritten time. Coyote Ridge and Monroe (tall blocks) have substantial empty space below their single placeholders. The schematic spacing principle pays off most in the empty state, where it's the only thing communicating proportion.

Column header gets the same expanded-manifesto treatment as base-template empty state. Bottom of page: column-specific subscribe prompt ("Be notified when Memoir begins") with the same anti-marketing copy.

Off the Record variant. Off the Record is poetry and short personal writing, with different content density and editorial logic than the other columns. The mosaic pattern is wrong here — poetry needs air, not card chrome, and a uniform tile grid would flatten the formal variation that is itself the column's content. Replaces zones 03 + 04 with an editorial list pattern that surfaces full poems on the column landing itself, treating the page as a chapbook rather than a navigation index.

Editorial list. Single centered column at ~520px reading measure (slightly wider than post body's 480px to accommodate longer poetic lines without forcing wraps). Most recent piece sits at top. No separate feature treatment — featuring the latest piece differently from the rest would break the chapbook rhythm and recreate the mosaic problem in a smaller form.

Each entry is a single block containing:
- Eyebrow strip. Date in text-eyebrow (12px Plex Sans Medium, sage 200 stop). Tags pill if present, same treatment as the post page byline. Sits flush left of the reading column.
- Title. text-pull (28px Newsreader Medium), repurposed here as the entry-title size. Untitled pieces use the first line of the poem rendered in italic at the same size, with no quote marks — the standard chapbook table-of-contents convention. Solves the "Untitled" problem without weak placeholder text.
- Poem body. text-verse (18px / 1.45 / serif). Tighter leading than text-body's 1.65 because poetry's line breaks already do work that prose leading does in prose; 1.65 over forced line breaks reads as floating, not breathing. text-verse is scoped strictly to verse — prose paragraphs (e.g. dedications, epigraphs, short personal essays in this column) use text-body.
- Affordance row, optional. "Notes →" link in text-meta sage 300, surfaces only when the post page has additional content (longer prose, sidenotes, recordings, draft history, dedications). Pieces that are only the poem don't show this row at all — the date itself is the permalink for citation. The listing tells the reader honestly whether clicking through gets them more, which is editorially correct. On desktop the link is hover-revealed; on mobile it's persistent.

Separator between entries. Asterism (⁂ or three centered dots in sage 400) with ~5rem of vertical breathing room above and below. Rule lines were considered and rejected — too utilitarian for poetry, signals "table row" instead of "next piece." The asterism is the chapbook convention and earns its place here.

Long-piece treatment. Pieces over ~700px rendered height get a soft-fade gradient (transparent to background over the bottom ~120px) with an explicit "Read full piece →" sage button below the fade. Triggered by rendered height, not word or line count, so a sparse 80-line poem with heavy whitespace and a dense 40-line prose poem are both handled correctly. The fade is the affordance — the reader sees there is more, knows where to go for it. This is the only truncation pattern in the column.

Newsletter prompt and footer. Publication-wide newsletter in structural purple (Zone 05), same as base template. Off the Record is part of the publication; column-themed treatments here would over-elevate it. Footer (Zone 06) same as homepage.

Off the Record empty state. Same logic as base-template empty state, adapted to the editorial-list shape.
- Zone 02 expanded — column header gets the longer manifesto paragraph below the deck (17px / 1.60 / regular / serif, muted). 2-3 sentences communicating Off the Record's editorial scope: poetry as coping skill, the dual reading of "off the journalistic record" and "on the personal record."
- Zones 03 + 04 replaced — a SINGLE placeholder piece rendered in the editorial-list format. Sage 600 dashed border, reduced background opacity (~0.4), bracketed title describing what an early piece will likely be, a few bracketed lines of placeholder verse in mono describing the form ("[ ~12 lines / free verse / on the silence after intake ]"), "Forthcoming" in mono at the bottom. Not three placeholder tiles — that's a mosaic pattern, and the whole point of this column is that mosaic is wrong here. One placeholder, full-width in the reading column, surrounded by chapbook spacing. The empty list is the design.
- Zone 05 replaced — column-specific subscribe prompt in sage. Same anti-marketing copy: "A short note when the first piece publishes. No promotion, no list resale, no other publications."

ABOUT PAGE INFORMATION ARCHITECTURE
The about page is a single editorial document — a manifesto-bio fused essay rather than a brochure with sections. The publication's authority comes from lived experience, so the editorial promise and the writer's experience are the same essay. Title: "How I Got Here." Plain, memoir-first, lets the essay underneath be ambitious without the title doing literary lifting. The publication name carries the wordplay; the about page does not need to.

Vertical scroll, body content max width ~480px, same reading measure as post pages.

Zone 00 - Reading progress bar. Same treatment as post page. Accent color is structural purple/indigo (publication-wide page, same logic as the manifesto strip and newsletter prompt — about is not a column-themed page).

Zone 01 - Top nav. Same as post page and column landing pages. No menu wheel.

Zone 02 - Page header. Three sub-zones, parallels post page structure:
02a Eyebrow: "About" (text-eyebrow). Sets the navigation context.
02b Title: "How I Got Here" at text-title (44px Newsreader 600).
02c Deck: optional one-sentence editorial summary in text-deck italic. Use if the title alone doesn't anchor the essay's intent; skip if it does.

Zone 03 - Hero image. Full-bleed, 2:1 aspect, no overlay text (title sits above). Imagery treatment specific to about: source photographs run through generative AI (Nano Banana or similar) to produce creative portraits — a deliberate artistic outlet given the limited supply of personal photographs at time of writing. Not a photographic portrait in the traditional sense; closer to the "AI-generated atmospheric" category from the imagery system, but with the personal-photo source material doing the grounding work. Style consistency across portraits matters more than realism.

Zone 04 - Byline strip, minimal. text-meta. "Last updated [date]" only. No author (the about page IS the byline of the publication), no read time, no share affordance. The currency date matters because the manifesto may be revised after major life events; the date tells readers what version they're reading.

Zone 05 - Body essay. The manifesto-bio fused.
- text-body (Newsreader Regular 18px), ~480px measure.
- No drop cap. Drop cap is Memoir-column-only per TREATMENTS; about is not Memoir.
- No pull quotes. About has no column accent for the pull quote treatment to inherit, and the page should read as prose rather than magazine feature. The voice carries it.
- text-h2 subheadings available for sectional structure if the essay calls for it; structure to be determined at writing time.
- Inline images (text-caption captions) optional, narrower than hero, same generative-portrait treatment if used.
- Block quote treatment available if external sources are cited (court documents, regulations, statistics that contextualize the publication's existence).

Zone 06 - Where to start. Quiet typographic callout near the end of the essay. Five column names listed with one-sentence editorial descriptions, inline links to each column landing page. Not tiles — text. Tiles would compete with the homepage's column showcase and feel brochure-like; a typographic list keeps the page editorial.

Zone 07 - Contact. text-meta. Single email address (placeholder until a publication-specific email is created closer to launch). No PO box, no Signal, no other paths at this time. If reachability needs expand later, this zone accommodates additional lines without restructuring.

Zone 08 - Newsletter prompt. Same as post page. Structural purple, single field, anti-marketing copy. Highest-conversion moment for a reader who has just finished the manifesto.

Zone 09 - Footer. Same as homepage and other pages.

What the about page deliberately excludes:
- No "Coming soon" empty state. The about page is a single editorial document, not a content surface that fills up over time. The page either has a manifesto or it does not ship.
- No social proof, press logos, or testimonials. Standard about-page furniture that works against the publication's voice.
- No CTA stack. One subscribe affordance, one contact line.

ARCHIVE PAGE INFORMATION ARCHITECTURE
The archive is a find-by-criteria surface, with recency as the default sort. Default state (no filters applied) shows all posts by publishedDate descending — functionally a recency view. The page's actual job is filtered exploration: tag-based and cross-column discovery that isn't surfaced anywhere else in the publication. Archive earns its existence at any post count above the rendering threshold; below that threshold it would duplicate the homepage and render fake interactivity over content that doesn't exist.

Tag system: publication-wide. Tags cross columns. A tag like "phone calls" applies to a Memoir post about a specific call, an Economics of post about cost analysis, and a Concrete Truths post about access rates. The cross-column resonance is exactly what the publication's column structure is designed to enable, and column-specific tag namespaces would silo it. The column itself is already a filter dimension, so tags don't redundantly encode column membership. Tradeoff: tag maintenance becomes deliberate editorial work. Adding tags requires consistency across columns, or the taxonomy fragments. The maintenance cost is worth paying for the cross-column discovery that's the whole point of archive being more than a longer homepage.

Memoir in archive: flat list, with sort toggle exposing experienceDate. The spine is the column landing's metaphor; archive is a different lens. When the column filter is set to Memoir, the sort dropdown gains a "By experience date" option, exposing the dual-date model when it has real interpretive meaning. For other columns, sort is just publishedDate ascending or descending. Phase becomes a conditional sub-filter when Memoir is selected: "Memoir + Coyote Ridge phase + tag:contraband" is a useful query and the schema already carries phase metadata.

Vertical scroll, full-width content. Archive is a navigation surface, not a reading surface, so the ~480px reading measure used elsewhere does not apply.

Zone 00 - No reading progress bar. Archive is navigation, not reading.

Zone 01 - Top nav. Same as post page, column landing, and about. No menu wheel.

Zone 02 - Page header. Eyebrow: "Archive" (text-eyebrow). Title: "Archive" at text-title (44px Newsreader 600). No deck — the page's purpose is self-evident from the filters below.

Zone 03 - Filter chrome. Top of page, scrolls away with content. Not sticky — sticky filter UI feels SaaS-like and fights the editorial tone; if the reader needs to re-filter, scrolling back up is fine.

Dimensions in order of editorial weight:
- Column. Pill-style toggle: all five columns plus "All." Active state in column accent color. Single-select.
- Tag. Inline pill list of most-used publication-wide tags, with "more" affordance to expand the full list. Sage-neutral background — tags cross columns, so column-coloring would mislead. Multi-select.
- Year. Dropdown by publishedDate year. Single-select. Defaults to "All years."
- Sort. Dropdown: "Newest first" (default), "Oldest first." When column = Memoir, adds "By experience date."
- Phase. Conditional pill toggle for the five Memoir phases. Renders only when column = Memoir. Single-select.

Filter state lives in URL params so views are shareable and browser-back behaves correctly.

Zone 04 - Results region. Uniform 3:4 vertical tiles in an asymmetric mosaic — similar to homepage Row 1 in feel, but uniform sizing for consistency at scale. Each tile: column tag pill, title, date, brief excerpt. Column-themed background at low saturation, hover state brightens. Layout adapts to result count: under 6 results renders in row-1 breathing-room layout; higher counts fill into a 3-column desktop grid, 2-column tablet, 1-column mobile.

Zone 05 - Pagination. 24 results per page. "Load more" button rather than infinite scroll — gives the reader a stopping point, respects mobile bandwidth, doesn't trigger doomscroll patterns the publication is otherwise designed against. Counter in text-meta sage-neutral: "[1–24] of [total]."

Zone 06 - Empty state for no-match filters. When filters return zero results, results region replaced by quiet message: "No posts match these filters." Plus a "clear filters" affordance. text-body, no illustration, no flourish. Failures stay quiet.

Zone 07 - Newsletter prompt. Same as post page. Structural purple, single field, anti-marketing copy.

Zone 08 - Footer. Same as homepage and other pages.

Archive rendering threshold. Below 6 total posts across all columns, the page renders the header but replaces zones 03, 04, 05 with a quiet empty-state message: "The archive activates once a few posts have been published. In the meantime, browse by column from the navigation." Filter chrome is hidden, not disabled — disabled chrome reads as broken UI. The threshold of 6 is a starting estimate, to be tuned in production based on how the homepage and column landings actually feel at low post counts. Above the threshold, archive renders normally.

What the archive page deliberately excludes:
- No search box. Full-text search is a different surface with different infrastructure requirements (likely a third-party service like Algolia or Pagefind), and is not part of archive's job. Defer until the publication has enough volume to justify it.
- No related-posts logic. That's a post-page concern; archive shows what matches the filters, full stop.
- No featured-post slot. Archive is a navigation surface, not an editorial one.

WHAT IS NOT INCLUDED
No sidebar widgets, recent posts lists, or ambient blog clutter.
No comments. Email replies via newsletter as the controllable alternative. May reconsider once audience exists.
No popup CTAs, exit-intent modals, or interruption patterns.
No advertising. Reader support model only if monetization becomes a question.
No social media follower counts or engagement metrics surfaced on the page.

PLACEHOLDER CONVENTION
Image placeholders: solid color blocks, one color per column from the column's palette.
Title placeholders: "[ This is a title ]" set in Plex Mono.
Body placeholders: "[ Body text. ~800 words. Memoir piece about the first week of intake. ]" set in Plex Mono.
Metadata: real where possible (name, estimated read times), placeholder dates.
Empty states for zones that lack content render as designed "Coming soon" treatments, not broken or hidden zones.

WHAT IS STILL TO DO
All page IA and design system decisions are closed. Remaining items are operational and deferred to launch readiness:

1. Domain registration and social handle claims. Availability confirmed (see TECH STACK). Social handles specifically deferred until community custody completes.

Future enhancements (deferred to post-population or post-launch):
- Spine standard mode (6-15 posts per phase): visual treatment to be designed when this density appears in real content.
- Spine dense-row inline expansion on hover/focus: optional enhancement to reveal deck and "read →" affordance from a single dense row. Held for future.
- Mobile rendering of the Memoir spine: alternating left/right post cards collapse to single side on narrow viewports. To be designed when the spine is wired into the actual build.
- Off the Record post page variant: refinement of the column-agnostic post template for poetry-specific posts. Already noted in POST PAGE IA that "Off the Record poetry collapses certain elements (no hero, shorter body, possibly no pull quotes)." Specifically needs: integration with the "Notes →" affordance from the column landing (the post page is where notes live), default no-hero treatment, decision on whether dedications/epigraphs render with text-body or a dedicated treatment. To be designed when the column populates or when working on the post page Off the Record-specific pass.
- Protective Factors listing pattern: mosaic may not fit CBT/DBT content's uniform editorial weight; to be reconsidered when that column populates.

Build order recommendation: post template first (forces real writing, complete reader experience for any single post), homepage with conditional rendering second, column landing pages third, about page fourth, archive last.

NOTES ON COLLABORATION
This project benefits from comprehensive specification documents created before implementation begins. Specs preserve decisions and enable fresh-context handoffs to Claude Code or to new Claude conversations. When ready to build, generate a Claude Code handoff document with full project context.
Claude chat is for spec, strategy, and brainstorming. Claude Code is for implementation and file generation.

Documentation ownership: Claude maintains the canonical version of this document in conversation, producing updated paste-ready versions at decision milestones. Alex pastes updates back into the project file as the system requires the human-in-the-loop step. Memory carries the high-level decisions across conversations even when this document is between updates.
