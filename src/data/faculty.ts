export interface Faculty {
  id: string;
  name: string;
  subject: string;
  /** Short credential line — keep it specific, not generic. */
  credential: string;
  photo: string;
}

export const faculty: Faculty[] = [
  { id: 'f1', name: 'Dr. Anant Rao', subject: 'Physics', credential: 'Ph.D (IISc) · 14 years coaching JEE Physics', photo: '/faculty/f1.jpg' },
  { id: 'f2', name: 'Dr. Meera Krishnan', subject: 'Chemistry', credential: 'Ph.D · Organic chemistry specialist, 11 years', photo: '/faculty/f2.jpg' },
  { id: 'f3', name: 'Vikram Iyer', subject: 'Mathematics', credential: 'M.Sc · Olympiad mentor & IMO trainer', photo: '/faculty/f3.jpg' },
  { id: 'f4', name: 'Dr. Sneha Nair', subject: 'Biology', credential: 'MBBS · NEET Biology, 9 years', photo: '/faculty/f4.jpg' },
  { id: 'f5', name: 'Rohan Desai', subject: 'Mathematics (Foundation)', credential: 'M.Sc, B.Ed · Builds early conceptual depth', photo: '/faculty/f5.jpg' },
  { id: 'f6', name: 'Kavya Reddy', subject: 'English & Aptitude', credential: 'MA English · Communication & reasoning', photo: '/faculty/f6.jpg' },
];
