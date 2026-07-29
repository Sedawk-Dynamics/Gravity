# Gravity Academy — WordPress (WoodMart) brand kit

Makes the WordPress install at `https://staging.gravity.sedawk.cloud/` (blog +
WooCommerce) look and feel identical to the Next.js frontend
(`https://www.gogravity.in`), per the hybrid architecture in the main
[README](../README.md): shared brand tokens, same fonts, same header/footer
language — one brand, two systems.

```
wordpress/
  gravity-woodmart-child/  ← install this as the active theme (zip + upload)
    style.css              child theme header
    functions.php          enqueues Google Fonts + brand-tokens.css + gravity-skin.css
    assets/css/brand-tokens.css   verbatim copy of ../public/brand-tokens.css
    assets/css/gravity-skin.css   the skin: WoodMart → Gravity design language
    assets/img/gravity.svg / gravity-white.svg   official logo lockups
  html-blocks/footer.html  ← paste into a WoodMart HTML Block for the footer
```

> **⚠️ Current staging state (29 Jul 2026, evening):** staging now runs
> **WoodMart 8.2.6** with the *Smart Home* demo imported, and the **stock
> XTemos "Woodmart Child"** (empty) is the active theme. The folder here is
> deliberately named `gravity-woodmart-child` so it can be uploaded alongside
> the stock child without a folder conflict — upload it, **activate it**
> (Appearance → Themes), then optionally delete the stock "Woodmart Child".
> The demo's lorem-ipsum pages/products fight the brand — delete or replace
> them (the demo homepage is an Elementor page; the demo header is
> `xts-header_611776` and should be replaced by the "Gravity" header below).

---

## 1. Install the child theme

1. Zip the `gravity-woodmart-child` folder (or use the pre-built
   `gravity-woodmart-child.zip` next to it).
2. WP Admin → Appearance → Themes → Add New → Upload → activate
   **WoodMart Child — Gravity Academy** (parent WoodMart must be installed).
3. That alone loads Poppins/Inter/JetBrains Mono, the brand tokens, and the
   skin. SVG uploads are enabled for administrators (needed for the logos).

**Token discipline:** `assets/css/brand-tokens.css` is a copy of the frontend's
`public/brand-tokens.css`. Never edit the copy — change the frontend file and
re-copy it here.

## 2. Theme Settings (WoodMart → Theme Settings)

The skin overrides most colors/fonts with CSS, but set these so WoodMart's
generated CSS agrees instead of fighting:

| Setting | Value |
|---|---|
| General → Colors → Primary color | `#FD5E03` (orange) |
| General → Colors → Secondary color | `#012877` (navy) |
| General → Colors → Link color | `#012877`, hover `#FD5E03` |
| Typography → Text font | Inter (Google), 17px, color `#0A0F1F` |
| Typography → Titles font | Poppins (Google), 700, color `#012877` |
| Typography → Entities title font | Poppins, 600 |
| General → Layout → Site width | 1200 px |
| Shop → Roundness (if present) | Blocks 16px, buttons/forms 12px |
| Performance → Google Fonts | Load locally if offered (GDPR + speed) |

## 3. Header (WoodMart Header Builder)

Goal — replica of the Next.js header: **logo left · menu center · phone + orange
CTA right · frosted-glass sticky bar**.

1. WoodMart → Header Builder → create header **"Gravity"**, structure:
   - One main row, height ~64px. Row background: **transparent/none** and
     "Full width: off" — the skin paints the frosted-glass background and the
     scroll shadow itself.
   - **Left:** Logo element → upload `assets/img/gravity.svg` from the child
     theme (Media library; SVG upload is enabled). Height ≈ 40–44px.
   - **Center:** Main menu element. Design "Text", no underline hover effect
     (the skin kills underlines anyway), spacing ~12px.
   - **Right:** ① Text/Button element: `📞 +91 78893 62386` → link
     `tel:+917889362386`, style "text". ② Button element: label
     **"Book a free demo"**, link `https://www.gogravity.in/admissions`,
     color Primary — the skin renders it orange/navy with the hover flip.
   - **Mobile:** logo + burger (drawer styling is covered by the skin).
