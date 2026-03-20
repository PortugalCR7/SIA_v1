# claude.md — Project Constitution
## Soul Initiation Academy (SIA v1)

> This file is LAW. All architectural decisions, data schemas, behavioral rules, and invariants live here.
> Never modify this file casually. Update only when:
> - A schema changes
> - A rule is added or removed
> - Architecture is modified

---

## Project Identity

| Field | Value |
|-------|-------|
| Project Name | Soul Initiation Academy — v1 |
| Type | Full-stack marketing site + CMS |
| Primary Goal | Convert visitors into clients via **Application → Direct Purchase** |
| Conversion Flow | Landing Page → Application Form → Thank You → Email Sequence |
| Target Audience | Successful but unfulfilled visionaries; people in existential overwhelm seeking breakthrough |
| Brand Tone | Deep, grounded, evocative, transformation-oriented — NOT hype-y or corporate |
| Core Feeling | Deep curiosity + excitement of the unknown — *what is possible*, not fear of the unknown |

---

## Architectural Invariants

1. **Content is CMS-driven.** No hardcoded copy in frontend components. All page text, images, and CTAs pull from the CMS.
2. **Conversion first.** Every design decision serves the conversion goal. No decorative complexity.
3. **Mobile-first.** All UI is built and tested on mobile before desktop.
4. **No external trackers without consent.** Any analytics respects privacy best practices.
5. **Secrets never in code.** All API keys, tokens, and credentials live exclusively in `.env`.
6. **Deterministic tools.** Python/JS scripts in `tools/` must be atomic, testable, and side-effect-free unless explicitly deploying.

---

## Data Schema

> STATUS: ❌ PENDING — Discovery questions must be answered first.

### Lead / Conversion Event
```json
{
  "id": "uuid",
  "created_at": "ISO8601",
  "source": "landing_page | referral | ad",
  "name": "string",
  "email": "string",
  "phone": "string | null",
  "conversion_type": "call_booking | email_optin | purchase",
  "offer_slug": "string",
  "utm_source": "string | null",
  "utm_campaign": "string | null"
}
```

### CMS Content Types (Skeleton — TBD)
```json
{
  "page": {
    "slug": "string",
    "title": "string",
    "sections": ["SectionBlock"]
  },
  "offer": {
    "slug": "string",
    "name": "string",
    "tagline": "string",
    "description": "rich_text",
    "price": "number | null",
    "cta_label": "string",
    "cta_url": "string"
  },
  "testimonial": {
    "name": "string",
    "role": "string | null",
    "quote": "rich_text",
    "image": "asset | null"
  },
  "faq": {
    "question": "string",
    "answer": "rich_text"
  }
}
```

---

## Behavioral Rules

### Brand Voice
- Tone: Deep, soulful, grounded, poetic — NOT corporate, NOT hype, NOT fear-based
- Evoke curiosity and possibility — the "unknown of what is possible"
- Language must derive from existing copy (to be uploaded by user)
- No manufactured urgency or scarcity language

### Conversion Rules
- Single CTA per major section
- Conversion action = Application form submission
- Application form leads to: Thank You page → automated email sequence
- Never use "buy now" framing — use language of "apply," "step in," "begin"

### CMS Editorial Rules
- All page copy lives in the CMS — zero hardcoded strings in components
- Content editors must be able to update: headlines, body copy, CTAs, testimonials, FAQs, images
- CMS admin protected by auth — not publicly accessible

### Do Not Rules
- No dark patterns (fake countdown timers, false scarcity)
- No negative language around the audience's struggle
- No over-promising specific outcomes
- No tracking without user consent

---

## Integration Registry

| Service | Purpose | Status | Key Location |
|---------|---------|--------|-------------|
| GitHub | Version control, repo: `sia-v1` (private) | 🔄 Linking | `.env` |
| Vercel | Hosting + CI/CD (authenticated: `portugalcr7`) | 🔄 Linking | Vercel dashboard |
| Supabase | Database (Postgres), Auth, Storage | 🔄 Linking | `.env` |
| Email (TBD) | Application confirmation + nurture sequence | ❓ Pending | `.env` |
| UI/UX Repo (TBD) | Design system + component library | ❓ URL pending | git submodule / package |

---

## Tech Stack

| Layer | Decision | Rationale |
|-------|---------|-----------|
| Framework | **Next.js 14** (App Router) | Vercel-native, SSR/SSG, perfect for landing + CMS |
| Styling | **Tailwind CSS** | Utility-first, fast iteration |
| CMS | **Payload CMS v3** | Self-hosted, Postgres-native (Supabase), beautiful admin UI, TypeScript |
| Database | **Supabase (Postgres)** | Auth + DB + Storage in one, existing project |
| Hosting | **Vercel** | Already authenticated, zero-config Next.js |
| Version Control | **GitHub** `sia-v1` private | |
| Email | **TBD** (Resend recommended) | Simple API, great DX |

---

## Maintenance Log

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Project Constitution initialized — skeleton | System Pilot |
| 2026-03-20 | Phase 1 Discovery complete — stack decided, behavioral rules set | System Pilot |
