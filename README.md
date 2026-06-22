# Gravity Academy — frontend

Custom-coded marketing frontend for **Gravity Academy** (Bengaluru, Classes 6–12).
Built with **Astro + Tailwind + TypeScript**. The programs catalog and future
checkout live in a **separate WordPress + WooCommerce + Elementor** install — this
codebase only deep-links into it (see [Hybrid architecture](#hybrid-architecture)).

The design language is literally *gravity*: a navy/orange "scientific instrument"
system whose one bold moment is the **orbit hero** — six program nodes resting on
elliptical orbits around a gravitational core.

---

## Quick start

```bash
npm install
cp .env.example .env   # fill in keys (the form needs an email provider in prod)
npm run dev            # http://localhost:4321
```

```bash
npm run build          # outputs to ./dist  (+ a Node server entry for the API route)
npm run preview        # preview the production build
```

Requires Node 18.20+ / 20.3+ / 22+.

---

## Project structure

```
public/
  brand-tokens.css     # design tokens — single source of truth, ALSO loaded by WordPress
  favicon.svg  robots.txt  og-default.svg
  toppers/ faculty/    # placeholder photos (replace with real, consented images)
src/
  components/          # Header, Footer, Button, Section, cards, Accordion, OrbitHero, EnquiryForm, Icon…
  data/               # typed content — edit these, not the markup
    site.ts           # phone, WhatsApp, address, socials, WP_SHOP_BASE, USE_WP_API
    programs.ts toppers.ts faculty.ts testimonials.ts faqs.ts  jsonld.ts
  layouts/BaseLayout.astro
  pages/              # index, programs, about, results, faculty, faq, contact, admissions
    api/enquiry.ts    # server-side form handler (validates + emails)
  styles/global.css
tailwind.config.mjs   # brand tokens mapped to the Tailwind theme
astro.config.mjs
```

## Where to drop real content

All content lives in typed files under `src/data/`. Anything needing real data is
marked with a greppable token — find them all with:

```bash
grep -rn "REPLACE" src public
```

Key items: phone / WhatsApp / email / address / map coordinates (`site.ts`),
topper results + photos (`toppers.ts`), faculty (`faculty.ts`), testimonials,
the home-page stats (in `src/pages/index.astro`), and the OG image
(`public/og-default.svg` → export a 1200×630 PNG and point `SEO.astro`'s default at it).

## Forms & lead capture

Both the **Enquiry** (Contact) and **Book-a-Demo** (Admissions) forms share
`EnquiryForm.astro` and POST to `src/pages/api/enquiry.ts`, which:

- validates **server-side** (required fields, phone, optional email) and rejects spam via a honeypot,
- emails `ADMISSIONS_EMAIL` through **Resend** (`RESEND_API_KEY`),
- optionally forwards a copy to `LEADS_WEBHOOK` (Sheet/CRM) so no lead is lost,
- logs no PII.

In dev with no `RESEND_API_KEY`, submissions succeed without sending so you can
test the flow. In **production** a missing key makes the endpoint return a clear,
honest error instead of silently dropping leads. To use SMTP/another provider,
swap the `fetch('https://api.resend.com/emails', …)` block.

---

## Hybrid architecture

This frontend and the WordPress shop are **one brand on one domain**.

- **Deep-linking:** every "View program" / "Enrol" CTA points at
  `${WP_SHOP_BASE}/product-category/<slug>` via `programUrl()` in `programs.ts`.
  Set `PUBLIC_WP_SHOP_BASE` to a same-domain path (reverse-proxy) or a subdomain.
- **Shared identity:** WordPress should enqueue `/brand-tokens.css` and the same
  Google Fonts (Sora, Inter, JetBrains Mono) so the surfaces match seamlessly.
- **Live program data (optional, `PUBLIC_USE_WP_API=true`):** `getPrograms()`
  fetches the public WooCommerce Store API
  (`${WP_SHOP_BASE}/wp-json/wc/store/products`) **at build time**, merges it onto
  the local list by slug, and falls back to local data on any error. First paint
  is never blocked (the site stays static); CORS doesn't apply (server-side fetch).

### Reverse-proxy note (§11 — you don't configure it here)

Route transactional paths to WordPress, everything else to this frontend:

```nginx
location ~ ^/(shop|cart|checkout|my-account|wp-admin|wp-json|wp-content|wp-includes) {
    proxy_pass http://127.0.0.1:8080;   # WordPress (PHP)
}
location / {
    proxy_pass http://127.0.0.1:3000;   # this frontend (Node, from `npm run build`)
}
```

Alternatively host the shop at `shop.gravityacademy.in` and just set
`PUBLIC_WP_SHOP_BASE` to it — no proxy needed.

**Payments later:** turn off WooCommerce catalog mode → set prices → add an India
gateway (Razorpay / Cashfree / PayU) → re-enable cart. This frontend needs no
rebuild; optionally relabel the program CTAs from "Enquire/View" to "Enrol".

---

## Accessibility & performance notes

- Semantic landmarks, logical headings, visible orange focus rings, labeled
  fields, `prefers-reduced-motion` honored (orbit/sweep/parallax/counters freeze
  to the static composition).
- Contrast (§4): orange buttons use **navy** text (~4.9:1); body copy is navy/ink
  on light and white on navy — never small white text on orange.
- Self-hosted variable fonts (`font-display: swap`), lazy images with explicit
  dimensions, JS only as small islands. Sitemap via `@astrojs/sitemap`.
