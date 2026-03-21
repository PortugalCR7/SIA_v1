# CMS Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all hardcoded landing page content to Payload CMS with typed blocks, seed the database, and refactor page.tsx into a Server Component that renders `"use client"` section components.

**Architecture:** Two parallel workstreams — **Backend** (CMS schema, globals, block configs, seed script) and **Frontend** (component extraction, page.tsx refactor, RevealProvider). Backend has no frontend dependencies. Frontend depends on backend types being generated but can proceed with extraction in parallel. A final integration task merges both.

**Tech Stack:** Next.js 14 (App Router), Payload CMS v3, Supabase (Postgres), TypeScript, GSAP, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-21-cms-migration-design.md`

---

## Parallel Workstream Map

```
BACKEND (Agent A)                         FRONTEND (Agent B)
─────────────────                         ──────────────────
Task 1: SiteConfig global                 Task 6: Extract shared components
Task 2: Guides collection                     (NavMonogram, RevealProvider)
Task 3: Update Testimonials               Task 7: Extract Nav + Footer
Task 4: Create 14 block configs           Task 8: Extract 14 section components
Task 5: Rebuild Pages collection              (copy from page.tsx, add typed props)
    ↓                                     Task 9: Extract FAQAccordion to accept props
Task 10: Seed script                          ↓
    ↓                                         ↓
    └──────────── MERGE ──────────────────────┘
                    ↓
            Task 11: Refactor page.tsx (Server Component + block switcher)
            Task 12: Generate Payload migration + verify
            Task 13: Run seed script + final verification
```

Tasks 1-5 (Backend) and Tasks 6-9 (Frontend) run **in parallel**.
Tasks 10-13 run **sequentially** after both streams complete.

---

## Chunk 1: Backend — CMS Schema Layer

### Task 1: Create SiteConfig Global

**Files:**
- Create: `src/globals/SiteConfig.ts`
- Modify: `payload.config.ts`

- [ ] **Step 1: Create the SiteConfig global**

```ts
// src/globals/SiteConfig.ts
import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      defaultValue: 'Soul Initiation Academy',
    },
    {
      name: 'contactEmail',
      type: 'text',
      required: true,
    },
    {
      name: 'copyrightText',
      type: 'text',
    },
    {
      name: 'establishedLine',
      type: 'text',
      admin: {
        description: 'Decorative text e.g. "444 · EST. MMXXIV"',
      },
    },
    {
      name: 'brandTagline',
      type: 'textarea',
    },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'isExternal',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'marqueeRow1',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'marqueeRow2',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
  ],
}
```

- [ ] **Step 2: Register SiteConfig in payload.config.ts**

Add the import and `globals` array:

```ts
// Add import at top
import { SiteConfig } from '@/globals/SiteConfig'

// Add globals key to buildConfig
export default buildConfig({
  // ... existing config
  globals: [SiteConfig],
  // ...
})
```

- [ ] **Step 3: Commit**

```bash
git add src/globals/SiteConfig.ts payload.config.ts
git commit -m "feat(cms): add SiteConfig global for nav, footer, marquee content"
```

---

### Task 2: Create Guides Collection

**Files:**
- Create: `src/collections/Guides.ts`
- Modify: `payload.config.ts`

- [ ] **Step 1: Create the Guides collection**

```ts
// src/collections/Guides.ts
import type { CollectionConfig } from 'payload'

export const Guides: CollectionConfig = {
  slug: 'guides',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'role', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'e.g. "Orientation Guide", "Mapping Guide"',
      },
    },
    {
      name: 'body',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
```

- [ ] **Step 2: Register in payload.config.ts**

```ts
import { Guides } from '@/collections/Guides'

// Add Guides to collections array
collections: [Pages, Offers, Testimonials, FAQs, Guides, Media, Users],
```

- [ ] **Step 3: Commit**

```bash
git add src/collections/Guides.ts payload.config.ts
git commit -m "feat(cms): add Guides collection for threshold documents"
```

---

### Task 3: Update Testimonials Collection

**Files:**
- Modify: `src/collections/Testimonials.ts`

- [ ] **Step 1: Change quote field from richText to textarea**

In `src/collections/Testimonials.ts`, replace:
```ts
    {
      name: 'quote',
      type: 'richText',
      required: true,
    },
```

With:
```ts
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
```

- [ ] **Step 2: Commit**

```bash
git add src/collections/Testimonials.ts
git commit -m "refactor(cms): change Testimonials.quote from richText to textarea"
```

---

### Task 4: Create 14 Payload Block Configs

**Files:**
- Create: `src/blocks/Hero.ts`
- Create: `src/blocks/Marquee.ts`
- Create: `src/blocks/SplitLeft.ts`
- Create: `src/blocks/ThresholdStatement.ts`
- Create: `src/blocks/SplitRight.ts`
- Create: `src/blocks/Process.ts`
- Create: `src/blocks/WhatThisRequires.ts`
- Create: `src/blocks/WhoItsFor.ts`
- Create: `src/blocks/Outcomes.ts`
- Create: `src/blocks/GuidesBlock.ts`
- Create: `src/blocks/TestimonialsBlock.ts`
- Create: `src/blocks/Offer.ts`
- Create: `src/blocks/FAQsBlock.ts`
- Create: `src/blocks/FinalCTA.ts`

- [ ] **Step 1: Create Hero block**

```ts
// src/blocks/Hero.ts
import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'sectionLabel', type: 'text', defaultValue: 'Soul Initiation Academy' },
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'text' },
    {
      name: 'statBar',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    {
      name: 'backgroundVideoMp4',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional MP4 video for hero background' },
    },
    {
      name: 'backgroundVideoWebm',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional WebM video for hero background' },
    },
  ],
}
```

- [ ] **Step 2: Create Marquee block**

```ts
// src/blocks/Marquee.ts
import type { Block } from 'payload'

