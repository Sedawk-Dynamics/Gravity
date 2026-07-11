import { cn } from '@/lib/cn';

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export default function SectionHead({ eyebrow, title, intro, align = 'left', tone = 'light', className = '' }: Props) {
  const titleColor = tone === 'dark' ? 'text-white' : 'text-navy';
  const introColor = tone === 'dark' ? 'text-mist' : 'text-slate';
  const wrap = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';
  return (
    <div className={cn('flex min-w-0 max-w-2xl flex-col [text-wrap:balance] [overflow-wrap:anywhere]', wrap, className)} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cn('mt-3 font-display text-display-lg', titleColor)}>{title}</h2>
      {intro && <p className={cn('mt-4 text-lg leading-relaxed', introColor, align === 'center' ? '' : 'prose-measure')}>{intro}</p>}
    </div>
  );
}
