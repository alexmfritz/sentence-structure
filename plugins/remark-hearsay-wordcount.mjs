import { visit } from 'unist-util-visit';

// Counts prose words in Hearsay vignettes and injects the total into
// frontmatter as `wordCount` (surfaced via render()'s remarkPluginFrontmatter).
// Counting text nodes means prose counts and MDX component markup / imports
// don't — the correct granularity.
//
// Enforcement of the 250-word law lives in src/pages/hearsay/[slug].astro
// getStaticPaths, NOT here: a throw inside a remark plugin is swallowed and
// logged by Astro's glob content loader (build still exits 0), so it can't
// gate CI. The getStaticPaths guard reads this count and hard-fails the build.
export function remarkHearsayWordCount() {
  return (tree, file) => {
    if (!file.path?.includes('/hearsay/')) return;

    let count = 0;
    visit(tree, 'text', (node) => {
      count += node.value.trim().split(/\s+/).filter(Boolean).length;
    });

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.wordCount = count;
  };
}
