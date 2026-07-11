'use client';

import { useState } from 'react';
import { faqs } from '@/data/faqs';
import Icon from './Icon';

/**
 * Accessible FAQ accordion: each item is a <button> controlling a region via
 * aria-expanded + aria-controls. Keyboard-operable; multiple can stay open.
 * (Uses the grid-rows [0fr → 1fr] height-animation trick from the Astro build.)
 */
export default function Accordion() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen((s) => ({ ...s, [i]: !s[i] }));

  return (
    <div className="divide-y divide-mist rounded-card border border-mist bg-paper">
      {faqs.map((item, i) => {
        const isOpen = !!open[i];
        return (
          <div key={i} className="accordion-item">
            <h3 className="m-0">
              <button
                type="button"
                className="accordion-trigger flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-[1.05rem] font-semibold text-navy transition-colors hover:text-orange md:px-6"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <Icon
                  name="chevron-down"
                  size={20}
                  className="accordion-icon shrink-0 text-slate transition-transform duration-300"
                  style={isOpen ? { transform: 'rotate(180deg)' } : undefined}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className="accordion-panel grid transition-[grid-template-rows] duration-300 ease-fall"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-slate md:px-6">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
