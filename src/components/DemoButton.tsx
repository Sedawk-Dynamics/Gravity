'use client';

import Button, { type ButtonProps } from './Button';
import { useDemoModal } from './providers/DemoModalProvider';

/**
 * A "Book a free demo" trigger. Behaves like <Button> but opens the shared
 * demo modal instead of navigating. Used wherever the Astro build wired an
 * `/admissions` link into the global demo-modal click delegation.
 */
export default function DemoButton({ children = 'Book a free demo', ...props }: Omit<ButtonProps, 'href'>) {
  const { open } = useDemoModal();
  return (
    <Button type="button" onClick={open} {...props}>
      {children}
    </Button>
  );
}
