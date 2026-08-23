export type JourneyStageId = 'ttc' | 'pregnant' | 'postpartum' | 'parenting' | 'loss' | 'different';

export type JourneyStage = {
  id: JourneyStageId;
  label: string;
  glyph: string;
  color: string;
};

export const JOURNEY_STAGES: JourneyStage[] = [
  { id: 'ttc', label: 'Trying to Conceive (TTC)', glyph: '✦', color: '#7FA48B' },
  { id: 'pregnant', label: 'Pregnant', glyph: '♥', color: '#D98D98' },
  { id: 'postpartum', label: 'Postpartum', glyph: '◔', color: '#C9A15A' },
  { id: 'parenting', label: 'Parenting', glyph: '☀', color: '#D9925C' },
  { id: 'loss', label: 'Pregnancy or Infant Loss', glyph: '♡', color: '#B79AC9' },
  { id: 'different', label: 'My Journey Is Different', glyph: '❈', color: '#9A8FC4' },
];

export type MomentTypeId = 'ttc' | 'moment' | 'appointment' | 'pregnancy' | 'memory';

export type MomentType = {
  id: MomentTypeId;
  label: string;
  glyph: string;
  color: string;
};

export const MOMENT_TYPES: MomentType[] = [
  { id: 'ttc', label: 'Trying to Conceive', glyph: '✦', color: '#7FA48B' },
  { id: 'moment', label: 'Big Moment', glyph: '♥', color: '#D98D98' },
  { id: 'appointment', label: 'Appointment', glyph: '✚', color: '#8799B8' },
  { id: 'pregnancy', label: 'Pregnancy Milestone', glyph: '❀', color: '#9A8FC4' },
  { id: 'memory', label: 'Memory', glyph: '✎', color: '#8A88B8' },
];

export function momentType(id: MomentTypeId): MomentType {
  return MOMENT_TYPES.find((type) => type.id === id) ?? MOMENT_TYPES[0];
}

export type JourneyMoment = {
  id: number;
  date: string;
  title: string;
  note?: string;
  typeId: MomentTypeId;
};

export const INITIAL_MOMENTS: JourneyMoment[] = [
  { id: 1, date: 'June 2, 2026', title: 'Started trying to conceive', typeId: 'ttc' },
  { id: 2, date: 'July 14, 2026', title: 'Positive ovulation test', typeId: 'moment' },
  { id: 3, date: 'August 5, 2026', title: 'Doctor appointment', typeId: 'appointment' },
  { id: 4, date: 'September 10, 2026', title: 'Positive pregnancy test', typeId: 'moment' },
  { id: 5, date: 'October 1, 2026', title: '6 weeks pregnant — first ultrasound', typeId: 'pregnancy' },
];
