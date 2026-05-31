export type ColumnSlug =
  | 'memoir'
  | 'concrete-truths'
  | 'economics-of'
  | 'off-the-record'
  | 'protective-factors'
  | 'hearsay';

export type ColumnGrouping = 'prison-experience' | 'adjacent';

export interface ColumnMeta {
  slug: ColumnSlug;
  name: string;
  deck: string;
  hue: number;
  grouping: ColumnGrouping;
  // Optional standing epigraph, rendered in the column header's deck slot
  // (replaces the plain deck for that column). Only Hearsay uses this.
  epigraph?: { quote: string; attribution: string };
}

export const COLUMN_ORDER: readonly ColumnSlug[] = [
  'memoir',
  'concrete-truths',
  'economics-of',
  'hearsay',
  'off-the-record',
  'protective-factors',
] as const;

export const COLUMNS: Record<ColumnSlug, ColumnMeta> = {
  memoir: {
    slug: 'memoir',
    name: 'Memoir',
    deck: 'Personal narrative writing about the prison experience.',
    hue: 25,
    grouping: 'prison-experience',
  },
  'concrete-truths': {
    slug: 'concrete-truths',
    name: 'Concrete Truths',
    deck: 'Journalistic criticism with statistics, data, and citations.',
    hue: 245,
    grouping: 'prison-experience',
  },
  'economics-of': {
    slug: 'economics-of',
    name: 'Economics of',
    deck: 'Satirical economic analysis of routine carceral phenomena.',
    hue: 75,
    grouping: 'prison-experience',
  },
  hearsay: {
    slug: 'hearsay',
    name: 'Hearsay',
    deck: 'Firsthand short-form vignettes — yes, this really happened.',
    hue: 340,
    grouping: 'prison-experience',
    // Persistent epigraph — the ironic thesis of the column. Renders in the
    // header deck slot at every post count; replaces the plain deck above.
    epigraph: {
      quote: "Prison is an experience you can't get anywhere else.",
      attribution: 'a cellmate, quoting his father',
    },
  },
  'off-the-record': {
    slug: 'off-the-record',
    name: 'Off the Record',
    deck: 'Poetry and personal writing developed as a coping skill.',
    hue: 150,
    grouping: 'adjacent',
  },
  'protective-factors': {
    slug: 'protective-factors',
    name: 'Protective Factors',
    deck: 'CBT/DBT content learned in rehabilitative programming.',
    hue: 195,
    grouping: 'adjacent',
  },
};

export const COLUMNS_LIST: ColumnMeta[] = COLUMN_ORDER.map((slug) => COLUMNS[slug]);

// Nav and footer surfaces list the columns alphabetically by name. Memoir's
// prominence is carried by the homepage hero card, not by list order, so they
// don't need to lead with it. COLUMN_ORDER stays canonical for content surfaces
// (homepage column showcase, Memoir spine, archive default sort).
export const COLUMNS_ALPHABETICAL: ColumnMeta[] = [...COLUMNS_LIST].sort((a, b) =>
  a.name.localeCompare(b.name),
);
