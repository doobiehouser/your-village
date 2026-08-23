export const CATEGORIES = ['Pregnancy', 'Postpartum', 'Feeding', 'Sleep', 'Mental Health', 'Other'] as const;
export type Category = (typeof CATEGORIES)[number];

export type QuestionReply = {
  id: number;
  author: string;
  text: string;
};

export type CommunityQuestion = {
  id: number;
  title: string;
  details: string;
  category: Category;
  anonymous: boolean;
  author: string;
  postedAt: string;
  replies: QuestionReply[];
};

export const SEED_QUESTIONS: CommunityQuestion[] = [
  {
    id: 1,
    title: 'How did you get through the first trimester exhaustion?',
    details: "I'm 9 weeks along and barely making it through the workday. Would love any tips that actually helped.",
    category: 'Pregnancy',
    anonymous: false,
    author: 'Maya',
    postedAt: '2 days ago',
    replies: [
      { id: 1, author: 'Jenna', text: 'Protein-heavy snacks every 2 hours saved me. Also, no shame in a 20-minute nap in your car at lunch!' },
      { id: 2, author: 'Priya', text: 'It gets so much better around week 13-14. Hang in there, you are doing great.' },
    ],
  },
  {
    id: 2,
    title: 'Best way to soothe a baby who fights every nap?',
    details: 'My 4-month-old cries the second I lay her down, even when she is clearly exhausted. Any tricks?',
    category: 'Sleep',
    anonymous: true,
    author: 'Anonymous',
    postedAt: '5 days ago',
    replies: [
      { id: 1, author: 'Sofia', text: 'A white noise machine and swaddle changed everything for us around that age.' },
    ],
  },
  {
    id: 3,
    title: 'Is it normal to feel this overwhelmed postpartum?',
    details: 'Six weeks in and some days I just feel like I am not doing anything right. Is this normal?',
    category: 'Mental Health',
    anonymous: false,
    author: 'Dana',
    postedAt: '1 week ago',
    replies: [
      { id: 1, author: 'Renee', text: 'So normal, and so hard. You are not alone in this — please be gentle with yourself.' },
      { id: 2, author: 'Camille', text: 'This was me exactly. It got lighter around month 3. Sending you so much support.' },
    ],
  },
];
