const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(source: string): number {
  const text = source
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
