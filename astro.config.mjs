// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkBreaks from 'remark-breaks';

// https://astro.build/config
export default defineConfig({
  site: 'https://sentencestructure.blog',
  output: 'static',
  markdown: {
    // Single newlines render as <br>. Required for poetry line breaks
    // (Off the Record) and visually-stacked lines (Protective Factors lists).
    // MDX inherits this via extendMarkdownConfig (default).
    remarkPlugins: [remarkBreaks],
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
