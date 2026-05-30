import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const phaseEnum = z.enum([
  'jail',
  'shelton',
  'coyote-ridge',
  'monroe',
  'community-custody',
]);

// Shared post fields. Plain object so it can be spread into each
// collection's schema function, where the image() helper is in scope
// for the optional heroImage.
const basePostFields = {
  title: z.string(),
  deck: z.string().optional(),
  publishedDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  // Opt-in standing crisis-support block at the foot of the article.
  // Default false; only pieces that touch suicidality / self-harm material
  // set true. Rendered by PostLayout + HearsayLayout (single source —
  // copy lives in CrisisResources.astro, never per-file).
  crisisResources: z.boolean().default(false),
};

const memoir = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/memoir' }),
  schema: ({ image }) =>
    z.object({
      ...basePostFields,
      heroImage: image().optional(),
      phase: phaseEnum,
      experienceDate: z.coerce.date(),
      // Vignettes this story expands. Single source of the cross-link;
      // the vignette-side "Full story →" is derived from this (lib/hearsay.ts).
      hearsay: z.array(reference('hearsay')).optional(),
    }),
});

const concreteTruths = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/concrete-truths' }),
  schema: ({ image }) =>
    z.object({ ...basePostFields, heroImage: image().optional() }),
});

const economicsOf = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/economics-of' }),
  schema: ({ image }) =>
    z.object({ ...basePostFields, heroImage: image().optional() }),
});

const offTheRecord = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/off-the-record' }),
  schema: ({ image }) =>
    z.object({ ...basePostFields, heroImage: image().optional() }),
});

const protectiveFactors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/protective-factors' }),
  schema: ({ image }) =>
    z.object({ ...basePostFields, heroImage: image().optional() }),
});

// Hearsay — firsthand short-form vignettes. Base schema only (no phase /
// experienceDate). The 250-word cap is enforced at render in
// plugins/remark-hearsay-wordcount.mjs, not here — Zod can't see the body.
const hearsay = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/hearsay' }),
  schema: ({ image }) =>
    z.object({ ...basePostFields, heroImage: image().optional() }),
});

export const collections = {
  memoir,
  'concrete-truths': concreteTruths,
  'economics-of': economicsOf,
  'off-the-record': offTheRecord,
  'protective-factors': protectiveFactors,
  hearsay,
};

export type Phase = z.infer<typeof phaseEnum>;
