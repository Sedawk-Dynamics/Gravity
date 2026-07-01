import { WP_SHOP_BASE } from './site';

/** A specific course/batch (client "Course Pages Master Copy"). Each maps to one
 *  of the six top-level program categories via `category` (a programs.ts slug). */
export interface Course {
  slug: string;
  series: string; // "LaunchPad", "Accelerate", "Elevate", "MedEdge", "TechEdge", "Karnataka Edge", "Rapid Revision"
  name: string;
  short: string; // compact label for cards
  level: string; // "Grade 6", "Grades 11–12", etc.
  category: string; // parent program slug (see programs.ts)
  tagline: string; // hero value proposition
  audience: string; // who should join
  why: string; // why this programme
  subjects: string; // Subjects & Curriculum
  icon: string;
}

export const courses: Course[] = [
  // ── Foundation: LaunchPad (Grades 6–8) ──
  {
    slug: 'launchpad-grade-6',
    series: 'LaunchPad', name: 'LaunchPad — Grade 6 Foundation', short: 'Grade 6 Foundation', level: 'Grade 6',
    category: 'foundation', icon: 'atom',
    tagline: 'Start strong. Build the concepts and study habits that make senior school effortless.',
    audience: 'Grade 6 students beginning to build serious academic foundations across boards.',
    why: 'Grade 6 is where curiosity turns into capability. We turn everyday topics into deep understanding, so later grades feel like a natural next step instead of a jump.',
    subjects: 'Mathematics, Science, Logical Reasoning, Olympiad Foundation and study skills.',
  },
  {
    slug: 'launchpad-grade-7',
    series: 'LaunchPad', name: 'LaunchPad — Grade 7 Foundation', short: 'Grade 7 Foundation', level: 'Grade 7',
    category: 'foundation', icon: 'atom',
    tagline: 'Sharpen analytical thinking while the fundamentals are still forming.',
    audience: 'Grade 7 students strengthening analytical and problem-solving skills.',
    why: 'The Grade 7 syllabus rewards reasoning over recall. We build that reasoning muscle early so tougher concepts in Grades 8–10 land easily.',
    subjects: 'Mathematics, Science, Logical Reasoning, Olympiad Foundation and study skills.',
  },
  {
    slug: 'launchpad-grade-8',
    series: 'LaunchPad', name: 'LaunchPad — Grade 8 Foundation', short: 'Grade 8 Foundation', level: 'Grade 8',
    category: 'foundation', icon: 'atom',
    tagline: 'Bridge into secondary school with rock-solid concepts and exam temperament.',
    audience: 'Grade 8 students preparing for the rigour of secondary school and boards.',
    why: 'Grade 8 is the launchpad for board years. We close gaps, deepen fundamentals, and introduce the discipline that Grades 9–10 demand.',
    subjects: 'Mathematics, Science, Logical Reasoning, Olympiad Foundation and study skills.',
  },

  // ── Foundation: Accelerate (Grades 9–10 boards) ──
  {
    slug: 'accelerate-grade-9-cbse',
    series: 'Accelerate', name: 'Accelerate — Grade 9 CBSE', short: 'Grade 9 CBSE', level: 'Grade 9 · CBSE',
    category: 'foundation', icon: 'target',
    tagline: 'CBSE Grade 9: board excellence with a competitive-exam foundation.',
    audience: 'CBSE Grade 9 students aiming for top board scores and an early entrance-exam edge.',
    why: 'Grade 9 concepts are the backbone of Grade 10 boards and JEE/NEET foundations. We teach them once, properly, so nothing needs re-learning later.',
    subjects: 'Board-specific Mathematics, Physics, Chemistry and Biology with concept-first teaching.',
  },
  {
    slug: 'accelerate-grade-9-icse',
    series: 'Accelerate', name: 'Accelerate — Grade 9 ICSE', short: 'Grade 9 ICSE', level: 'Grade 9 · ICSE',
    category: 'foundation', icon: 'target',
    tagline: 'ICSE Grade 9: conceptual depth that matches the board’s rigour.',
    audience: 'ICSE Grade 9 students who want depth, not shortcuts, across the sciences and maths.',
    why: 'ICSE rewards thorough understanding and application. Our concept-first approach fits the board perfectly and builds lasting command of every subject.',
    subjects: 'Board-specific Mathematics, Physics, Chemistry and Biology with concept-first teaching.',
  },
  {
    slug: 'accelerate-grade-10-cbse',
    series: 'Accelerate', name: 'Accelerate — Grade 10 CBSE', short: 'Grade 10 CBSE', level: 'Grade 10 · CBSE',
    category: 'foundation', icon: 'target',
    tagline: 'CBSE board preparation with genuine confidence.',
    audience: 'CBSE Grade 10 students preparing for board exams with a competitive edge.',
    why: 'The Grade 10 board result opens doors. We combine complete syllabus mastery with relentless practice and analysis so students walk in prepared.',
    subjects: 'Board-specific Mathematics, Physics, Chemistry and Biology with concept-first teaching.',
  },
  {
    slug: 'accelerate-grade-10-icse',
    series: 'Accelerate', name: 'Accelerate — Grade 10 ICSE', short: 'Grade 10 ICSE', level: 'Grade 10 · ICSE',
    category: 'foundation', icon: 'target',
    tagline: 'ICSE board preparation with rigorous, structured practice.',
    audience: 'ICSE Grade 10 students targeting strong board results.',
    why: 'ICSE boards demand precision and thorough writing. Our structured practice, tests and feedback build exactly that discipline.',
    subjects: 'Board-specific Mathematics, Physics, Chemistry and Biology with concept-first teaching.',
  },

  // ── Test Prep: Elevate (Grades 11–12) ──
  {
    slug: 'elevate-grade-11-pcm',
    series: 'Elevate', name: 'Elevate — Grade 11 PCM', short: 'Grade 11 PCM', level: 'Grade 11 · PCM',
    category: 'test-prep', icon: 'rocket',
    tagline: 'Physics, Chemistry & Maths for boards, JEE and KCET — from day one.',
    audience: 'Grade 11 PCM students balancing boards with JEE/KCET preparation.',
    why: 'Grade 11 is where the entrance-exam gap opens up. We build board strength and entrance-level problem solving together, so you never have to choose.',
    subjects: 'Physics, Chemistry, Mathematics aligned to boards and entrance preparation.',
  },
  {
    slug: 'elevate-grade-11-pcb',
    series: 'Elevate', name: 'Elevate — Grade 11 PCB', short: 'Grade 11 PCB', level: 'Grade 11 · PCB',
    category: 'test-prep', icon: 'stethoscope',
    tagline: 'Physics, Chemistry & Biology for boards and NEET.',
    audience: 'Grade 11 PCB students aiming for boards and NEET together.',
    why: 'NEET is won in Grade 11. We anchor NCERT-deep biology and strong PCB fundamentals early so Grade 12 is revision, not catch-up.',
    subjects: 'Physics, Chemistry, Biology aligned to boards and NEET.',
  },
  {
    slug: 'elevate-grade-11-pcmb',
    series: 'Elevate', name: 'Elevate — Grade 11 PCMB', short: 'Grade 11 PCMB', level: 'Grade 11 · PCMB',
    category: 'test-prep', icon: 'flask-conical',
    tagline: 'Keep both doors open — integrated engineering and medical preparation.',
    audience: 'Grade 11 students who want to keep both JEE and NEET options open.',
    why: 'Not ready to choose between engineering and medicine? PCMB keeps both paths live with a carefully balanced, no-overload schedule.',
    subjects: 'Physics, Chemistry, Mathematics and Biology — integrated engineering & medical preparation.',
  },
  {
    slug: 'elevate-grade-12-pcm',
    series: 'Elevate', name: 'Elevate — Grade 12 PCM', short: 'Grade 12 PCM', level: 'Grade 12 · PCM',
    category: 'test-prep', icon: 'rocket',
    tagline: 'Board mastery with focused JEE and KCET preparation.',
    audience: 'Grade 12 PCM students targeting boards plus JEE/KCET.',
    why: 'Grade 12 is about execution. Intensive revision, timed mocks and sharp analysis convert a strong foundation into a strong rank and result.',
    subjects: 'Physics, Chemistry, Mathematics aligned to boards and entrance preparation.',
  },
  {
    slug: 'elevate-grade-12-pcb',
    series: 'Elevate', name: 'Elevate — Grade 12 PCB', short: 'Grade 12 PCB', level: 'Grade 12 · PCB',
    category: 'test-prep', icon: 'stethoscope',
    tagline: 'Board mastery with focused NEET preparation.',
    audience: 'Grade 12 PCB students targeting boards plus NEET.',
    why: 'The final year needs precision and stamina. High-yield revision, full-length mocks and doubt clinics keep students exam-ready right up to the day.',
    subjects: 'Physics, Chemistry, Biology aligned to boards and NEET.',
  },
  {
    slug: 'elevate-grade-12-pcmb',
    series: 'Elevate', name: 'Elevate — Grade 12 PCMB', short: 'Grade 12 PCMB', level: 'Grade 12 · PCMB',
    category: 'test-prep', icon: 'flask-conical',
    tagline: 'The complete science programme — engineering and medical, in one track.',
    audience: 'Grade 12 students continuing an integrated engineering + medical path.',
    why: 'A demanding but well-orchestrated schedule keeps all four subjects sharp and both entrance options open through the final year.',
    subjects: 'Physics, Chemistry, Mathematics and Biology — integrated engineering & medical preparation.',
  },

  // ── NEET: MedEdge ──
  {
    slug: 'mededge-neet-2-year',
    series: 'MedEdge', name: 'MedEdge — NEET 2-Year', short: 'NEET 2-Year', level: 'Grades 11–12',
    category: 'neet-foundation', icon: 'stethoscope',
    tagline: 'The complete two-year runway to a strong NEET score.',
    audience: 'Students entering Grade 11 who are serious about NEET.',
    why: 'Two years is the ideal NEET timeline — time to master NCERT deeply, build MCQ speed, and revise thoroughly without last-minute panic.',
    subjects: 'Physics, Chemistry, Biology with NEET-focused modules, NCERT mastery, MCQs, tests and revisions.',
  },
  {
    slug: 'mededge-neet-1-year',
    series: 'MedEdge', name: 'MedEdge — NEET 1-Year', short: 'NEET 1-Year', level: 'Grade 12 / Repeaters',
    category: 'neet-foundation', icon: 'stethoscope',
    tagline: 'Intensive, focused NEET preparation for the final push.',
    audience: 'Grade 12 students and repeaters targeting NEET in a single focused year.',
    why: 'One year, done right. A tightly sequenced plan of concept repair, high-yield practice and full-length mocks maximises every remaining day.',
    subjects: 'Physics, Chemistry, Biology with NEET-focused modules, NCERT mastery, MCQs, tests and revisions.',
  },

  // ── JEE: TechEdge ──
  {
    slug: 'techedge-jee-main',
    series: 'TechEdge', name: 'TechEdge — JEE Main', short: 'JEE Main', level: 'Grades 11–12',
    category: 'jee-foundation', icon: 'rocket',
    tagline: 'Concept-first JEE Main preparation built on real problem solving.',
    audience: 'Aspiring engineers targeting JEE Main alongside their boards.',
    why: 'JEE rewards application, not memorisation. We drill derivations, previous-year problems and mock tests until concepts become instinct.',
    subjects: 'Physics, Chemistry, Mathematics with JEE Main concepts, problem solving, PYQs and mock tests.',
  },

  // ── Subject Coaching / State: Karnataka Edge + Rapid Revision ──
  {
    slug: 'karnataka-edge-kcet',
    series: 'Karnataka Edge', name: 'Karnataka Edge — KCET', short: 'KCET', level: 'Grades 11–12',
    category: 'subject-coaching', icon: 'medal',
    tagline: 'Dedicated KCET preparation, aligned to the Karnataka board.',
    audience: 'Karnataka students targeting KCET for engineering or medical seats.',
    why: 'KCET rewards syllabus alignment and speed. We map preparation tightly to the Karnataka board and drill KCET-style practice throughout.',
    subjects: 'Physics, Chemistry, Mathematics/Biology as applicable, Karnataka board alignment and KCET practice.',
  },
  {
    slug: 'rapid-revision-crash-course',
    series: 'Rapid Revision', name: 'Rapid Revision — Crash Course', short: 'Crash Course', level: 'Pre-exam',
    category: 'subject-coaching', icon: 'clock',
    tagline: 'High-intensity revision to peak right before the exam.',
    audience: 'Students who need focused, high-yield revision before board or entrance exams.',
    why: 'When exams are close, focus matters most. We compress the syllabus into high-yield sessions, rapid practice and targeted doubt clearing.',
    subjects: 'Board-specific Mathematics, Physics, Chemistry and Biology — high-yield revision before exams.',
  },
];

