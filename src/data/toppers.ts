export type Exam = 'JEE' | 'NEET' | 'Boards' | 'Olympiad';

export interface Topper {
  id: string;
  name: string;
  /** Headline achievement, e.g. "AIR 412" or "98.6%". */
  score: string;
  exam: Exam;
  /** Board or exam detail line. */
  detail: string;
  year: number;
  /** Photo path. Swap sample portraits for real, consented student photos. */
  photo: string;
}

export const toppers: Topper[] = [
  { id: 't1', name: 'Aditya Sharma', score: 'AIR 412', exam: 'JEE', detail: 'JEE Advanced', year: 2025, photo: '/toppers/t1.jpg' },
  { id: 't2', name: 'Ananya Gupta', score: 'AIR 1,287', exam: 'NEET', detail: 'NEET UG', year: 2025, photo: '/toppers/t2.jpg' },
  { id: 't3', name: 'Ishaan Mehta', score: '98.6%', exam: 'Boards', detail: 'CBSE Class XII', year: 2025, photo: '/toppers/t3.jpg' },
  { id: 't4', name: 'Diya Patel', score: '97.2%', exam: 'Boards', detail: 'ICSE Class X', year: 2025, photo: '/toppers/t4.jpg' },
  { id: 't5', name: 'Arjun Nair', score: 'Gold', exam: 'Olympiad', detail: 'IMO National', year: 2024, photo: '/toppers/t5.jpg' },
  { id: 't6', name: 'Sara Khan', score: 'AIR 2,034', exam: 'JEE', detail: 'JEE Main', year: 2024, photo: '/toppers/t6.jpg' },
  { id: 't7', name: 'Karthik Rao', score: '99.1%', exam: 'Boards', detail: 'State Board XII', year: 2024, photo: '/toppers/t7.jpg' },
  { id: 't8', name: 'Riya Joshi', score: 'AIR 3,560', exam: 'NEET', detail: 'NEET UG', year: 2024, photo: '/toppers/t8.jpg' },
];

export const examFilters: ('All' | Exam)[] = ['All', 'JEE', 'NEET', 'Boards', 'Olympiad'];
export const topperYears: number[] = [...new Set(toppers.map((t) => t.year))].sort((a, b) => b - a);
