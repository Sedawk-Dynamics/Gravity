'use client';

import type { ReactNode } from 'react';
import { useDemoModal } from './providers/DemoModalProvider';

/**
 * Inline, text-styled "Book a free demo" trigger (opens the shared demo modal).
 * Used for prose links that in the Astro build were `/admissions` anchors caught
 * by the global click delegation.
 */
export default function DemoLink({ className, children }: { className?: string; children: ReactNode }) {
  const { open } = useDemoModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
