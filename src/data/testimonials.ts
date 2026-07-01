export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** Relationship + context, e.g. "Parent of Class X student". */
  role: string;
}

// Real testimonials supplied by the client.
export const testimonials: Testimonial[] = [
  {
    id: 'q1',
    quote:
      "Definitely will recommend this to others. The teachers are awesome, especially our chemistry sir — the way of teaching is on a different level. The classrooms are great, clean and well designed. I've learnt a lot of things by coming to Gravity. One of the best academies I've been to; each and everything is explained in detail.",
    author: 'Siddharth B.',
    role: 'Student',
  },
  {
    id: 'q2',
    quote:
      "Joining Gravity Academy has completely transformed the way I approach my studies and helped me build a strong academic foundation. The faculty's dedication and personalized attention made even the toughest subjects feel manageable and engaging. Both my performance and my interest in learning have improved significantly.",
    author: 'Yuvraj Gohil',
    role: 'Student',
  },
  {
    id: 'q3',
    quote:
      'A great place to learn and grow. Gravity Academy has helped my son a lot in his 8th standard (CBSE) studies. The teachers teach in an easy way and clear all his doubts with patience. The regular tests and feedback have improved his confidence and performance. I would surely recommend Gravity Academy to other parents.',
    author: 'Vandana Chauhan',
    role: 'Parent of Tejasva',
  },
  {
    id: 'q4',
    quote:
      'Gravity Academy has helped me a lot by strengthening my concepts from the basics — especially Physics — and always gives attention to everyone so no one is left behind. The teachers are always ready to help and clear doubts, which makes concepts crystal clear.',
    author: 'Yash',
    role: 'Student',
  },
];
