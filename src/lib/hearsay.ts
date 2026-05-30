import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// The 250-word law — Hearsay's editorial identity. Enforced at build in
// hearsay/[slug].astro getStaticPaths (see remark-hearsay-wordcount.mjs for
// why enforcement can't live in the remark plugin).
export const HEARSAY_WORD_LIMIT = 250;

// Below this post count the column counts as "sparse" and the header still
// carries the origin-story manifesto (it recedes once real vignettes
// accumulate — same intent as the homepage manifesto strip). The column
// launches at 1 post, so the manifesto must persist past empty, not only at
// zero. Threshold value is a judgment call — tune with Alex.
export const HEARSAY_SPARSE_THRESHOLD = 4;

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
