import Link from 'next/link';
import type { Program } from '@/data/programs';
import Icon from './Icon';

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <article
      id={program.slug}
      className="group relative flex scroll-mt-28 flex-col rounded-card border border-mist bg-paper p-6 shadow-soft transition-all duration-300 ease-fall hover:-translate-y-1 hover:border-slate/40 hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-btn bg-mist text-navy transition-colors duration-300 group-hover:bg-orange group-hover:text-navy">
        <Icon name={program.icon} size={24} />
      </span>
      <h3 className="mt-5 font-display text-display-sm text-navy">{program.name}</h3>
      <p className="mt-2 text-slate">{program.tagline}</p>

      <Link
        href={`/programs/${program.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md font-display text-sm font-semibold text-navy transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/40"
        aria-label={`View ${program.name}`}
      >
        View program
        <Icon name="arrow-right" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
