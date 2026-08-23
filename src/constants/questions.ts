export type Topic = {
  id: string;
  label: string;
  glyph: string;
  color: string;
};

export const TOPICS: Topic[] = [
  { id: 'pregnancy', label: 'Pregnancy', glyph: '●', color: '#D98D98' },
  { id: 'postpartum', label: 'Postpartum', glyph: '◔', color: '#C9A15A' },
  { id: 'trying-to-conceive', label: 'Trying to Conceive', glyph: '✦', color: '#7FA48B' },
  { id: 'feeding', label: 'Breastfeeding & Feeding', glyph: '◐', color: '#8FB6C9' },
  { id: 'baby-infant', label: 'Baby & Infant', glyph: '✿', color: '#C98FC0' },
  { id: 'symptoms', label: 'Symptoms & Health Concerns', glyph: '✚', color: '#8799B8' },
  { id: 'mental-wellbeing', label: 'Mental & Emotional Wellbeing', glyph: '❋', color: '#9A8FC4' },
  { id: 'relationships', label: 'Relationships', glyph: '♡', color: '#CE8FA0' },
  { id: 'sleep', label: 'Sleep', glyph: '☾', color: '#7C82B0' },
  { id: 'finances', label: 'Finances & Maternity Leave', glyph: '✤', color: '#6FA89A' },
  { id: 'nutrition', label: 'Nutrition', glyph: '❀', color: '#9CAF6B' },
  { id: 'home-family', label: 'Home & Family', glyph: '⌂', color: '#C98A6B' },
  { id: 'medications', label: 'Medications & Supplements', glyph: '✛', color: '#7C9AC9' },
  { id: 'mom-life', label: 'Mom Life / Vent', glyph: '◈', color: '#D98D6B' },
  { id: 'something-else', label: 'Something Else', glyph: '?', color: '#A6939B' },
];

export function topicById(id: string): Topic {
  return TOPICS.find((topic) => topic.id === id) ?? TOPICS[0];
}

export type ChipOption = {
  id: string;
  label: string;
  glyph: string;
};

export const HEAR_FROM_OPTIONS: ChipOption[] = [
  { id: 'other-moms', label: 'Other Moms', glyph: '◉' },
  { id: 'similar-experience', label: 'Moms who have experienced something similar', glyph: '♡' },
  { id: 'verified-mentor', label: 'Verified Mentor', glyph: '✪' },
  { id: 'healthcare-professional', label: 'Healthcare Professional', glyph: '✚' },
  { id: 'anyone', label: 'Anyone who can help', glyph: '❊' },
];

export const LOOKING_FOR_OPTIONS: ChipOption[] = [
  { id: 'emotional-support', label: 'Emotional support', glyph: '♡' },
  { id: 'advice', label: 'Advice', glyph: '✦' },
  { id: 'professional-perspective', label: 'Professional perspective', glyph: '✚' },
  { id: 'similar-experience', label: 'Someone with similar experience', glyph: '◉' },
  { id: 'practical-help', label: 'Practical help', glyph: '✎' },
  { id: 'just-listen', label: 'Just someone to listen', glyph: '…' },
];

export type QuestionReply = {
  id: number;
  author: string;
  text: string;
};

export type CommunityQuestion = {
  id: number;
  question: string;
  topicId: string;
  hearFrom: string[];
  lookingFor: string[];
  anonymous: boolean;
  allowMessages: boolean;
  author: string;
  postedAt: string;
  replies: QuestionReply[];
};

export const SEED_QUESTIONS: CommunityQuestion[] = [
  {
    id: 1,
    question: 'How did you get through the first trimester exhaustion? I am 9 weeks along and barely making it through the workday.',
    topicId: 'pregnancy',
    hearFrom: ['other-moms'],
    lookingFor: ['advice', 'emotional-support'],
    anonymous: false,
    allowMessages: true,
    author: 'Maya',
    postedAt: '2 days ago',
    replies: [
      { id: 1, author: 'Jenna', text: 'Protein-heavy snacks every 2 hours saved me. Also, no shame in a 20-minute nap in your car at lunch!' },
      { id: 2, author: 'Priya', text: 'It gets so much better around week 13-14. Hang in there, you are doing great.' },
    ],
  },
  {
    id: 2,
    question: 'Best way to soothe a baby who fights every nap? My 4-month-old cries the second I lay her down, even when she is clearly exhausted.',
    topicId: 'sleep',
    hearFrom: ['similar-experience'],
    lookingFor: ['practical-help'],
    anonymous: true,
    allowMessages: false,
    author: 'Anonymous',
    postedAt: '5 days ago',
    replies: [
      { id: 1, author: 'Sofia', text: 'A white noise machine and swaddle changed everything for us around that age.' },
    ],
  },
  {
    id: 3,
    question: 'Is it normal to feel this overwhelmed postpartum? Six weeks in and some days I just feel like I am not doing anything right.',
    topicId: 'mental-wellbeing',
    hearFrom: ['similar-experience', 'healthcare-professional'],
    lookingFor: ['emotional-support', 'just-listen'],
    anonymous: false,
    allowMessages: true,
    author: 'Dana',
    postedAt: '1 week ago',
    replies: [
      { id: 1, author: 'Renee', text: 'So normal, and so hard. You are not alone in this — please be gentle with yourself.' },
      { id: 2, author: 'Camille', text: 'This was me exactly. It got lighter around month 3. Sending you so much support.' },
    ],
  },
];

// Module-level singleton so posted questions persist across screen
// navigations within a single app session (this is still an in-memory
// prototype store, not real backend persistence — it resets on reload).
export const questionStore: CommunityQuestion[] = [...SEED_QUESTIONS];
