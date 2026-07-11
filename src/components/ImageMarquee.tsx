/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

/**
 * Auto-scrolling horizontal image strip (client request). The list is duplicated
 * so the CSS translateX(-50%) loops seamlessly. Pauses on hover; under
 * prefers-reduced-motion it becomes a normal horizontally-scrollable strip.
 * (Styles live in globals.css.)
 */
interface Props {
  images: { src: string; alt: string }[];
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  reverse?: boolean;
}

export default function ImageMarquee({ images, speed = 40, reverse = false }: Props) {
  const doubled = [...images, ...images];
  return (
    <div className="marquee group relative" style={{ '--marquee-speed': `${speed}s` } as CSSProperties}>
      <div className={cn('marquee-track flex w-max gap-4', reverse && 'marquee-reverse')}>
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative h-52 w-72 shrink-0 overflow-hidden rounded-card ring-1 ring-mist sm:h-64 sm:w-96"
          >
            <img
              src={img.src}
              alt={i < images.length ? img.alt : ''}
              aria-hidden={i >= images.length ? true : undefined}
              width={384}
              height={256}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
