// Single source for the MDX `components` prop passed to <Content />.
// Centralized because there are now eight render sites (five column post
// pages + hearsay post pages + OffTheRecordList + HearsayFeed); inline
// maps at each site silently drift when a component is added or renamed.
//
// To add a new MDX-callable component: import it here, add to the export.
// Every render site picks it up automatically.

import PullQuote from '../components/post/PullQuote.astro';
import Sidenote from '../components/post/Sidenote.astro';
import Stat from '../components/post/Stat.astro';
import BlockQuote from '../components/post/BlockQuote.astro';
import Figure from '../components/post/Figure.astro';
import ContentNote from '../components/post/ContentNote.astro';
import LetterCallout from '../components/post/LetterCallout.astro';
import Verse from '../components/post/Verse.astro';

export const mdxComponents = {
  PullQuote,
  Sidenote,
  Stat,
  BlockQuote,
  Figure,
  ContentNote,
  LetterCallout,
  Verse,
};
