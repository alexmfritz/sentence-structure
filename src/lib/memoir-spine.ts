import type { CollectionEntry } from 'astro:content';
import type { Phase } from '../content.config';

export type MemoirEntry = CollectionEntry<'memoir'>;

export const PHASE_ORDER: readonly Phase[] = [
  'jail',
  'shelton',
  'coyote-ridge',
  'monroe',
  'community-custody',
] as const;

export const PHASE_LABELS: Record<Phase, string> = {
  jail: 'Jail',
  shelton: 'Shelton',
  'coyote-ridge': 'Coyote Ridge',
  monroe: 'Monroe',
  'community-custody': 'Community Custody',
};

// Schematic phase weights — proportional to phase DURATION, not post count.
// Drives phase block heights so empty space communicates unwritten time.
// Tune in production based on Alex's actual timeline.
export const PHASE_WEIGHTS: Record<Phase, number> = {
  jail: 1,
  shelton: 1,
  'coyote-ridge': 4,
  monroe: 4,
  'community-custody': 2,
};

export type DensityMode = 'sparse' | 'standard' | 'dense';

export function getDensityMode(postCount: number): DensityMode {
  if (postCount <= 5) return 'sparse';
  if (postCount <= 15) return 'standard';
  return 'dense';
}

export function groupByPhase(posts: MemoirEntry[]): Record<Phase, MemoirEntry[]> {
  const grouped = Object.fromEntries(
    PHASE_ORDER.map((p) => [p, [] as MemoirEntry[]]),
  ) as Record<Phase, MemoirEntry[]>;

  for (const post of posts) {
    grouped[post.data.phase].push(post);
  }

  for (const phase of PHASE_ORDER) {
    grouped[phase].sort(
      (a, b) =>
        a.data.experienceDate.getTime() - b.data.experienceDate.getTime(),
    );
  }

  return grouped;
}

export const COMMUNITY_CUSTODY_START = new Date('2025-05-23'); // real (per Alex)

// FIXME(alex): exact community-custody END still TBD. Alex estimates spring
// 2027; this is a refined placeholder, not the real date. The "I am here"
// marker position stays an estimate until the precise date lands.
export const COMMUNITY_CUSTODY_END = new Date('2027-04-01'); // estimate (~spring 2027)
