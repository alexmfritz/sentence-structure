import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// The 250-word law — Hearsay's editorial identity. Enforced at build in
// hearsay/[slug].astro getStaticPaths (see remark-hearsay-wordcount.mjs for
// why enforcement can't live in the remark plugin).
export const HEARSAY_WORD_LIMIT = 250;

// Cross-link is stored once, on the Memoir post's `hearsay` array. The
// vignette-side "Full story →" is derived: find the Memoir post that
// references this vignette. No vignette ever gets reopened to add a link.
export async function getFullStoryFor(
  hearsayId: string,
): Promise<CollectionEntry<'memoir'> | undefined> {
  const memoir = await getCollection('memoir');
  return memoir.find((post) =>
    post.data.hearsay?.some((ref) => ref.id === hearsayId),
  );
}

// Homepage strip + landing feed both want vignettes newest-first.
export async function getHearsayPosts(): Promise<CollectionEntry<'hearsay'>[]> {
  const posts = await getCollection('hearsay');
  return posts.sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
  );
}
