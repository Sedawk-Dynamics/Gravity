import { site } from '@/data/site';
import { cn } from '@/lib/cn';

/**
 * Official Gravity Academy logo lockup. dark → navy (light backgrounds,
 * /logo/gravity.svg); light → white (dark backgrounds, /logo/gravity-white.svg).
 */
interface Props {
  variant?: 'dark' | 'light';
  className?: string;
}

export default function Logo({ variant = 'dark', className = '' }: Props) {
  const src = variant === 'light' ? '/logo/gravity-white.svg' : '/logo/gravity.svg';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={`${site.name} logo`} width={483} height={171} className={cn('w-auto', className)} loading="eager" decoding="async" />
  );
}
