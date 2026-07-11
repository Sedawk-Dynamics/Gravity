'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import BookDemoModal from '@/components/BookDemoModal';

/**
 * Replaces the Astro document-level click delegation. Any "Book a free demo"
 * trigger calls `open()`; the single BookDemoModal instance is rendered here and
 * driven by `isOpen`. `/admissions` stays a real route (no-JS fallback).
 */
const DemoModalContext = createContext<{ open: () => void }>({ open: () => {} });

export const useDemoModal = () => useContext(DemoModalContext);

export default function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DemoModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <BookDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </DemoModalContext.Provider>
  );
}
