# CMS Migration Design — Soul Initiation Academy Landing Page

> **Status:** Approved
> **Date:** 2026-03-21
> **Approach:** Blocks + Relationship Collections (Approach 2)

---

## Problem

The landing page (`src/app/page.tsx`) is 1,424 lines with all content hardcoded — headlines, testimonials, FAQs, stats, process phases, and CTAs. This violates CLAUDE.md Architectural Invariant #1: *"Content is CMS-driven. No hardcoded copy in frontend components."*

Payload CMS collections exist (`Pages`, `Testimonials`, `FAQs`, `Offers`, `Media`, `Users`) but are skeletal and not wired to the frontend.

## Goal

Migrate all hardcoded content to Payload CMS, split the monolithic page into composable server/client components, and seed the database so the page renders identically after migration.

---

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CMS model | Blocks + Relationship Collections | Content reusable across future pages; collections managed independently |
| Data fetching | Server Component + Payload local API | SEO-friendly, zero network overhead, type-safe |
| Sitewide content | Payload Global (`SiteConfig`) | Nav, Footer, Marquee are sitewide, not page-specific |
| Guides management | New `Guides` collection | Dynamic — add/remove guides with image, name, bio |
| Content seeding | Seed script via Payload local API | Page works immediately post-migration |
| Testimonials.quote | Downgrade to `textarea` | Single sentences; richText is overkill |
| FAQs.answer | Keep `richText` | Multi-paragraph answers benefit from formatting |

---

## CMS Schema

### Global: `SiteConfig`

| Field | Type | Description |
|-------|------|-------------|
| `siteTitle` | text | "Soul Initiation Academy" |
| `contactEmail` | text | "apply@soulinitiationacademy.com" |
| `copyrightText` | text | Footer copyright line |
| `brandTagline` | text | "A private institution for mature soul-initiation practices." |
| `navLinks` | array | `[{ label: text, url: text, isExternal: checkbox }]` |
| `socialLinks` | array | `[{ platform: select(instagram/linkedin/twitter/youtube), url: text }]` |
| `marqueeRow1` | array | `[{ text: text }]` |
| `marqueeRow2` | array | `[{ text: text }]` |

### Collection: `Guides` (new)

| Field | Type | Description |
|-------|------|-------------|
| `title` | text | Guide name (e.g. "The Art of Listening") |
| `role` | text | e.g. "Orientation Guide" |
| `body` | textarea | Short description |
| `image` | upload → media | Guide photo (optional — gradient placeholder if empty) |
| `order` | number | Display order |

### Collection: `Testimonials` (updated)

| Field | Type | Change |
|-------|------|--------|
| `name` | text | — |
| `role` | text | — |
| `quote` | textarea | Changed from richText |
| `image` | upload → media | — |
| `featured` | checkbox | — |
| `order` | number | — |

### Collection: `FAQs` (unchanged)

question (text), answer (richText), order (number)

### Collection: `Offers` (unchanged)

name, slug, tagline, description (richText), price, ctaLabel, ctaUrl, features (array), isActive

### Collection: `Pages` (rebuilt with blocks)

| Field | Type |
|-------|------|
| `title` | text |
| `slug` | text (unique) |
| `seoTitle` | text |
| `seoDescription` | textarea |
| `blocks` | blocks field (see below) |

### Block Definitions

Each block has `blockType` and its own fields:

**`hero`**
- `headline`: text — "You've Done the Work."
- `subheadline`: text — "But Something in You Knows You Haven't Crossed Yet."
- `statBar`: array → `[{ label: text, value: text }]`
- `ctaLabel`: text
- `ctaUrl`: text
- `backgroundImage`: upload → media

**`marquee`**
- References `SiteConfig.marqueeRow1` and `marqueeRow2` — no fields needed. This block is a signal to render the Marquee using SiteConfig data.

**`splitLeft`** ("Do You Recognize This?")
- `sectionLabel`: text
- `heading`: text
- `body`: text
- `items`: array → `[{ num: text, label: text, body: text }]`
- `image`: upload → media

**`thresholdStatement`** ("It's a Threshold.")
- `sectionLabel`: text
- `headline`: text
- `emphasisWord`: text — "Threshold."
- `quote`: textarea
- `quoteCaption`: text
- `collapseLabel`: text — "The Modern Collapse:"
- `collapseItems`: array → `[{ label: text, body: text }]`

**`splitRight`** ("A structured threshold.")
- `sectionLabel`: text
- `heading`: text
- `body`: text
- `notItems`: array → `[{ text: text }]` — "This is not"
- `isItems`: array → `[{ text: text }]` — "This is"
- `image`: upload → media

**`process`** ("The Arc of Initiation")
- `sectionLabel`: text
- `heading`: text
- `subheading`: text
- `phases`: array → `[{ numeral: text, name: text, body: text }]`

**`whatThisRequires`**
- `sectionLabel`: text
- `heading`: text
- `stats`: array → `[{ label: text, value: text, note: text }]`

**`whoItsFor`**
- `sectionLabel`: text
- `heading`: text
- `items`: array → `[{ text: text }]`
- `image`: upload → media

**`outcomes`** ("What Tends to Change")
- `sectionLabel`: text
- `heading`: text
- `changes`: array → `[{ label: text, body: text }]`

**`guides`**
- `sectionLabel`: text
- `heading`: text
- `guides`: relationship → `guides` collection (hasMany: true)

**`testimonials`**
- `sectionLabel`: text
- `heading`: text
- `testimonials`: relationship → `testimonials` collection (hasMany: true)

