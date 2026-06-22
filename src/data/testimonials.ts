export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** Relationship + context, e.g. "Parent of Class X student". */
  role: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'q1',
    quote:
      'The teaching is genuinely concept-first. My daughter stopped memorising and started understanding — her board scores followed.',
    author: 'Lakshmi Menon',
    role: 'Parent of a Class X student',
    avatar: '/testimonials/q1.jpg',
  },
  {
    id: 'q2',
    quote:
      'Small batches meant my doubts never piled up. The mentor knew exactly where I was slipping and fixed it before the next test.',
    author: 'Rahul Verma',
    role: 'JEE Foundation student',
    avatar: '/testimonials/q2.jpg',
  },
  {
    id: 'q3',
    quote:
      'The monthly performance tracking kept us in the loop without us having to chase anyone. That transparency built real trust.',
    author: 'Priya Sundaram',
    role: 'Parent of a NEET aspirant',
    avatar: '/testimonials/q3.jpg',
  },
  {
    id: 'q4',
    quote:
      'Discipline without pressure. The schedule was demanding but never felt like a cram school — I actually enjoyed the subjects.',
    author: 'Aniket Bose',
    role: 'Class XII, CBSE',
    avatar: '/testimonials/q4.jpg',
  },
];
