export type HelpCategory = {
  id: string;
  group: 'practical' | 'emotional';
  label: string;
  sublabel: string;
  glyph: string;
};

export const PRACTICAL_HELP: HelpCategory[] = [
  { id: 'meal-help', group: 'practical', label: 'Meal help', sublabel: 'Meals, groceries, delivery', glyph: '✦' },
  { id: 'household-help', group: 'practical', label: 'Household help', sublabel: 'Cleaning, laundry, errands', glyph: '✧' },
  { id: 'baby-help', group: 'practical', label: 'Baby help', sublabel: 'Someone to hold baby, so you can rest', glyph: '✩' },
  { id: 'transportation', group: 'practical', label: 'Transportation', sublabel: 'Rides to appointments or errands', glyph: '✪' },
  { id: 'grocery-errand', group: 'practical', label: 'Grocery / Errand help', sublabel: '', glyph: '✫' },
  { id: 'pet-help', group: 'practical', label: 'Pet help', sublabel: '', glyph: '✬' },
  { id: 'hospital-stay', group: 'practical', label: 'Help after a hospital stay', sublabel: '', glyph: '✭' },
  { id: 'sibling-childcare', group: 'practical', label: 'Sibling / Childcare support', sublabel: '', glyph: '✮' },
  { id: 'baby-items', group: 'practical', label: 'Baby items', sublabel: 'Diapers, formula, clothing, equipment', glyph: '✯' },
  { id: 'practical-other', group: 'practical', label: 'Something else', sublabel: 'Other practical help', glyph: '?' },
];

export const EMOTIONAL_SUPPORT: HelpCategory[] = [
  { id: 'someone-to-talk-to', group: 'emotional', label: 'Someone to talk to', sublabel: '', glyph: '♡' },
  { id: 'been-through-this', group: 'emotional', label: "Someone who's been through this", sublabel: '', glyph: '◉' },
  { id: 'new-mom-support', group: 'emotional', label: 'New-mom support', sublabel: '', glyph: '✿' },
  { id: 'postpartum-support', group: 'emotional', label: 'Postpartum support', sublabel: '', glyph: '❀' },
  { id: 'pregnancy-loss-support', group: 'emotional', label: 'Pregnancy-loss support', sublabel: '', glyph: '❋' },
  { id: 'check-in', group: 'emotional', label: 'Someone to check in on me', sublabel: '', glyph: '◔' },
  { id: 'overwhelmed', group: 'emotional', label: "I'm overwhelmed and need support", sublabel: '', glyph: '☁' },
  { id: 'emotional-other', group: 'emotional', label: 'Something else', sublabel: 'Other emotional support', glyph: '?' },
];

export function categoryById(id: string): HelpCategory | undefined {
  return [...PRACTICAL_HELP, ...EMOTIONAL_SUPPORT].find((category) => category.id === id);
}

export type UrgencyOption = { id: string; label: string; glyph: string };

export const URGENCY_OPTIONS: UrgencyOption[] = [
  { id: 'today', label: 'Today', glyph: '●' },
  { id: 'this-week', label: 'This week', glyph: '◐' },
  { id: 'ongoing', label: 'Ongoing', glyph: '◍' },
  { id: 'no-specific-date', label: 'No specific date', glyph: '○' },
];

export type WhoCanHelpOption = { id: string; label: string; sublabel: string; glyph: string };

export const WHO_CAN_HELP_OPTIONS: WhoCanHelpOption[] = [
  { id: 'community-mom', label: 'Community Mom', sublabel: 'Verified member willing to help', glyph: '◉' },
  { id: 'verified-volunteer', label: 'Verified Volunteer', sublabel: 'Screened volunteer in our community', glyph: '✪' },
  { id: 'mentor', label: 'Mentor', sublabel: 'Verified mom/mentor for guidance & support', glyph: '✦' },
  { id: 'professional', label: 'Professional', sublabel: 'Participating professional (when appropriate)', glyph: '✚' },
];

export type HelpRequest = {
  id: number;
  categoryId: string;
  details: string;
  urgency: string;
  location: string;
  whoCanHelp: string[];
  anonymous: boolean;
  shareName: boolean;
  author: string;
  postedAt: string;
};

// Module-level singleton, same pattern as constants/questions.ts — an
// in-memory prototype store that persists across screen navigations
// within one app session, but resets on reload.
export const helpRequestStore: HelpRequest[] = [];
