import type { Topper } from '@/data/toppers';
import Icon from './Icon';

export default function TopperCard({ topper }: { topper: Topper }) {
  return (
    <article
      className="topper-card group relative flex flex-col overflow-hidden rounded-card border border-mist bg-paper p-6 text-center shadow-soft transition-all duration-300 ease-fall hover:-translate-y-1 hover:shadow-lift"
      data-board={topper.board}
      data-grade={`Class ${topper.grade}`}
    >
      <span className="absolute right-4 top-4 rounded-full bg-mist px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-wide text-navy">
        {topper.board}
      </span>

      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-orange/12 text-orange">
        <Icon name="trophy" size={24} />
      </span>

      <p className="mt-4 font-display text-[2.4rem] font-bold leading-none text-orange">{topper.score}</p>
      <p className="mt-2 font-display text-sm font-semibold uppercase tracking-wide text-navy">{topper.subject}</p>
      {topper.note && <p className="mt-0.5 text-xs text-slate">{topper.note}</p>}

      <p className="mt-4 font-display text-lg font-semibold text-navy">{topper.name}</p>
      <p className="text-sm text-slate">Class {topper.grade} · {topper.board}</p>
    </article>
  );
}
