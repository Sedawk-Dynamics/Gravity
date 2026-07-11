import type { Testimonial } from '@/data/testimonials';
import Icon from './Icon';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.author
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-card border border-mist bg-paper p-6 shadow-soft">
      <Icon name="quote" size={28} className="text-orange/80" />
      <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">{testimonial.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-mist pt-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-white"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span>
          <span className="block font-display font-semibold text-navy">{testimonial.author}</span>
          <span className="block text-sm text-slate">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
