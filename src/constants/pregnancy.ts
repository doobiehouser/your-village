export type WeekSizeReference = {
  week: number;
  name: string;
  glyph: string;
};

/** Approximate baby-size-by-week comparisons used on the home screen tracker card. */
export const WEEK_SIZE_REFERENCES: WeekSizeReference[] = [
  { week: 8, name: 'raspberry', glyph: '🍇' },
  { week: 12, name: 'lime', glyph: '🍋' },
  { week: 16, name: 'avocado', glyph: '🥑' },
  { week: 20, name: 'banana', glyph: '🍌' },
  { week: 24, name: 'cantaloupe', glyph: '🍈' },
  { week: 28, name: 'eggplant', glyph: '🍆' },
  { week: 32, name: 'pineapple', glyph: '🍍' },
  { week: 36, name: 'honeydew melon', glyph: '🍈' },
  { week: 40, name: 'small pumpkin', glyph: '🎃' },
];

export function sizeReferenceForWeek(week: number): WeekSizeReference {
  let closest = WEEK_SIZE_REFERENCES[0];
  for (const reference of WEEK_SIZE_REFERENCES) {
    if (reference.week <= week) {
      closest = reference;
    }
  }
  return closest;
}
