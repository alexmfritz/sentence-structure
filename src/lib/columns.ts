export type ColumnSlug =
  | 'memoir'
  | 'concrete-truths'
  | 'economics-of'
  | 'off-the-record'
  | 'protective-factors';

export type ColumnGrouping = 'prison-experience' | 'adjacent';

export interface ColumnMeta {
  slug: ColumnSlug;
  name: string;
  deck: string;
  hue: number;
  grouping: ColumnGrouping;
}

export const COLUMN_ORDER: readonly ColumnSlug[] = [
  'memoir',
  'concrete-truths',
  'economics-of',
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