**`offer`**
- `sectionLabel`: text
- `heading`: text
- `subheading`: text
- `stepsHeading`: text
- `steps`: array → `[{ label: text, body: text }]`
- `investmentLabel`: text
- `investmentHeadline`: text
- `investmentBody`: text
- `ctaLabel`: text
- `ctaUrl`: text

**`faqs`**
- `sectionLabel`: text
- `heading`: text
- `faqs`: relationship → `faqs` collection (hasMany: true)

**`finalCta`**
- `headline`: text
- `ctaLabel`: text
- `ctaUrl`: text

---

## Architecture

### Data Flow

```
GET /  →  page.tsx (Server Component)
              │
              ├── payload.findGlobal({ slug: 'site-config' })
              ├── payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, depth: 2 })
              │
              ▼
         Block Switcher (maps block.blockType → React component)
              │
              ├── <Nav siteConfig={siteConfig} />
              ├── block.blockType === 'hero'         → <HeroSection {...block} />
              ├── block.blockType === 'marquee'      → <MarqueeSection siteConfig={siteConfig} />
              ├── block.blockType === 'splitLeft'    → <SplitLeftSection {...block} />
              ├── block.blockType === 'testimonials' → <TestimonialsSection {...block} />
              ├── ...etc
              └── <Footer siteConfig={siteConfig} />
```

- `page.tsx` is a **Server Component** — fetches all data server-side
- Each section component is `"use client"` — preserves all GSAP/IntersectionObserver animations
- Props replace hardcoded arrays — animation logic is unchanged
- Payload local API: zero network overhead, runs in-process

### File Structure

```
src/
├── app/
│   └── page.tsx                          ← Server Component (~80 lines)
│
├── components/
│   ├── blocks/                           ← NEW
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeSection.tsx
│   │   ├── SplitLeftSection.tsx
│   │   ├── ThresholdStatementSection.tsx
│   │   ├── SplitRightSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── WhatThisRequiresSection.tsx
│   │   ├── WhoItsForSection.tsx
│   │   ├── OutcomesSection.tsx
│   │   ├── GuidesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── OfferSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── FinalCTASection.tsx
│   ├── Nav.tsx                           ← extracted from page.tsx
│   ├── Footer.tsx                        ← extracted from page.tsx
│   ├── FAQAccordion.tsx                  ← updated to accept props
│   ├── PageLoader.tsx                    ← unchanged
│   └── ScrollIndicator.tsx               ← unchanged
│
├── blocks/                               ← Payload block configs
│   ├── Hero.ts
│   ├── Marquee.ts
│   ├── SplitLeft.ts
│   ├── ThresholdStatement.ts
│   ├── SplitRight.ts
│   ├── Process.ts
│   ├── WhatThisRequires.ts
│   ├── WhoItsFor.ts
│   ├── Outcomes.ts
│   ├── Guides.ts
│   ├── Testimonials.ts
│   ├── Offer.ts
│   ├── FAQs.ts
│   └── FinalCTA.ts
│
├── collections/
│   ├── Pages.ts                          ← rebuilt with blocks field
│   ├── Guides.ts                         ← NEW
│   ├── Testimonials.ts                   ← quote: textarea
│   ├── FAQs.ts                           ← unchanged
│   ├── Offers.ts                         ← unchanged
│   ├── Media.ts                          ← unchanged
│   └── Users.ts                          ← unchanged
│
├── globals/                              ← NEW
│   └── SiteConfig.ts
│
└── scripts/
    └── seed.ts                           ← populates Supabase via Payload local API
```

---

## Seed Script

`src/scripts/seed.ts` — run via `npx tsx src/scripts/seed.ts`

1. Upsert `SiteConfig` global (marquee phrases, nav links, social links, contact email, copyright)
2. Create 3 `Testimonials` documents from current hardcoded quotes
3. Create 6 `FAQs` documents from current `FAQAccordion.tsx`
4. Create 3 `Guides` documents (no images initially — placeholder gradients in component)
5. Create `home` page document with all 14 blocks in order, relationship fields referencing created documents

All current hardcoded content is preserved exactly. The page renders identically post-migration.

---

## Migration Sequence

```
Step 1: Schema layer
  ├── Create src/globals/SiteConfig.ts
  ├── Create src/collections/Guides.ts
  ├── Rebuild src/collections/Pages.ts with blocks field
  ├── Create src/blocks/*.ts (14 block configs)
  ├── Update src/collections/Testimonials.ts (quote → textarea)
  └── Update payload.config.ts (register globals + new collection)

Step 2: Extract section components
  └── Move all 14 inline functions from page.tsx → src/components/blocks/
      Extract Nav and Footer → src/components/
      Each file gets "use client" + typed props interface
      No logic changes — lift, type, export

Step 3: Refactor page.tsx
  └── Remove "use client"
      Add server-side Payload fetches (findGlobal + find)
      Add block switcher
      Import and render section components with CMS data as props

Step 4: Run seed script
  └── Populates Supabase via Payload local API
      Payload handles all table creation/migration automatically

Step 5: Verify
  └── Page renders identically
      All animations intact
      Payload admin shows all content editable
      Content changes in admin reflect on page
```

---

## What NOT to change

- Animation logic (GSAP, ScrollTrigger, IntersectionObserver) — stays exactly as-is
- Visual design, CSS, Tailwind classes — no changes
- `useReveal` hook — moves into a shared hooks file or stays in a client component
- `PageLoader`, `ScrollIndicator` — unchanged
- Image assets in `/public/images/` — stay as static files, referenced by Media collection URLs or fallback paths
