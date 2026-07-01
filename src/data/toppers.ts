export type Board = 'CBSE' | 'ICSE';

export interface Topper {
  id: string;
  name: string;
  /** Headline score, e.g. "94.5%". */
  score: string;
  /** Subject or scope the score is for. */
  subject: string;
  /** Optional second highlight, e.g. "Science 95%". */
  note?: string;
  board: Board;
  grade: number;
}

// Real first-year results (Gravity Academy — 2025–26). Source: results poster.
export const toppers: Topper[] = [
  { id: 't1', name: 'Anshika S.', score: '94.5%', subject: 'Overall', board: 'CBSE', grade: 10 },
  { id: 't2', name: 'Aaditya S.', score: '100%', subject: 'Mathematics', note: 'Science 95%', board: 'CBSE', grade: 8 },
  { id: 't3', name: 'Tejasva', score: '99%', subject: 'Mathematics', note: 'Science 98%', board: 'CBSE', grade: 8 },
  { id: 't4', name: 'Rajdeep', score: '99%', subject: 'Science', board: 'CBSE', grade: 7 },
  { id: 't5', name: 'Siddharth B.', score: '96%', subject: 'Physics', board: 'ICSE', grade: 8 },
  { id: 't6', name: 'Pragnya', score: '96%', subject: 'Mathematics', board: 'CBSE', grade: 6 },
  { id: 't7', name: 'Hema', score: '94%', subject: 'Chemistry', board: 'ICSE', grade: 8 },
];

export const boardFilters: ('All' | Board)[] = ['All', 'CBSE', 'ICSE'];
export const gradeFilters: ('All' | string)[] = ['All', ...[...new Set(toppers.map((t) => t.grade))].sort((a, b) => a - b).map((g) => `Class ${g}`)];
