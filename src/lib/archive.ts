import { getCollection } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { ColumnSlug } from './columns';
import type { Phase } from '../content.config';
import { makeExcerpt } from './content';

export interface ArchiveEntry {
  collection: ColumnSlug;
  id: string;
  title: string;
  deck?: string;
  publishedDate: Date;
  experienceDate?: Date;
  phase?: Phase;
  tags: string[];
  excerpt: string;
  heroImage?: ImageMetadata;
  year: number;
  url: string;
}

export interface ArchiveData {
  entries: ArchiveEntry[];
  tags: Array<{ tag: string; count: number }>;
  years: number[];
  totalCount: number;
  belowThreshold: boolean;
}

const THRESHOLD = 6;
export const PAGE_SIZE = 24;

function deckOrExcerpt(deck: string | undefined, body: string | undefined): string {
  return deck ?? makeExcerpt(body);
}

export async function getArchiveData(): Promise<ArchiveData> {
  const [memoir, ct, eo, otr, pf, hearsay] = await Promise.all([
    getCollection('memoir'),
    getCollection('concrete-truths'),
    getCollection('economics-of'),
    getCollection('off-the-record'),
    getCollection('protective-factors'),
    getCollection('hearsay'),
  ]);

  const entries: ArchiveEntry[] = [];

  for (const post of memoir) {
    entries.push({
      collection: 'memoir',
      id: post.id,
      title: post.data.title,
      deck: post.data.deck,
      publishedDate: post.data.publishedDate,
      experienceDate: post.data.experienceDate,
      phase: post.data.phase,
      tags: post.data.tags,
      excerpt: deckOrExcerpt(post.data.deck, post.body),
      heroImage: post.data.heroImage,
      year: post.data.publishedDate.getFullYear(),
      url: `/memoir/${post.id}`,
    });
  }

  for (const post of ct) {
    entries.push({
      collection: 'concrete-truths',
      id: post.id,
      title: post.data.title,
      deck: post.data.deck,
      publishedDate: post.data.publishedDate,
      tags: post.data.tags,
      excerpt: deckOrExcerpt(post.data.deck, post.body),
      heroImage: post.data.heroImage,
      year: post.data.publishedDate.getFullYear(),
      url: `/concrete-truths/${post.id}`,
    });
  }

  for (const post of eo) {
    entries.push({
      collection: 'economics-of',
      id: post.id,
      title: post.data.title,
      deck: post.data.deck,
      publishedDate: post.data.publishedDate,
      tags: post.data.tags,
      excerpt: deckOrExcerpt(post.data.deck, post.body),
      heroImage: post.data.heroImage,
      year: post.data.publishedDate.getFullYear(),
      url: `/economics-of/${post.id}`,
    });
  }

  for (const post of otr) {
    entries.push({
      collection: 'off-the-record',
      id: post.id,
      title: post.data.title,
      deck: post.data.deck,
      publishedDate: post.data.publishedDate,
      tags: post.data.tags,
      excerpt: deckOrExcerpt(post.data.deck, post.body),
      heroImage: post.data.heroImage,
      year: post.data.publishedDate.getFullYear(),
      url: `/off-the-record/${post.id}`,
    });
  }

  for (const post of pf) {
    entries.push({
      collection: 'protective-factors',
      id: post.id,
      title: post.data.title,
      deck: post.data.deck,
      publishedDate: post.data.publishedDate,
      tags: post.data.tags,
      excerpt: deckOrExcerpt(post.data.deck, post.body),
      heroImage: post.data.heroImage,
      year: post.data.publishedDate.getFullYear(),
      url: `/protective-factors/${post.id}`,
    });
  }

  for (const post of hearsay) {
    entries.push({
      collection: 'hearsay',
      id: post.id,
      title: post.data.title,
      deck: post.data.deck,
      publishedDate: post.data.publishedDate,
      tags: post.data.tags,
      excerpt: deckOrExcerpt(post.data.deck, post.body),
      heroImage: post.data.heroImage,
      year: post.data.publishedDate.getFullYear(),
      url: `/hearsay/${post.id}`,
    });
  }

  // Default sort: most recent publishedDate first.
  entries.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  // Tag frequency (descending count, then alphabetical).
  const tagCounts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const tags = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  // Years (descending).
  const years = Array.from(new Set(entries.map((e) => e.year))).sort(
    (a, b) => b - a,
  );

  return {
    entries,
    tags,
    years,
    totalCount: entries.length,
    belowThreshold: entries.length < THRESHOLD,
  };
}
