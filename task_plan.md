# Task Plan — Soul Initiation Academy (SIA v1)

## Project Vision
Full-stack landing page (sales/conversion page) + fully dynamic CMS backend for a soul initiation coaching offer targeting successful-but-unfulfilled visionaries.

---

## Status: 🟡 ACTIVE — Phase 2: Link (Connectivity)

> Phase 1 Discovery complete. Wiring GitHub → Vercel → Supabase integrations.

---

## Phases & Checklists

### Phase 0: Initialization ✅
- [x] `task_plan.md` created
- [x] `claude.md` created (Project Constitution skeleton)
- [x] `findings.md` created
- [x] `progress.md` created
- [x] Discovery Questions answered by user
- [x] Data Schema skeleton defined in `claude.md`

---

### Phase 1: Blueprint (Vision & Logic) ✅
- [x] North Star: Direct purchase via application form
- [x] Integrations: GitHub (sia-v1), Vercel, Supabase (existing project)
- [x] CMS: Payload CMS v3 (Postgres / Supabase)
- [x] Conversion flow: Landing → Application Form → Thank You → Email Sequence
- [x] Behavioral rules & brand voice defined in `claude.md`
- [x] Tech stack approved: Next.js 14 + Tailwind + Payload CMS + Supabase + Vercel
- [ ] Existing copy uploaded by user (pending)
- [ ] UI/UX design repo URL provided (pending)

---

### Phase 2: Link (Connectivity)
- [ ] `.env` populated with all required credentials
- [ ] CMS API connection verified
- [ ] Payment/booking service connection verified (if applicable)
- [ ] Email service connection verified (if applicable)
- [ ] Hosting/deployment pipeline initialized

---

### Phase 3: Architect (3-Layer Build)

#### Layer 1 — Architecture SOPs
- [ ] `architecture/landing-page.md` — Page sections, copy strategy, conversion flow
- [ ] `architecture/cms-schema.md` — Content types, fields, relationships
- [ ] `architecture/api-routes.md` — Backend endpoints and data flow
- [ ] `architecture/auth.md` — CMS auth & admin access

#### Layer 2 — Navigation (App Routing & Logic)
- [ ] Routing structure defined
- [ ] CMS ↔ frontend data binding wired
- [ ] Form submission / lead capture logic

#### Layer 3 — Tools / Scripts
- [ ] CMS seed script
- [ ] Email capture script
- [ ] Analytics/conversion tracking

---

### Phase 4: Stylize (UI/UX)
- [ ] Design system / color palette defined
- [ ] Typography selected (aligned to brand — soul, depth, transformation)
- [ ] Landing page sections wireframed:
  - [ ] Hero (headline, subheadline, CTA)
  - [ ] Pain/Empathy section
  - [ ] The Offer / Soul Initiation explained
  - [ ] Who it's for (avatar clarity)
  - [ ] Social proof / testimonials
  - [ ] Process / what happens
  - [ ] Pricing / packages
  - [ ] FAQ
  - [ ] Final CTA / footer
- [ ] CMS admin UI functional
- [ ] Mobile responsive
- [ ] Accessibility (a11y) checked
- [ ] User feedback collected

---

### Phase 5: Trigger (Deployment)
- [ ] Production hosting configured
- [ ] Domain + SSL verified
- [ ] CI/CD pipeline set up
- [ ] Analytics live
- [ ] Final QA pass
- [ ] Maintenance log updated in `claude.md`

---

## Tech Stack Candidates (TBD — pending Discovery)

| Layer | Options | Decision |
|-------|---------|----------|
| Frontend | Next.js, Astro, Remix | ❓ |
| Styling | Tailwind CSS + shadcn/ui | ✅ Recommended |
| CMS | Sanity.io, Payload CMS, Contentful | ❓ |
| Backend | Next.js API routes, Express | ❓ |
| Database | Postgres (Neon/Supabase), MongoDB | ❓ |
| Auth (CMS) | NextAuth, Clerk | ❓ |
| Email | Resend, SendGrid, ConvertKit | ❓ |
| Payments/Booking | Stripe, Cal.com, Calendly | ❓ |
| Hosting | Vercel, Railway, Fly.io | ❓ |

---

## Target Audience Profile
- Successful externally, unfulfilled internally
- Visionaries at an existential inflection point
- Seeking deeper self-inquiry, breakthrough, and soul-level alignment
- Not beginners — they've "done the work" but hit a ceiling

---

## Conversion Goal
TBD — likely one of:
- Book a discovery/strategy call
- Email opt-in for a lead magnet
- Direct purchase of a program