2. Enable **Sticky header** on the main row ("sticky on scroll", no shrink
   needed). The skin adds the soft shadow when stuck.
3. Assign the header globally (Header Builder → set as default).

### Menu (Appearance → Menus → "Primary")

Mixed local/remote — absolute URLs go back to the Next.js site:

| Label | URL |
|---|---|
| Courses | `https://www.gogravity.in/courses` |
| About | `https://www.gogravity.in/about` |
| Gallery | `https://www.gogravity.in/gallery` |
| Blog | `/blog/` (this WP site) |
| Shop | `/shop/` (this WP site) |
| Contact | `https://www.gogravity.in/contact` |

(Ordering mirrors the Next.js nav with Blog/Shop slotted in. The Next.js
mega-menu is not reproducible in a stock menu — a flat "Courses" link is the
agreed simplification; optionally add the six programs as dropdown children
using `https://www.gogravity.in/programs/<slug>`.)

## 4. Footer

1. Dashboard → **HTML Blocks** → Add New → title "Gravity Footer".
2. Add a single **HTML** (Custom HTML) element/widget and paste the entire
   contents of [`html-blocks/footer.html`](html-blocks/footer.html). No extra
   styling needed — `gravity-skin.css` §13 styles all `gv-*` classes and also
   paints WoodMart's footer wrappers navy so there's no white seam.
3. Theme Settings → Footer:
   - Footer layout → **HTML Block** → select "Gravity Footer".
   - **Disable** the default footer widgets and the "copyrights" bar (the
     block includes its own © row) — or leave copyrights on; it's skinned
     navy either way.

## 5. Blog page

1. Pages → Add New → "Blog" (slug `blog`); Settings → Reading → Posts page = Blog.
2. Theme Settings → Blog → Blog archive:
   - Design: **Default** (cards) or **Masonry first wide off**, 2–3 columns
     desktop, gap ~30px.
   - Show: image, title, date, categories, excerpt (~25 words), read-more.
   - Hide: author avatar, views/likes counters (not part of the brand).
3. Page title/breadcrumbs: leave WoodMart's page title **enabled** — the skin
   turns it into the navy hero with the grid motif and orange glow, matching
   the Next.js interior pages (`PageHeader.tsx`).
4. Single post: sidebar **off** (centered 70ch prose, like the frontend),
   related posts on if desired — cards inherit the brand styling.

## 6. WooCommerce

Product cards, prices, badges, tabs, notices, cart/checkout buttons are all
skinned (orange primary actions with the navy hover-flip). Remaining setup is
functional, not visual:

- Keep **catalog mode** on until payments launch (see main README §Payments).
- Product category slugs must match the frontend's program slugs
  (`foundation`, `test-prep`, `jee-foundation`, `neet-foundation`,
  `olympiads`, `subject-coaching`) — the Next.js CTAs deep-link to
  `…/product-category/<slug>`.

## 7. Frontend side (Next.js) — two small follow-ups

1. Point the frontend at this shop: in Vercel set
   `NEXT_PUBLIC_WP_SHOP_BASE=https://staging.gravity.sedawk.cloud`
   (currently defaults to `https://www.gogravity.in/shop`).
2. Optionally add **Blog** to the Next.js header nav
   (`src/components/Header.tsx` → `nav` array) linking to
   `https://staging.gravity.sedawk.cloud/blog/` so navigation is symmetric.

## 8. Verify (both surfaces side by side)

- [ ] Fonts: headings Poppins 700 navy, body Inter 17px, eyebrows JetBrains Mono orange.
- [ ] Header: white frosted bar, navy links → orange on hover, orange CTA that flips to navy on hover, soft shadow appears on scroll.
- [ ] Footer: navy, 4 columns, socials flip to orange squares on hover — pixel-match against `www.gogravity.in`.
- [ ] Blog archive: white cards, 16px radius, lift on hover, navy titles → orange.
- [ ] Page titles: navy hero with grid motif, white Poppins heading.
- [ ] Buttons everywhere: 12px radius, orange/navy with hover flip.
- [ ] Mobile: drawer is white with navy links; menu links back to gogravity.in work.
