import { defineCollection } from 'astro:content';
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
};

const memoir = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/memoir' }),
  schema: ({ image }) =>
    z.object({
      ...basePostFields,
      heroImage: image().optional(),
      phase: phaseEnum,
      experienceDate: z.coerce.date(),
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

export const collections = {
  memoir,
  'concrete-truths': concreteTruths,
  'economics-of': economicsOf,
  'off-the-record': offTheRecord,
  'protective-factors': protectiveFactors,
};

export type Phase = z.infer<typeof phaseEnum>;
