import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
// Self-hosted via @fontsource (no extra network round-trip, font-display: swap).
// Display: Poppins (rounded, friendly). Body: Inter. Data/eyebrows: JetBrains Mono.
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import { site } from '@/data/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import RevealObserver from '@/components/RevealObserver';
import DemoModalProvider from '@/components/providers/DemoModalProvider';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
};

export const viewport: Viewport = {
  themeColor: '#012877',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-btn focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <DemoModalProvider>
          <Header />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />
          <WhatsAppFloat />
          <RevealObserver />
        </DemoModalProvider>
      </body>
    </html>
  );
}
