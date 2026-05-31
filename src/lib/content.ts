export function extractFirstLine(body: string): string {
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('---')) continue;
    if (line.startsWith('#')) continue;
    if (line.startsWith('<')) continue;
    if (/^(?:import|export)\b/.test(line)) continue; // MDX import/export lines
    return line;
  }
  return '';
}

// Strips markdown/MDX markers and produces a short plain-text excerpt
// for places that need a description (meta tags, archive tiles).
// Used by PostLayout for fallback meta description when the post
// has no deck, and by lib/archive.ts for tile excerpts.
const EXCERPT_LENGTH = 140;

export function makeExcerpt(source: string | undefined): string {
  if (!source) return '';
  const cleaned = source
    // Drop MDX import/export statements — otherwise a deckless .mdx post
    // (e.g. the Off the Record poems) leaks its `import { Image } …` lines
    // into the archive tile excerpt.
    .replace(/^[ \t]*(?:import|export)\b.*$/gm, ' ')
    // Drop JSX/HTML tags, including multi-line component tags like <Image … />.
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= EXCERPT_LENGTH) return cleaned;
  return cleaned.slice(0, EXCERPT_LENGTH).trimEnd() + '…';
}