export const Marquee: Block = {
  slug: 'marquee',
  labels: { singular: 'Marquee Ticker', plural: 'Marquee Tickers' },
  fields: [],
  // Marquee data comes from SiteConfig global — this block is a placement signal
}
```

- [ ] **Step 3: Create SplitLeft block**

```ts
// src/blocks/SplitLeft.ts
import type { Block } from 'payload'

export const SplitLeft: Block = {
  slug: 'splitLeft',
  labels: { singular: 'Split Left', plural: 'Split Lefts' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'num', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'text' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
```

- [ ] **Step 4: Create ThresholdStatement block**

```ts
// src/blocks/ThresholdStatement.ts
import type { Block } from 'payload'

export const ThresholdStatement: Block = {
  slug: 'thresholdStatement',
  labels: { singular: 'Threshold Statement', plural: 'Threshold Statements' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'emphasisWord', type: 'text', admin: { description: 'The word that gets gold emphasis, e.g. "Threshold."' } },
    { name: 'quote', type: 'textarea' },
    { name: 'quoteCaption', type: 'text' },
    { name: 'collapseLabel', type: 'text', defaultValue: 'The Modern Collapse:' },
    {
      name: 'collapseItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'text' },
      ],
    },
  ],
}
```

- [ ] **Step 5: Create SplitRight block**

```ts
// src/blocks/SplitRight.ts
import type { Block } from 'payload'

export const SplitRight: Block = {
  slug: 'splitRight',
  labels: { singular: 'Split Right', plural: 'Split Rights' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'notItems',
      type: 'array',
      admin: { description: '"This is not" items' },
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'isItems',
      type: 'array',
      admin: { description: '"This is" items' },
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
```

- [ ] **Step 6: Create Process block**

```ts
// src/blocks/Process.ts
import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  labels: { singular: 'Process', plural: 'Processes' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    {
      name: 'phases',
      type: 'array',
      fields: [
        { name: 'numeral', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'body', type: 'text' },
      ],
    },
  ],
}
```

- [ ] **Step 7: Create WhatThisRequires block**

```ts
// src/blocks/WhatThisRequires.ts
import type { Block } from 'payload'

export const WhatThisRequires: Block = {
  slug: 'whatThisRequires',
  labels: { singular: 'What This Requires', plural: 'What This Requires' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'note', type: 'text' },
      ],
    },
  ],
}
```

- [ ] **Step 8: Create WhoItsFor block**

```ts
// src/blocks/WhoItsFor.ts
import type { Block } from 'payload'

export const WhoItsFor: Block = {
  slug: 'whoItsFor',
  labels: { singular: 'Who It\'s For', plural: 'Who It\'s For' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
```

- [ ] **Step 9: Create Outcomes block**

```ts
// src/blocks/Outcomes.ts
import type { Block } from 'payload'

export const Outcomes: Block = {
  slug: 'outcomes',
  labels: { singular: 'Outcomes', plural: 'Outcomes' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'changes',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'text' },
      ],
    },
  ],
}
```

- [ ] **Step 10: Create GuidesBlock**

```ts
// src/blocks/GuidesBlock.ts
import type { Block } from 'payload'

export const GuidesBlock: Block = {
  slug: 'guides',
  labels: { singular: 'Guides Section', plural: 'Guides Sections' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'guides',
      type: 'relationship',
      relationTo: 'guides',
      hasMany: true,
    },
  ],
}
```

- [ ] **Step 11: Create TestimonialsBlock**

```ts
// src/blocks/TestimonialsBlock.ts
import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials Section', plural: 'Testimonials Sections' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
  ],
}
```

- [ ] **Step 12: Create Offer block**

```ts
// src/blocks/Offer.ts
import type { Block } from 'payload'

export const Offer: Block = {
  slug: 'offer',
  labels: { singular: 'Offer', plural: 'Offers' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'stepsHeading', type: 'text', defaultValue: 'The next step' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'text' },
      ],
    },
    { name: 'investmentLabel', type: 'text', defaultValue: 'Investment' },
    { name: 'investmentHeadline', type: 'text' },
    { name: 'investmentBody', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
  ],
}
```

- [ ] **Step 13: Create FAQsBlock**

```ts
// src/blocks/FAQsBlock.ts
import type { Block } from 'payload'

export const FAQsBlock: Block = {
  slug: 'faqs',
  labels: { singular: 'FAQ Section', plural: 'FAQ Sections' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
  ],
}
```

- [ ] **Step 14: Create FinalCTA block**

```ts
// src/blocks/FinalCTA.ts
import type { Block } from 'payload'

export const FinalCTA: Block = {
  slug: 'finalCta',
  labels: { singular: 'Final CTA', plural: 'Final CTAs' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
  ],
}
```

- [ ] **Step 15: Commit all blocks**

```bash
git add src/blocks/
git commit -m "feat(cms): add 14 Payload block configs for landing page sections"
```

---

### Task 5: Rebuild Pages Collection with Blocks

**Files:**
- Modify: `src/collections/Pages.ts`

- [ ] **Step 1: Rewrite Pages.ts with blocks field**

Replace the entire file:

```ts
// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'

