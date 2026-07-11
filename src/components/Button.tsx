'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import Icon from './Icon';
import { cn } from '@/lib/cn';

/**
 * Renders a next/link for internal hrefs, an external <a> when `external` (or an
 * absolute URL), otherwise a <button>. Contrast (§4): orange `primary` uses navy
 * text and swaps to navy-bg/white-text on hover.
 */
export interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  type?: 'button' | 'submit';
  icon?: string;
  className?: string;
  external?: boolean;
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const base =
  'group inline-flex items-center justify-center gap-2 font-display font-semibold rounded-btn transition-all duration-200 ease-fall focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/45 active:translate-y-px disabled:opacity-60 disabled:pointer-events-none';

const sizes: Record<string, string> = {
  md: 'text-[0.95rem] px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

const variants: Record<string, string> = {
  primary: 'bg-orange text-navy shadow-soft hover:bg-navy hover:text-white hover:shadow-lift',
  secondary: 'bg-navy text-white hover:bg-navy-800 shadow-soft',
  ghost: 'text-navy hover:bg-mist/60 ring-1 ring-inset ring-slate/35 hover:ring-navy/40',
};

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  icon,
  className = '',
  external = false,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    // Internal app routes (path or hash) use next/link; everything else — external
    // http(s), tel:, mailto: — renders a plain <a>. Only real web links (or an
    // explicit `external`) open in a new tab, matching the Astro build.
    if (/^[/#]/.test(href)) {
      return (
        <Link href={href} className={cls} {...rest}>
          {content}
        </Link>
      );
    }
    const openNewTab = external || /^https?:\/\//.test(href);
    const tabAttrs = openNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={cls} {...tabAttrs} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={cls} {...rest}>
      {content}
    </button>
  );
}
