'use client';

import { useEffect, useRef } from 'react';

/**
 * Counts up when scrolled into view; renders the final value statically (so SSR /
 * no-JS / reduced-motion all show the correct number with no layout shift) and
 * only animates after mount if motion is allowed.
 */
interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Thousands separator for big numbers. */
  separator?: boolean;
}

export default function AnimatedCounter({ value, prefix = '', suffix = '', separator = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const formatted = separator ? value.toLocaleString('en-IN') : String(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    const fmt = (n: number) => (separator ? Math.round(n).toLocaleString('en-IN') : String(Math.round(n)));

    const run = () => {
      const duration = 1400;
      let start: number | null = null;
      const step = (t: number) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / duration, 1);
        // gravitational ease-out (settle)
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${prefix}${fmt(value * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, suffix, separator]);

  return (
    <span ref={ref} className="counter tabular-nums" data-target={value}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