import { Hero } from '@/blocks/Hero'
import { Marquee } from '@/blocks/Marquee'
import { SplitLeft } from '@/blocks/SplitLeft'
import { ThresholdStatement } from '@/blocks/ThresholdStatement'
import { SplitRight } from '@/blocks/SplitRight'
import { Process } from '@/blocks/Process'
import { WhatThisRequires } from '@/blocks/WhatThisRequires'
import { WhoItsFor } from '@/blocks/WhoItsFor'
import { Outcomes } from '@/blocks/Outcomes'
import { GuidesBlock } from '@/blocks/GuidesBlock'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock'
import { Offer } from '@/blocks/Offer'
import { FAQsBlock } from '@/blocks/FAQsBlock'
import { FinalCTA } from '@/blocks/FinalCTA'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path — e.g. "home", "about"',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        Hero,
        Marquee,
        SplitLeft,
        ThresholdStatement,
        SplitRight,
        Process,
        WhatThisRequires,
        WhoItsFor,
        Outcomes,
        GuidesBlock,
        TestimonialsBlock,
        Offer,
        FAQsBlock,
        FinalCTA,
      ],
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/collections/Pages.ts
git commit -m "feat(cms): rebuild Pages collection with typed blocks field"
```

---

## Chunk 2: Frontend — Component Extraction

> **These tasks run IN PARALLEL with Chunk 1.** No backend dependency.

### Task 6: Extract Shared Components

**Files:**
- Create: `src/components/NavMonogram.tsx`
- Create: `src/components/RevealProvider.tsx`

- [ ] **Step 1: Extract NavMonogram**

Copy the `NavMonogram` function from `page.tsx` (lines 45-71) into its own file:

```tsx
// src/components/NavMonogram.tsx
export default function NavMonogram({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Soul Initiation Academy"
    >
      <path
        d="M4 47V20C4 11.163 11.163 4 20 4C28.837 4 36 11.163 36 20V47"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M12 47V22C12 17.582 15.582 14 20 14C24.418 14 28 17.582 28 22V47"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <line x1="4" y1="47" x2="36" y2="47" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="8" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
```

- [ ] **Step 2: Create RevealProvider**

```tsx
// src/components/RevealProvider.tsx
"use client";

import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-fade, .stat-line");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    els.forEach((el) => {
      io.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("in");
      }
    });

    return () => io.disconnect();
  }, []);
}

