import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Vertical-rhythm + max-width wrapper. `tone` sets the background; padding lives
 *  on the outer element and the inner container handles horizontal gutters. */
interface Props {
  tone?: 'paper' | 'paper-2' | 'mist' | 'navy';
  as?: ElementType;
  id?: string;
  className?: string;
  /** Drop the inner container for full-bleed children. */
  bleed?: boolean;
  children?: ReactNode;
}

const tones: Record<string, string> = {
  paper: 'bg-paper text-ink',
  'paper-2': 'bg-paper-2 text-ink',
  mist: 'bg-mist text-ink',
  navy: 'bg-navy text-white',
};

export default function Section({ tone = 'paper', as = 'section', id, className = '', bleed = false, children }: Props) {
  const Tag = as;
  return (
    <Tag id={id} className={cn('py-section', tones[tone], className)}>
      {bleed ? children : <div className="container-x">{children}</div>}
    </Tag>
  );
}
