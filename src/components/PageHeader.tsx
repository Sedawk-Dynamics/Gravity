import type { ReactNode } from 'react';

/** Interior-page hero. Top padding clears the sticky header. */
interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="grid-motif pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      <div className="container-x relative max-w-3xl pb-14 pt-14 md:pb-20 md:pt-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 font-display text-display-xl text-white">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
