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

const basePostSchema = z.object({
  title: z.string(),
  deck: z.string().optional(),
  publishedDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
});

const memoirSchema = basePostSchema.extend({
  phase: phaseEnum,
  experienceDate: z.coerce.date(),
});

const memoir = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/memoir' }),
  schema: memoirSchema,
});

const concreteTruths = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/concrete-truths' }),
  schema: basePostSchema,
});

const economicsOf = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/economics-of' }),
  schema: basePostSchema,
});

const offTheRecord = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/off-the-record' }),
  schema: basePostSchema,
});

const protectiveFactors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/protective-factors' }),
  schema: basePostSchema,
});

export const collections = {
  memoir,
  'concrete-truths': concreteTruths,
  'economics-of': economicsOf,
  'off-the-record': offTheRecord,
  'protective-factors': protectiveFactors,
};

export type Phase = z.infer<typeof phaseEnum>;
export type MemoirPostData = z.infer<typeof memoirSchema>;
export type BasePostData = z.infer<typeof basePostSchema>;
