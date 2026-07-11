# Gravity Academy — frontend

Custom-coded marketing frontend for **Gravity Academy** (Bengaluru, Classes 6–12).
Built with **Next.js (App Router) + React + Tailwind + TypeScript**. The programs
catalog and future checkout live in a **separate WordPress + WooCommerce + Elementor**
install — this codebase only deep-links into it (see [Hybrid architecture](#hybrid-architecture)).

The design language is literally *gravity*: a navy/orange "scientific instrument"
system, fronted by three client-approved hero banners (Foundation · JEE · NEET).

---

## Quick start

```bash
npm install
cp .env.example .env   # optional — only needed to point at the WordPress shop
npm run dev            # http://localhost:3000
```

```bash
npm run build          # static production build (.next)
npm run start          # serve the production build
```

Requires Node 20.3+ / 22+.

---

## Project structure

```
public/
  brand-tokens.css     # design tokens — single source of truth, ALSO loaded by WordPress
  favicon.svg  robots.txt  og-default.svg
  hero/ gallery/ founder/ logo/   # real, client-supplied imagery
src/
  app/
    layout.tsx         # root layout: fonts, globals.css, Header/Footer, providers, RevealObserver
    page.tsx           # "/"  (home)
    about/  programs/  programs/[slug]/  courses/  courses/[slug]/
    admissions/  contact/  gallery/  faq/
    sitemap.ts         # /sitemap.xml — all static + dynamic routes
    globals.css        # brand tokens + Tailwind layers + component-scoped styles
  components/          # Header, Footer, Button, Section, cards, Accordion, HeroBanners, forms, Icon…
    providers/DemoModalProvider.tsx   # global "Book a free demo" modal context
  lib/                # cn(), buildMetadata()
  data/               # typed content — edit these, not the markup
    site.ts           # phone, WhatsApp, address, socials, WP_SHOP_BASE, USE_WP_API
    programs.ts courses.ts toppers.ts testimonials.ts faqs.ts jsonld.ts
tailwind.config.ts    # brand tokens mapped to the Tailwind theme
next.config.mjs  postcss.config.mjs  tsconfig.json
```

## Where to drop real content

All content lives in typed files under `src/data/`. Edit those rather than the
markup. Key items: phone / WhatsApp / email / address / map coordinates
(`site.ts`), topper results (`toppers.ts`), testimonials, the home-page stats
(in `src/app/page.tsx`), and the OG image (`public/og-default.svg`).

## Forms & lead capture (Web3Forms)

Both the **Enquiry** (Contact) and **Book-a-Demo** (Admissions + the global popup)
forms submit **client-side** to [Web3Forms](https://web3forms.com) — no server
route, no server email, the site stays fully static:

- `EnquiryForm.tsx` (Contact / Admissions) and `BookDemoModal.tsx` (popup) each
  `POST` a `FormData` to `https://api.web3forms.com/submit` with the shared
  `access_key`, validate required fields / phone / optional email, use a
  `botcheck` honeypot, and swap to a success view when `json.success` is true.
- Submissions are emailed to the inbox tied to the Web3Forms access key. To change
  the destination, create a new access key in Web3Forms and replace it in both
  components.

---

## Hybrid architecture

This frontend and the WordPress shop are **one brand on one domain**.

- **Deep-linking:** every "View in catalog" / "Enrol" CTA points at
  `${WP_SHOP_BASE}/product-category/<slug>` (via `programUrl()`) or
  `${WP_SHOP_BASE}/product/<slug>` (via `courseCatalogUrl()`). Set
  `NEXT_PUBLIC_WP_SHOP_BASE` to a same-domain path (reverse-proxy) or a subdomain.
- **Shared identity:** WordPress should enqueue `/brand-tokens.css` and the same
  fonts (Poppins, Inter, JetBrains Mono) so the surfaces match seamlessly.
- **Live program data (optional, `NEXT_PUBLIC_USE_WP_API=true`):** `getPrograms()`
  fetches the public WooCommerce Store API
  (`${WP_SHOP_BASE}/wp-json/wc/store/products`) **at build time**, merges it onto
  the local list by slug, and falls back to local data on any error. First paint
  is never blocked (the site stays static); CORS doesn't apply (server-side fetch).

**Payments later:** turn off WooCommerce catalog mode → set prices → add an India
gateway (Razorpay / Cashfree / PayU) → re-enable cart. This frontend needs no
rebuild; optionally relabel the program CTAs from "Enquire/View" to "Enrol".

---

## Accessibility & performance notes

- Semantic landmarks, logical headings, visible orange focus rings, labeled
  fields, `prefers-reduced-motion` honored (carousel/reveal/counters freeze to the
  static composition).
- Contrast: orange buttons use **navy** text (~4.9:1); body copy is navy/ink on
  light and white on navy — never small white text on orange.
- Self-hosted fonts via `@fontsource` (`font-display: swap`), lazy images with
  explicit dimensions, client interactivity kept to small islands. Sitemap via
  Next's `app/sitemap.ts`.
