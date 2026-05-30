import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { ColumnSlug } from './columns';

export interface PlaceholderTile {
  eyebrow: string;
  title: string;
}

export type ColumnEntry =
  | CollectionEntry<'memoir'>
  | CollectionEntry<'concrete-truths'>
  | CollectionEntry<'economics-of'>
  | CollectionEntry<'off-the-record'>
  | CollectionEntry<'protective-factors'>
  | CollectionEntry<'hearsay'>;

export interface BaseTemplateContent {
  isEmpty: boolean;
  feature: ColumnEntry | undefined;
  row1Large: ColumnEntry | undefined;
  row1Small: ColumnEntry[];
  row2: ColumnEntry[];
  row3: ColumnEntry[];
  showViewAllTile: boolean;
}

export interface EmptyStateCopy {
  manifesto: string;
  placeholders: PlaceholderTile[];
}

async function getColumnEntries(column: ColumnSlug): Promise<ColumnEntry[]> {
  switch (column) {
    case 'memoir':
      return getCollection('memoir');
    case 'concrete-truths':
      return getCollection('concrete-truths');
    case 'economics-of':
      return getCollection('economics-of');
    case 'off-the-record':
      return getCollection('off-the-record');
    case 'protective-factors':
      return getCollection('protective-factors');
    case 'hearsay':
      return getCollection('hearsay');
  }
}

function sortRecent<T extends ColumnEntry>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
  );
}

export async function getBaseTemplateContent(
  column: ColumnSlug,
): Promise<BaseTemplateContent> {
  const all = sortRecent(await getColumnEntries(column));

  const result: BaseTemplateContent = {
    isEmpty: all.length === 0,
    feature: undefined,
    row1Large: undefined,
    row1Small: [],
    row2: [],
    row3: [],
    showViewAllTile: false,
  };

  if (all.length === 0) return result;

  // Sparse threshold (option A from Phase 4 plan): be honest about
  // post count, don't pad rows with placeholder tiles.
  const queue = [...all];
  result.feature = queue.shift();
  result.row1Large = queue.shift();
  while (result.row1Small.length < 2 && queue.length > 0) {
    result.row1Small.push(queue.shift()!);
  }
  while (result.row2.length < 3 && queue.length > 0) {
    result.row2.push(queue.shift()!);
  }
  while (result.row3.length < 3 && queue.length > 0) {
    result.row3.push(queue.shift()!);
  }

  // View-all tile in Row 3 only when Row 3 has at least one tile;
  // it's a fourth slot meant to complete the row, not a standalone CTA.
  result.showViewAllTile = result.row3.length > 0;

  return result;
}

export async function getOffTheRecordContent() {
  const all = sortRecent(
    await getCollection('off-the-record'),
  );
  return { posts: all, isEmpty: all.length === 0 };
}

// Empty-state copy per column. Placeholder tile titles use the
// bracketed mono convention. REPLACE with real planned-piece
// descriptions before the column actually launches empty.
export const COLUMN_EMPTY_STATES: Record<ColumnSlug, EmptyStateCopy> = {
  memoir: {
    manifesto:
      'Personal narrative writing about the prison experience. The story across the chronological spine — intake through community custody — written in pieces as the pieces find their shape.',
    placeholders: [
      { eyebrow: 'Jail', title: '[ Posts on intake, processing, and the first weeks of holding ]' },
      { eyebrow: 'Coyote Ridge', title: '[ Posts on programming, mail, and the long middle ]' },
      { eyebrow: 'Community Custody', title: '[ Posts on release, transition, and re-entry ]' },
    ],
  },
  'concrete-truths': {
    manifesto:
      'Statistics and citations behind the lived experience. The numbers people inside know in their bones, set against the public record. Sources verified, methodology in the sidenotes.',
    placeholders: [
      { eyebrow: 'Visitation', title: '[ Visitation rates and family contact, by facility ]' },
      { eyebrow: 'Education', title: '[ Educational programming outcomes and access ]' },
      { eyebrow: 'Recidivism', title: '[ Parole, return rates, and the cost of return ]' },
    ],
  },
  'economics-of': {
    manifesto:
      'Satirical economic analysis of the carceral commerce. The market for ramen, phone calls, magazines, and time. Unwritten currencies and visible bills, treated with the seriousness their absurdity deserves.',
    placeholders: [
      { eyebrow: 'The Economics of', title: '[ The Economics of the Visit ]' },
      { eyebrow: 'The Economics of', title: '[ The Economics of Good Time ]' },
      { eyebrow: 'The Economics of', title: '[ The Economics of the Commissary List ]' },
    ],
  },
  'off-the-record': {
    manifesto:
      'Poetry and personal writing developed as a coping skill, not necessarily about prison. The dual reading: off the journalistic record, and on the personal record.',
    placeholders: [
      { eyebrow: 'Forthcoming', title: '[ ~12 lines / free verse / on the silence after intake ]' },
    ],
  },
  'protective-factors': {
    manifesto:
      'CBT and DBT skills learned in rehabilitative programming, presented as practice rather than prescription. Cognitive tools that worked, with the clinical context behind them.',
    placeholders: [
      { eyebrow: 'CBT', title: '[ Radical acceptance, in practice ]' },
      { eyebrow: 'CBT', title: '[ Cognitive distortions and how to catch them ]' },
      { eyebrow: 'DBT', title: '[ Distress tolerance for life on the outside ]' },
    ],
  },
  hearsay: {
    // Alex's voice copy. Tells the spawn-story behind the epigraph (the
    // "Dravis" origin) and the column's premise; the heavier Memoir material
    // is intentionally left for a future Memoir piece.
    manifesto:
      "A man I'll call Dravis passed along his father's advice, as if it had prepared him for this. This is the column for the moments that prove those words right. The things you'd swear were made up if you hadn't been standing there.",
    placeholders: [
      { eyebrow: 'Forthcoming', title: '[ ~200 words / a thing that happened on the unit / no footnotes ]' },
    ],
  },
};