// Shared content that's identical across the course pages (from the master copy).
export const methodology = ['Concept', 'Classroom Practice', 'Homework', 'Tests', 'Analysis', 'Improvement'];
export const studyMaterial = ['Printed notes', 'Worksheets', 'Previous-year questions', 'Assignments', 'Revision modules'];
export const performanceTracking = ['Weekly tests', 'Monthly tests', 'Parent-teacher meetings', 'Performance analytics', 'Mentor reviews'];
export const learningOutcomes = ['Concept mastery', 'Higher scores', 'Confidence', 'Exam readiness'];
export const learningModes = ['Offline', 'Online Live', 'Hybrid'];

export const courseFaqs = [
  { q: 'What is the batch size?', a: 'Batches are kept small (typically 12–18 students) so every student gets individual attention and continuous academic support.' },
  { q: 'What if I miss a class?', a: 'Missed concepts are covered through doubt-solving sessions and recap support, and hybrid students can catch up via online live classes.' },
  { q: 'How are the fees structured?', a: 'Fees vary by programme and mode (offline / online / hybrid). Flexible payment options are available — a counsellor will share the exact structure.' },
  { q: 'Is a free demo class available?', a: 'Yes. You can book a free demo class for this programme with no commitment — the best way to experience our teaching first-hand.' },
  { q: 'What study material is provided?', a: 'Printed notes, worksheets, previous-year questions, assignments and revision modules are included, aligned to your board and target exam.' },
];

/** All course "series" in display order, for grouping on the index. */
export const courseSeries = [
  'LaunchPad', 'Accelerate', 'Elevate', 'MedEdge', 'TechEdge', 'Karnataka Edge', 'Rapid Revision',
];

export const coursesByCategory = (categorySlug: string): Course[] =>
  courses.filter((c) => c.category === categorySlug);

/** External enrolment deep-link into the WordPress catalog. */
export const courseCatalogUrl = (slug: string): string =>
  `${WP_SHOP_BASE.replace(/\/$/, '')}/product/${slug}`;
