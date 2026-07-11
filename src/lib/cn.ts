import clsx, { type ClassValue } from 'clsx';

/** Tailwind-friendly className joiner — the React equivalent of Astro's class:list. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
