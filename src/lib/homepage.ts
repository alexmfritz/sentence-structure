import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { ColumnSlug } from './columns';

export type HomepagePost =
  | CollectionEntry<'memoir'>
  | CollectionEntry<'concrete-truths'>
  | CollectionEntry<'economics-of'>
  | CollectionEntry<'off-the-record'>
  | CollectionEntry<'protective-factors'>;

export interface HomepageContent {
  hero: CollectionEntry<'memoir'> | undefined;
  anchorRow: HomepagePost[];
  showcase: Array<{ column: ColumnSlug; post: HomepagePost | undefined }>;
  archiveSampler: HomepagePost[];
  totalCount: number;
  isSparse: boolean;
}

const SHOWCASE_COLUMNS: ColumnSlug[] = ['memoir', 'concrete-truths', 'economics-of'];
const SPARSE_THRESHOLD = 12;

function entryKey(entry: HomepagePost): string {
  return `${entry.collection}/${entry.id}`;
}

function sortRecent<T extends HomepagePost>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
  );
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const [memoir, concreteTruths, economicsOf, offTheRecord, protectiveFactors] =
    await Promise.all([
      getCollection('memoir'),
      getCollection('concrete-truths'),
      getCollection('economics-of'),
      getCollection('off-the-record'),
      getCollection('protective-factors'),
    ]);

  const all = sortRecent([
    ...memoir,
    ...concreteTruths,
    ...economicsOf,
    ...offTheRecord,
    ...protectiveFactors,
  ] as HomepagePost[]);

  const used = new Set<string>();

  const hero = sortRecent(memoir)[0];
  if (hero) used.add(entryKey(hero));

  const anchorRow = all.filter((p) => !used.has(entryKey(p))).slice(0, 3);
  anchorRow.forEach((p) => used.add(entryKey(p)));

  const showcase = SHOWCASE_COLUMNS.map((column) => {
    const pool: HomepagePost[] =
      column === 'memoir'
        ? memoir
        : column === 'concrete-truths'
          ? concreteTruths
          : economicsOf;
    const post = sortRecent(pool).find((p) => !used.has(entryKey(p)));
    if (post) used.add(entryKey(post));
    return { column, post };
  });

  const archiveSampler = all
    .filter((p) => !used.has(entryKey(p)))
    .slice(0, 3);

  return {
    hero,
    anchorRow,
    showcase,
    archiveSampler,
    totalCount: all.length,
    isSparse: all.length < SPARSE_THRESHOLD,
  };
}