export default function RevealProvider({ children }: { children: React.ReactNode }) {
  useReveal();
  return <>{children}</>;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/NavMonogram.tsx src/components/RevealProvider.tsx
git commit -m "feat(ui): extract NavMonogram and RevealProvider as shared components"
```

---

### Task 7: Extract Nav and Footer

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Nav.tsx**

Copy the `Nav` function from `page.tsx` (comment anchor: `// ── NAV ──`). Replace `NavMonogram` inline with the extracted import. Replace hardcoded brand name with `siteTitle` prop. Add optional `navLinks` that render before the Apply CTA. **Preserve all existing animation logic exactly** — the `btn-fill` slide, scrolled state, and conditional classes.

```tsx
// src/components/Nav.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import NavMonogram from "@/components/NavMonogram";

interface NavLink {
  label: string;
  url: string;
  isExternal: boolean;
}

interface NavProps {
  siteTitle: string;
  navLinks?: NavLink[];
}

export default function Nav({ siteTitle, navLinks = [] }: NavProps) {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const isScrolled = window.scrollY > 80;
      el.classList.toggle("nav-solid", isScrolled);
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-6 transition-[background-color,border-color] duration-500 backdrop-blur-md"
    >
      <a href="#" className="flex items-center gap-4 text-parchment no-underline">
        <NavMonogram className="w-7 h-auto" />
        <span className="overline text-parchment font-semibold tracking-[0.35em] hidden md:inline">
          {siteTitle}
        </span>
      </a>
      <div className="flex items-center gap-6">
        {navLinks.map(({ label, url, isExternal }) => (
          <a
            key={url}
            href={url}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="overline text-parchment/60 hover:text-parchment transition-colors duration-300 hidden md:inline font-bold no-underline"
          >
            {label}
          </a>
        ))}
        <a
          href="#apply"
          className={`overline btn-fill px-8 py-3.5 border-b font-bold transition-[background-color,color,border-color] duration-500 cursor-pointer no-underline ${
            scrolled
              ? "bg-parchment text-ink border-parchment/30"
              : "border-parchment/30 text-parchment hover:text-ink hover:border-parchment"
          }`}
        >
          <span
            className="absolute inset-0 bg-parchment"
            style={{
              transform: scrolled ? "translateX(0)" : "translateX(-102%)",
              transition: "transform 0.5s var(--expo-out)",
            }}
            aria-hidden
          />
          <span className="relative z-10">Apply Now</span>
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create Footer.tsx**

Copy the `Footer` function from `page.tsx` (comment anchor: `// ── FOOTER ──`). Add typed props for siteConfig data. Include all four social platforms in the icon map.

```tsx
// src/components/Footer.tsx
"use client";

import NavMonogram from "@/components/NavMonogram";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterProps {
  siteTitle: string;
  brandTagline: string;
  contactEmail: string;
  establishedLine: string;
  copyrightText: string;
  socialLinks?: SocialLink[];
}

// Social icon SVGs by platform — covers all 4 options in SiteConfig select field
const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M4 4l16 16M4 20L20 4"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3"/>
      <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
    </svg>
  ),
};

export default function Footer({ siteTitle, brandTagline, contactEmail, establishedLine, copyrightText, socialLinks = [] }: FooterProps) {
  return (
    <>
      <div className="bg-ink flex justify-center py-10">
        <NavMonogram className="w-8 h-10 text-parchment" style={{ opacity: 0.15 }} aria-hidden="true" />
      </div>
      <footer className="bg-ink text-parchment pt-16 pb-12 px-6 md:px-14 border-t border-parchment/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-24">
            <div>
              <p className="font-heading text-2xl mb-8 font-bold">{siteTitle.toUpperCase()}</p>
              <p className="text-parchment/40 font-medium">{brandTagline}</p>
            </div>
            <div>
              <p className="overline text-white/20 font-bold mb-8">Contact</p>
              <a href={`mailto:${contactEmail}`} className="text-parchment/60 hover:text-parchment font-bold underline decoration-parchment/20 underline-offset-8">{contactEmail}</a>
            </div>
            <div className="flex flex-col justify-between gap-10">
              <p className="text-parchment/20 uppercase tracking-[0.3em] font-bold">{establishedLine}</p>
              <div className="flex items-center gap-6">
                {socialLinks.map(({ platform, url }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="text-parchment/30 hover:text-parchment transition-colors duration-300"
                  >
                    {socialIcons[platform] || null}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-12 text-center md:text-left">
            <p className="text-parchment/30 uppercase tracking-widest font-bold">{copyrightText}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx src/components/Footer.tsx
git commit -m "feat(ui): extract Nav and Footer as standalone client components with typed props"
```

---

### Task 8: Extract 14 Section Components

**Files:** Create one file per section in `src/components/blocks/`:

Each section component is extracted by:
1. Copying the function from `page.tsx`
2. Adding `"use client"` at the top
3. Converting hardcoded data to typed props
4. Keeping all animation logic, GSAP, IntersectionObserver, CSS exactly as-is
5. Exporting as default

**This task has 14 subtasks — one per section component. Each follows the same pattern. The agent should read the corresponding function from `page.tsx`, identify all hardcoded strings/arrays, convert them to props, and write the file.**

> **Navigation note:** Use `page.tsx` comment anchors (e.g. `// ── HERO ──`) to locate functions — do NOT use line numbers, they drift. All anchors follow the `// ── SECTION NAME ──` pattern.

- [ ] **Step 1: Create HeroSection.tsx** — extract `HeroHeadline`, `HeroStatBar`, `Hero` from anchor `// ── HERO HEADLINE ──` through end of `// ── HERO ──`. Props: `{ sectionLabel, headline, subheadline, statBar, ctaLabel, ctaUrl, backgroundImage, backgroundVideoMp4?, backgroundVideoWebm? }`. Note: `backgroundVideoMp4`/`backgroundVideoWebm` are future-facing fields with no current JSX — accept them as optional props but do not add video JSX yet. Keep `ScrollIndicator` and `PageLoader` as imported components (not extracted here).

- [ ] **Step 2: Create MarqueeSection.tsx** — extract `Marquee` from anchor `// ── MARQUEE TICKER ──`. Props: `{ row1: string[], row2: string[] }`.

- [ ] **Step 3: Create SplitLeftSection.tsx** — extract `SplitLeft` from anchor `// ── SPLIT LEFT ──`. Props: `{ sectionLabel, heading, body, items: { num: string, label: string, body: string }[], image? }`.

- [ ] **Step 4: Create ThresholdStatementSection.tsx** — extract `ThresholdStatement` from anchor `// ── THRESHOLD STATEMENT ──`. Props: `{ sectionLabel, headline, emphasisWord, quote, quoteCaption, collapseLabel, collapseItems: { label: string, body: string }[] }`.

- [ ] **Step 5: Create SplitRightSection.tsx** — extract `SplitRight` from anchor `// ── SPLIT RIGHT ──`. Props: `{ sectionLabel, heading, body, notItems: { text: string }[], isItems: { text: string }[], image? }`.

- [ ] **Step 6: Create ProcessSection.tsx** — extract `Process` from anchor `// ── PROCESS ──`. Props: `{ sectionLabel, heading, subheading, phases: { numeral: string, name: string, body: string }[] }`.

- [ ] **Step 7: Create WhatThisRequiresSection.tsx** — extract `WhatThisRequires` + `StatCard` + `getStatBorderClasses` from anchors `// ── WHAT THIS REQUIRES — helpers ──` and `// ── WHAT THIS REQUIRES ──`. Props: `{ sectionLabel, heading, stats: { label: string, value: string, note: string }[] }`. The `StatCard` component uses the map index for `getStatBorderClasses(i)` — pass the array index, not any `order` field.

- [ ] **Step 8: Create WhoItsForSection.tsx** — extract `WhoItsFor` from anchor `// ── WHO IT'S FOR ──`. Props: `{ sectionLabel, heading, items: { text: string }[], image? }`.

- [ ] **Step 9: Create OutcomesSection.tsx** — extract `Outcomes` from anchor `// ── OUTCOMES ──`. Props: `{ sectionLabel, heading, changes: { label: string, body: string }[] }`.

- [ ] **Step 10: Create GuidesSection.tsx** — extract `Guides` from anchor `// ── GUIDES ──`. Props: `{ sectionLabel, heading, guides: { title: string, role: string, body: string, image?: any }[] }` — relationship is already populated at `depth: 2`.

- [ ] **Step 11: Create TestimonialsSection.tsx** — extract `Testimonials` from anchor `// ── TESTIMONIALS ──`. Props: `{ sectionLabel, heading, testimonials: { quote: string, name: string, role: string }[] }`.

- [ ] **Step 12: Create OfferSection.tsx** — extract `Offer` from anchor `// ── OFFER ──`. Props: `{ sectionLabel, heading, subheading, stepsHeading, steps: { label: string, body: string }[], investmentLabel, investmentHeadline, investmentBody, ctaLabel, ctaUrl }`.

- [ ] **Step 13: Create FAQSection.tsx** — extract `FAQ` from anchor `// ── FAQ ──`. Props: `{ sectionLabel, heading, faqs: { question: string, answer: string[] }[] }`. Pass faqs to FAQAccordion explicitly: `<FAQAccordion faqs={faqs} />`.

- [ ] **Step 14: Create FinalCTASection.tsx** — extract `FinalCTA` from anchor `// ── FINAL CTA ──`. Props: `{ sectionLabel, headline, body?, ctaLabel, ctaUrl }`.

- [ ] **Step 15: Commit all section components**

```bash
git add src/components/blocks/
git commit -m "feat(ui): extract 14 section components from page.tsx with typed CMS props"
```

---

### Task 9: Update FAQAccordion to Accept Props

**Files:**
- Modify: `src/components/FAQAccordion.tsx`

- [ ] **Step 1: Refactor FAQAccordion to accept faqs as props**

Remove the hardcoded `const faqs = [...]` array at the top and replace the entire file with the following. The JSX is identical to the source — only the data source changes from hardcoded to props:

```tsx
// src/components/FAQAccordion.tsx
"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string[];
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {faqs.map(({ question, answer }, i) => (
        <div key={i} className="border-t border-ink/[0.08]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-8 py-7 text-left group cursor-pointer"
            aria-expanded={open === i}
          >
            <span className="font-heading text-[1.25rem] md:text-[1.4375rem] text-ink leading-snug group-hover:text-sage transition-colors duration-300">
              {question}
            </span>
            <span className="relative flex-shrink-0 mt-2 w-4 h-4" aria-hidden>
              <span className="absolute top-1/2 left-0 w-full h-px bg-gold -translate-y-1/2 opacity-50 group-hover:opacity-90 transition-opacity" />
              <span
                className="absolute top-1/2 left-1/2 w-px h-full bg-gold -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-300 opacity-50 group-hover:opacity-90"
                style={{ transform: open === i ? "translate(-50%,-50%) scaleY(0)" : "translate(-50%,-50%) scaleY(1)" }}
              />
            </span>
          </button>
          <div
            className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ maxHeight: open === i ? "480px" : "0px", opacity: open === i ? 1 : 0 }}
          >
            <div className="border-l-2 border-gold/25 pl-6 pb-8 max-w-2xl space-y-3">
              {answer.map((para, j) => (
                <p key={j} className="font-body text-[0.9375rem] text-ink/60 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-ink/[0.08]" />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FAQAccordion.tsx
git commit -m "refactor(ui): FAQAccordion now accepts faqs as props instead of hardcoded data"
```

---

## Chunk 3: Integration — Wire Everything Together

> **Sequential.** Depends on both Chunk 1 and Chunk 2 being complete.

### Task 10: Write Seed Script

**Files:**
- Create: `src/scripts/seed.ts`

- [ ] **Step 1: Write the seed script**

The seed script uses Payload's local API to create all content. It is **idempotent** — safe to run multiple times. Each collection checks for existing documents before creating. The home page is created last with all relationship IDs inline (single-step, no update pass needed).

**Lexical JSON note:** The `FAQs.answer` field is `richText` (Lexical editor). Every node requires `type`, `version`, `direction`, `format`, and `indent`. Paragraph nodes use `type: 'paragraph'`. Text nodes use `type: 'text'`.

```ts
// src/scripts/seed.ts
import { getPayload } from 'payload'
import config from '@payload-config'

// Helper: build a properly-structured Lexical richText value from plain paragraph strings
function makeLexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        children: [{ type: 'text', version: 1, text }],
      })),
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding SiteConfig...')
  await payload.updateGlobal({
    slug: 'site-config',
    data: {
      siteTitle: 'Soul Initiation Academy',
      contactEmail: 'apply@soulinitiationacademy.com',
      copyrightText: '\u00A9 2026 Soul Initiation Arc \u00B7 All rites reserved.',
      establishedLine: '444 \u00B7 EST. MMXXIV',
      brandTagline: 'A private institution for mature soul-initiation practices.',
      navLinks: [],
      socialLinks: [
        { platform: 'instagram', url: 'https://www.instagram.com/soulinitiationacademy' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/soulinitiationacademy' },
      ],
      marqueeRow1: [
        { text: 'Soul Initiation Academy' },
        { text: 'Cross the Threshold' },
        { text: 'Six Months \u00B7 Cohort of 8' },
        { text: 'April 2026' },
        { text: 'Application Required' },
        { text: 'A Guided Crossing' },
        { text: 'Not a Course. A Rite of Passage.' },
      ],
      marqueeRow2: [
        { text: 'Separation \u00B7 Descent \u00B7 Threshold \u00B7 Return' },
        { text: 'The Work Beneath the Work' },
        { text: 'Soul. Not Ego.' },
        { text: 'Cohort VIII \u00B7 April MMXXVI' },
        { text: 'What Cannot Be Rushed' },
        { text: 'Witness. Hold. Guide.' },
        { text: 'The Crossing Begins' },
      ],
    },
  })

  // Idempotency: skip if already seeded
  console.log('Seeding Testimonials...')
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
  let testimonialDocs: any[] = []
  if (existingTestimonials.totalDocs > 0) {
    console.log('  Testimonials already seeded — loading existing IDs')
    const all = await payload.find({ collection: 'testimonials', limit: 10 })
    testimonialDocs = all.docs
  } else {
    const testimonials = [
      { quote: 'I didn\u2019t need more insight. I needed a way to move.', name: 'S.M.', role: 'Executive, Cohort 2024', order: 1 },
      { quote: 'Something shifted \u2014 from the root, not the surface.', name: 'A.R.', role: 'Architect, Cape Town', order: 2 },
      { quote: 'It gave me a way to stay with what I was sensing.', name: 'J.K.', role: 'Therapist, Cohort 2025', order: 3 },
    ]
    for (const t of testimonials) {
      const doc = await payload.create({ collection: 'testimonials', data: t })
      testimonialDocs.push(doc)
    }
  }

  console.log('Seeding FAQs...')
  const existingFAQs = await payload.find({ collection: 'faqs', limit: 1 })
  let faqDocs: any[] = []
  if (existingFAQs.totalDocs > 0) {
    console.log('  FAQs already seeded — loading existing IDs')
    const all = await payload.find({ collection: 'faqs', limit: 10 })
    faqDocs = all.docs
  } else {
    const faqData = [
      {
        question: 'How is this different from other coaching or transformation programs?',
        paragraphs: [
          'Most programs work on the level of behavior, mindset, or strategy. Soul Initiation works at the level of identity and soul.',
          'We are not here to optimize who you are \u2014 we are here to help you discover who you actually are beneath the roles, the achievements, and the constructed self.',
        ],
        order: 1,
      },
      {
        question: 'Is this a spiritual or religious program?',
        paragraphs: [
          'Soul Initiation Academy is not affiliated with any religion. We draw on the archetypal wisdom present across many traditions \u2014 but the work is experiential, not doctrinal.',
          'You bring your own cosmology. We simply create the depth of container for it to be lived.',
        ],
        order: 2,
      },
      {
        question: 'Do I need to have done therapy or previous inner work?',
        paragraphs: [
          'This program is designed for people who have already done meaningful inner work \u2014 therapy, retreat, ceremony, mentorship. This is not an entry-level offering.',
          'If you are new to personal development, we recommend beginning there first. This is for those who have already been walking the path.',
        ],
        order: 3,
      },
      {
        question: 'What is the time commitment?',
        paragraphs: [
          'Weekly group sessions run 90 minutes. We recommend an additional 1\u20132 hours per week for reflection, journaling, and integration.',
          'Depth requires space. The program runs for six months.',
        ],
        order: 4,
      },
      {
        question: 'What happens after I apply?',
        paragraphs: [
          'We will reach out within 3 business days to schedule a conversation.',
          'This call is not a sales call \u2014 it is a genuine exploration of whether this program and cohort are the right fit for you at this moment. Mutual discernment matters to us.',
        ],
        order: 5,
      },
      {
        question: 'Why only 8 initiates per cohort?',
        paragraphs: [
          'The depth this work requires cannot happen in a large group. Eight people is deliberate.',
          'It creates the intimacy, safety, and collective field necessary for genuine initiation. Every cohort becomes its own sacred container.',
        ],
        order: 6,
      },
    ]
    for (const f of faqData) {
      const doc = await payload.create({
        collection: 'faqs',
        data: { question: f.question, answer: makeLexical(f.paragraphs), order: f.order },
      })
      faqDocs.push(doc)
    }
  }

  console.log('Seeding Guides...')
  const existingGuides = await payload.find({ collection: 'guides', limit: 1 })
  let guideDocs: any[] = []
  if (existingGuides.totalDocs > 0) {
    console.log('  Guides already seeded — loading existing IDs')
    const all = await payload.find({ collection: 'guides', limit: 10 })
    guideDocs = all.docs
  } else {
    const guidesData = [
      { title: 'The Art of Listening', role: 'Orientation Guide', body: 'A practice for meeting the silence before a crossing.', order: 1 },
      { title: 'Archetypal Descent', role: 'Mapping Guide', body: 'Exploration of patterns when identity shifts.', order: 2 },
      { title: 'Ritual & Threshold', role: 'Ceremony Guide', body: 'Foundational structures for marking transitions.', order: 3 },
    ]
    for (const g of guidesData) {
      const doc = await payload.create({ collection: 'guides', data: g })
      guideDocs.push(doc)
    }
  }

  // Idempotency: skip home page if already exists
  console.log('Seeding Home page...')
  const existingHome = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
  if (existingHome.totalDocs > 0) {
    console.log('  Home page already seeded — skipping.')
    console.log('Seed complete!')
    process.exit(0)
  }

  // Create page with relationship IDs inline (single step — no update pass needed)
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      seoTitle: 'Soul Initiation Academy — Cross the Threshold',
      seoDescription: 'A six-month rite of passage for successful but unfulfilled visionaries seeking breakthrough. Not a course. A crossing.',
      blocks: [
        {
          blockType: 'hero',
          sectionLabel: 'Soul Initiation Academy',
          headline: "You've Done the Work.",
          subheadline: "But Something in You Knows You Haven\u2019t Crossed Yet.",
          statBar: [
            { label: 'Cohort', value: '8' },
            { label: 'Duration', value: '6 Months' },
            { label: 'Begins', value: 'April 2026' },
          ],
          ctaLabel: 'Begin Your Application',
          ctaUrl: '#apply',
        },
        { blockType: 'marquee' },
        {
          blockType: 'splitLeft',
          sectionLabel: 'Do You Recognize This?',
          heading: 'There are moments when something begins to shift beneath the surface.',
          body: 'From the outside, things may still look intact. But internally, the structure that once held you no longer quite does.',
          items: [
            { num: '01', label: 'You\u2019ve outgrown something', body: 'A way of living that once fit \u2014 and no longer does.' },
            { num: '02', label: 'Something larger is asking to move through you', body: 'A sense of pressure that isn\u2019t anxiety \u2014 it\u2019s calling.' },
            { num: '03', label: 'You\u2019re between identities', body: 'Without language for where you are \u2014 but knowing you can\u2019t go back.' },
            { num: '04', label: 'You\u2019re not looking to be convinced', body: 'You already feel this. You\u2019re trying to understand what to do.' },
          ],
        },
        {
          blockType: 'thresholdStatement',
          sectionLabel: 'This Is Not Confusion',
          headline: "It's a",
          emphasisWord: 'Threshold.',
          quote: 'A genuine life threshold is not a problem to be solved. It is a passage to be moved through.',
          quoteCaption: 'In traditional cultures, these crossings were marked, held, and guided. In modern life, they rarely are.',
          collapseLabel: 'The Modern Collapse:',
          collapseItems: [
            { label: 'Prolonged uncertainty', body: 'The waiting stretches without forward movement.' },
            { label: 'Looping reflection', body: 'The same questions cycling without resolution.' },
            { label: 'Quiet stagnation', body: 'Something real is happening without being named.' },
          ],
        },
        {
          blockType: 'splitRight',
          sectionLabel: 'The Soul Initiation Program',
          heading: 'A structured threshold.',
          body: 'A six-month container \u2014 not a course, not a retreat, not coaching. A rite of passage.',
          notItems: [
            { text: 'A course or curriculum' },
            { text: 'Coaching or therapy' },
            { text: 'A peak experience' },
            { text: 'A guaranteed outcome' },
          ],
          isItems: [
            { text: 'A rite of passage' },
            { text: 'A guided crossing' },
            { text: 'A space for identity shift' },
            { text: 'Lived, structured' },
          ],
        },
        {
          blockType: 'process',
          sectionLabel: 'How It Works',
          heading: 'The Arc of Initiation',
          subheading: 'adapted from the deep logic of rites of passage for contemporary life.',
          phases: [
            { numeral: 'I', name: 'Separation', body: 'Stepping back from the structures and roles that shaped your life.' },
            { numeral: 'II', name: 'Descent', body: 'Developing a living relationship with a deeper layer of intelligence \u2014 Soul.' },
            { numeral: 'III', name: 'Threshold', body: 'A one-day solo ceremony in nature \u2014 the SoulQuest \u2014 marking the actual crossing.' },
            { numeral: 'IV', name: 'Return', body: 'Re-entering your life with a different orientation \u2014 and learning how to live from it.' },
          ],
        },
        {
          blockType: 'whatThisRequires',
          sectionLabel: 'What This Requires',
          heading: 'This work asks something real of you.',
          stats: [
            { label: 'Duration', value: '6 Months', note: 'April through September 2026' },
            { label: 'Time / Week', value: '4\u20136 Hours', note: 'Sessions and practice' },
            { label: 'Group Sessions', value: '12 Live', note: 'Via Zoom' },
            { label: '1:1 Mentoring', value: '12 Sessions', note: 'One-on-one support' },
            { label: 'The SoulQuest', value: '1 Day Solo', note: 'A ceremony in nature' },
            { label: 'Integration', value: 'Built In', note: 'Guided return support' },
          ],
        },
        {
          blockType: 'whoItsFor',
          sectionLabel: 'Who This Is For',
          heading: 'Not designed\nfor everyone.',
          items: [
            { text: 'Sense that something in life is shifting at a deeper level' },
            { text: 'Have already done significant inner or outer work' },
            { text: 'Are not looking for quick answers' },
            { text: 'Feel ready to engage something meaningful' },
          ],
        },
        {
          blockType: 'outcomes',
          sectionLabel: 'What Tends to Change',
          heading: 'The reorganization is felt from the inside out.',
          changes: [
            { label: 'Clearer direction', body: 'A growing sense of what you are oriented toward.' },
            { label: 'Decisions that hold', body: 'Choices rooted in something more stable than mood.' },
            { label: 'A living relationship with depth', body: 'An ongoing connection with a deeper intelligence.' },
            { label: 'Life gathering around a new center', body: 'What was ambiguous becomes more legible.' },
          ],
        },
        {
          blockType: 'guides',
          sectionLabel: 'Threshold Documents',
          heading: 'Foundations for the crossing',
          guides: [], // Will be populated with guide doc IDs after creation
        },
        {
          blockType: 'testimonials',
          sectionLabel: 'Participants',
          heading: 'Words from the threshold',
          testimonials: [], // Will be populated with testimonial doc IDs after creation
        },
        {
          blockType: 'offer',
          sectionLabel: 'Investment & Application',
          heading: 'Soul Initiation Program',
          subheading: 'April through September 2026 \u00B7 6\u201312 participants',
          stepsHeading: 'The next step',
          steps: [
            { label: 'Submit your application', body: 'A short form to help us understand where you are.' },
            { label: 'Receive the full guide', body: 'Complete details on schedule and practices.' },
            { label: 'Optional conversation', body: 'Explore whether this is the right fit.' },
            { label: 'Invitation to join', body: 'If the program aligns, receive an invitation.' },
          ],
          investmentLabel: 'Investment',
          investmentHeadline: 'Founding Cohort Rate',
          investmentBody: 'Disclosed upon application. Payment plans available.',
          ctaLabel: 'Begin Your Application',
          ctaUrl: '#apply-form',
        },
        {
          blockType: 'faqs',
          sectionLabel: 'FAQ',
          heading: 'Questions at the Threshold',
          faqs: [], // Will be populated with FAQ doc IDs after creation
        },
        {
          blockType: 'finalCta',
          sectionLabel: '',
          headline: 'The threshold is here.',
          body: '',
          ctaLabel: 'Cross the Threshold \u2014 Apply for April 2026',
          ctaUrl: '#apply-form',
        },
      ],
    },
  })

  // Update relationship fields with created doc IDs
  const homePage = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })
  if (homePage.docs[0]) {
    const blocks = homePage.docs[0].blocks as any[]
    const updatedBlocks = blocks.map((block: any) => {
      if (block.blockType === 'guides') {
        return { ...block, guides: guideDocs.map((d) => d.id) }
      }
      if (block.blockType === 'testimonials') {
        return { ...block, testimonials: testimonialDocs.map((d) => d.id) }
      }
      if (block.blockType === 'faqs') {
        return { ...block, faqs: faqDocs.map((d) => d.id) }
      }
      return block
    })

    await payload.update({
      collection: 'pages',
      id: homePage.docs[0].id,
      data: { blocks: updatedBlocks },
    })
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
```

- [ ] **Step 2: Commit**

```bash
git add src/scripts/seed.ts
git commit -m "feat(cms): add seed script to populate Supabase with current page content"
```

---

### Task 11: Refactor page.tsx to Server Component + Block Switcher

**Files:**
- Rewrite: `src/app/page.tsx`

**This is the critical integration task.** The page becomes a Server Component that fetches CMS data and renders the extracted client components.

- [ ] **Step 1: Rewrite page.tsx**

```tsx
// src/app/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'

import RevealProvider from '@/components/RevealProvider'
import PageLoader from '@/components/PageLoader'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import HeroSection from '@/components/blocks/HeroSection'
import MarqueeSection from '@/components/blocks/MarqueeSection'
import SplitLeftSection from '@/components/blocks/SplitLeftSection'
import ThresholdStatementSection from '@/components/blocks/ThresholdStatementSection'
import SplitRightSection from '@/components/blocks/SplitRightSection'
import ProcessSection from '@/components/blocks/ProcessSection'
import WhatThisRequiresSection from '@/components/blocks/WhatThisRequiresSection'
import WhoItsForSection from '@/components/blocks/WhoItsForSection'
import OutcomesSection from '@/components/blocks/OutcomesSection'
import GuidesSection from '@/components/blocks/GuidesSection'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import OfferSection from '@/components/blocks/OfferSection'
import FAQSection from '@/components/blocks/FAQSection'
import FinalCTASection from '@/components/blocks/FinalCTASection'

function renderBlock(block: any, siteConfig: any) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection key={block.id} {...block} />
    case 'marquee':
      return <MarqueeSection key={block.id} row1={siteConfig.marqueeRow1?.map((r: any) => r.text) ?? []} row2={siteConfig.marqueeRow2?.map((r: any) => r.text) ?? []} />
    case 'splitLeft':
      return <SplitLeftSection key={block.id} {...block} />
    case 'thresholdStatement':
      return <ThresholdStatementSection key={block.id} {...block} />
    case 'splitRight':
      return <SplitRightSection key={block.id} {...block} />
    case 'process':
      return <ProcessSection key={block.id} {...block} />
    case 'whatThisRequires':
      return <WhatThisRequiresSection key={block.id} {...block} />
    case 'whoItsFor':
      return <WhoItsForSection key={block.id} {...block} />
    case 'outcomes':
      return <OutcomesSection key={block.id} {...block} />
    case 'guides':
      return <GuidesSection key={block.id} {...block} />
    case 'testimonials':
      return <TestimonialsSection key={block.id} {...block} />
    case 'offer':
      return <OfferSection key={block.id} {...block} />
    case 'faqs':
      return <FAQSection key={block.id} {...block} />
    case 'finalCta':
      return <FinalCTASection key={block.id} {...block} />
    default:
      return null
  }
}

export default async function Home() {
  const payload = await getPayload({ config })

  const siteConfig = await payload.findGlobal({ slug: 'site-config' })

  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 2,
  })

  const page = pageResult.docs[0]
  if (!page) return <div>Page not found</div>

  return (
    <RevealProvider>
      <main className="bg-ink min-h-screen">
        <PageLoader />
        <Nav
          siteTitle={siteConfig.siteTitle}
          navLinks={siteConfig.navLinks}
        />
        {page.blocks?.map((block: any) => renderBlock(block, siteConfig))}
        <Footer
          siteTitle={siteConfig.siteTitle}
          brandTagline={siteConfig.brandTagline ?? ''}
          contactEmail={siteConfig.contactEmail}
          establishedLine={siteConfig.establishedLine ?? ''}
          copyrightText={siteConfig.copyrightText ?? ''}
          socialLinks={siteConfig.socialLinks}
        />
      </main>
    </RevealProvider>
  )
}
```

- [ ] **Step 2: Commit (atomic with component extraction)**

```bash
git add src/app/page.tsx
git commit -m "feat: refactor page.tsx to Server Component with CMS block switcher"
```

---

### Task 12: Generate Payload Migration

**Files:** None (Payload generates migration files)

- [ ] **Step 1: Verify DATABASE_URI is set**

```bash
grep DATABASE_URI .env
```

Expected: a line like `DATABASE_URI=postgresql://...`. If missing, add your Supabase connection string to `.env` before proceeding. Payload requires a live Supabase connection to run migrations.

- [ ] **Step 2: Generate the migration**

```bash
npx payload migrate:create
```

This reads all collection and global configs and generates a migration file in `src/migrations/`. Expected output: `Migration created at src/migrations/<timestamp>_<name>.ts`

- [ ] **Step 3: Run the migration against Supabase**

```bash
npx payload migrate
```

This creates all tables, columns, indexes, and relationships in Supabase. Expected output: `Migrations run successfully`. Verify in Supabase dashboard that new tables (guides, blocks, etc.) appear.

- [ ] **Step 4: Regenerate Payload types**

```bash
npx payload generate:types
```

This regenerates `payload-types.ts` to reflect all new collections, globals, and block configs. Expected output: `Types generated at src/payload-types.ts`. The frontend imports from this file — run this before building.

- [ ] **Step 5: Commit migration file and types**

```bash
git add src/migrations/ src/payload-types.ts
git commit -m "chore(db): add Payload migration for CMS schema"
```

---

### Task 13: Run Seed Script + Final Verification

- [ ] **Step 1: Run the seed script**

```bash
npx tsx src/scripts/seed.ts
```

Expected output:
```
Seeding SiteConfig...
Seeding Testimonials...
Seeding FAQs...
Seeding Guides...
Seeding Home page...
Seed complete!
```

- [ ] **Step 2: Start the dev server and verify**

```bash
npm run dev
```

Verify:
1. Page renders at `http://localhost:3000` — should look identical to current
2. All animations work (GSAP scroll triggers, parallax, marquee, reveal)
3. Payload admin at `http://localhost:3000/admin` shows all content
4. Edit a headline in Payload admin → refresh page → change appears

- [ ] **Step 3: Commit any final adjustments**

```bash
git add src/app/page.tsx src/components/ src/scripts/seed.ts
git commit -m "feat: complete CMS migration — all content now served from Payload"
```

---

## Summary

| Workstream | Tasks | Can Parallelize |
|------------|-------|-----------------|
| **Backend (Agent A)** | Tasks 1-5: SiteConfig, Guides, Testimonials update, 14 block configs, Pages rebuild | Yes — independent of frontend |
| **Frontend (Agent B)** | Tasks 6-9: Shared components, Nav/Footer, 14 section components, FAQAccordion | Yes — independent of backend |
| **Integration** | Tasks 10-13: Seed script, page.tsx refactor, migration, verification | Sequential — requires both streams |

**Total tasks:** 13
**Parallelizable:** Tasks 1-5 and 6-9 run simultaneously
**Critical path:** Task 11 (page.tsx refactor) is the integration point
