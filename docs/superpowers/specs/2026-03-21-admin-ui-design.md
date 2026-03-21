# Admin UI Design Spec
**Project:** Soul Initiation Academy — v1
**Date:** 2026-03-21
**Scope:** Payload CMS admin login page + dashboard workspace
**Status:** Approved

---

## 1. Overview

Enhance the Payload CMS admin interface from its default vanilla state into a branded, immersive environment that feels like a natural extension of the SIA brand universe. Two primary surfaces: the login screen and the dashboard workspace.

---

## 2. Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Admin tone | Brand-Aligned Dark | Admin should feel like an extension of the SIA universe |
| Login layout | Focused Minimal | Logo + tabbed form, nothing else. Fast and deliberate. |
| Navigation | Custom Dashboard Hub + grouped sidebar | Command-center dashboard with standard sidebar navigation |
| Background color | Pure black (`#000000`) | Requested over navy — maximum contrast, more dramatic |
| Accent color | Gold (`#b49155`) | Consistent with SIA brand identity |
| Typography | Cormorant Garamond (headings/display) + Jost (UI) | Matches existing frontend type system |

---

## 3. Login Screen

### Layout
- Full-screen black background with ambient gold radial gradient at top and subtle 40px gold grid texture
- Vertically and horizontally centered single column — max width 420px
- No navigation, no distractions

### Components (top to bottom)
1. **Brand mark** — 56×56px bordered square with inner inset border, "SIA" in Cormorant Garamond, gold
2. **Brand name** — "SOUL INITIATION ACADEMY" in small-caps letterspaced Cormorant Garamond, muted gold
3. **Form card** — semi-transparent dark card with thin gold border, backdrop blur
   - **Tab switcher** — "Sign In" / "Create Account" tabs, gold underline on active
   - **Sign In panel**: Email field, Password field, "Enter" button, "Forgot your password?" helper
   - **Create Account panel**: Full Name, Email, Password, Confirm Password fields, "Create Account" button, restricted-access helper note
4. **Footer note** — "Soul Initiation Academy · CMS v1" in barely-visible muted text

### Interactive behavior
- Tab switching toggles between Sign In and Create Account panels (client-side, no page reload)
- Input focus state: gold border at 45% opacity
- Button hover: increased gold opacity, slightly lighter text

### Schema prerequisite — Users collection
The Create Account panel includes a "Full Name" field. This requires adding a `name` field to the `Users` collection config (`src/collections/Users.ts`) before the form can submit it. This will require a schema push (Postgres migration). The form submits to Payload's standard `POST /api/users` endpoint.

### Confirm Password — UI-only validation
The "Confirm Password" field is **client-side only**. The `/api/users` endpoint does not validate `confirmPassword`. Password match must be checked in the component before submission — do not rely on server enforcement.

---

## 4. Dashboard Workspace

### Layout
- Full-viewport flex layout: fixed sidebar (220px) + scrollable main content area
- Black background throughout, matching grid texture overlay

### Sidebar
- **Header**: SIA brand mark (32px) + "Soul Initiation / Admin CMS" text
- **Navigation groups**:
  - **Overview**: Dashboard (active state = gold left border + gold text)
  - **Content**: Pages, Offers, Testimonials, FAQs, Guides (each with record count badge — fetched via `payload.count()`, see §5)
  - **Assets**: Media
  - **Settings**: Site Config, Users
- **Footer**: User avatar (initials from `email`), email address, role label — pinned to bottom. Uses Payload's `useAuth()` client hook to read the current user.
- Nav item hover: subtle gold background tint
- Nav item active: gold left border + gold text + slightly brighter background
- The nav component uses Payload's `useConfig()` client hook to access the collection list — slugs are not hardcoded.

### Topbar
- Left: personalized greeting — "Good morning, *[name or email]*" — the italic gold value is the logged-in user's `name` field (if present) or their email prefix. Uses `useAuth()` to read this.
- Right: current date (muted uppercase) + "＋ New Entry" primary button (gold border/text)

### Stats Row (4 cards)
- **Total Records** — sum of `totalDocs` across all document collections (Pages + Offers + Testimonials + FAQs + Guides + Media)
- **Active Offers** — count of Offers where `isActive: true` (filter supported by the existing Offers schema)
- **Testimonials** — total count with "X featured" sub-note (filtered by `featured: true`)
- **Media Files** — total uploaded assets via Media collection count

All counts fetched server-side via Payload local API (`payload.count({ collection: '...' })`) — no HTTP round-trips, no auth header forwarding needed.

Each card: thin gold top-edge highlight line, hover border brightens

### Collection Cards Grid (3×2)
One card per collection + globals: Pages, Offers, Testimonials, FAQs, Guides, Site Config

Each card contains:
- Collection icon (decorative unicode glyph, defined per-collection in the component)
- Record count (top-right, Cormorant Garamond, muted gold) — same `payload.count()` values as stats row
- Collection name + "Last edited X ago" meta — fetched via `payload.find({ collection, limit: 1, sort: '-updatedAt' })` to get the most recent `updatedAt` timestamp
- Action buttons: "View all" → links to `/admin/collections/[slug]`; "＋ Add [item]" → links to `/admin/collections/[slug]/create`. Site Config card has only "Edit config" → `/admin/globals/site-config`.

### Bottom Two-Column Panel — Recent Activity
- Fetches the most recently updated record from each collection (one `payload.find()` per collection, `limit: 1, sort: '-updatedAt'`), merges results, sorts by `updatedAt` descending, displays top 5.
- Each item shows: collection name, record title, relative timestamp.
- **Dot color**: all dots use a single neutral gold color — the current schema has no `_status` (draft/publish) field on any collection, so published vs. draft distinction is not implementable without a schema change. This is intentional; the indicator is decorative only.

### Bottom Two-Column Panel — Quick Actions
Shortcut links to the most common tasks — add testimonial, edit site config, upload media, create FAQ, manage users. These are static links to known admin routes.

---

## 5. Technical Implementation

### Approach: Payload v3 Admin Customization APIs

Payload CMS v3 provides these typed APIs for admin customization, all configured in `payload.config.ts`:

```ts
admin: {
  theme: 'dark',                          // locks the admin to dark theme; sets html[data-theme="dark"] globally
  user: Users.slug,
  components: {
    Nav: '/src/components/admin/AdminNav#default',         // replaces full sidebar nav
    graphics: {
      Logo: '/src/components/admin/AdminLogo#default',     // brand mark in nav header + login
      Icon: '/src/components/admin/AdminIcon#default',     // small icon (browser tab favicon area)
    },
    views: {
      dashboard: {
        Component: '/src/components/admin/Dashboard#default',   // replaces default dashboard view
      },
      // NOTE: 'login' is NOT a typed key in AdminViewConfig — it works at runtime via index
      // signature but is undocumented. The login customization is implemented via a full
      // custom view registered here:
      login: {
        Component: '/src/components/admin/LoginPage#default',
      },
    },
  },
  importMap: {
    baseDir: path.resolve(dirname),
  },
}
```

`PayloadComponent` values are **path strings** (relative to `baseDir`), not direct React imports. The `#default` suffix specifies the export name. This is how Payload's build system registers components in `importMap.js`.

### CSS Injection

**There is no `cssPath` config key in Payload v3.** Custom CSS is injected by importing the file inside `/src/app/(payload)/layout.tsx`:

```ts
// src/app/(payload)/layout.tsx
import './admin.css'   // or path alias: '@/components/admin/admin.css'
import { RootLayout } from '@payloadcms/next/layouts'
// ...
```

The CSS file uses `@layer` to ensure specificity over Payload's defaults:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:...');

/* Override Payload's CSS variables via source-order cascade — no named layer needed.
   This file is imported after Payload's own styles in layout.tsx, so declarations here
   win via cascade order. Do not use @layer payload — Payload uses @layer payload-default
   internally; an unscoped rule here overrides it correctly for CSS custom properties. */
:root, html[data-theme="dark"] {
  --theme-bg: #000000;
  --theme-elevation-0: #080808;
  --theme-elevation-50: #0f0f0f;
  --theme-elevation-100: #141414;
  --theme-elevation-150: #1a1a1a;
  --theme-elevation-200: #1f1f1f;
  --theme-elevation-500: #2a2a2a;
  --theme-elevation-1000: #333333;
  --theme-text: #e0d4bc;
  --theme-success: #b49155;
  /* ... additional overrides */
}
```

**CSS is NOT registered in `importMap.js`** — only `.tsx` React components are. The import in `layout.tsx` is sufficient.

### File Structure

```
src/
  components/
    admin/
      AdminLogo.tsx        # Brand mark — used in sidebar header + login
      AdminIcon.tsx        # Small icon variant
      AdminNav.tsx         # Full grouped sidebar navigation (uses useConfig, useAuth)
      Dashboard.tsx        # Dashboard hub — server component, uses payload.count()
      LoginPage.tsx        # Custom login — Sign In + Create Account tabs
      admin.css            # Global admin theme — imported in (payload)/layout.tsx
  app/
    (payload)/
      layout.tsx           # Import admin.css here
      admin/
        importMap.js       # Auto-updated by `payload generate:importmap`
payload.config.ts          # Updated admin block (see above)
```

### Required Schema Change — Users Collection

Add a `name` field to `src/collections/Users.ts` before the Create Account form can submit a name:

```ts
{
  name: 'name',
  type: 'text',
  label: 'Full Name',
  required: false,
}
```

Run `payload migrate` or set `db.push: true` in dev to apply the schema change.

### Record Count Fetching — Local API

All counts are fetched server-side in `Dashboard.tsx` using the Payload local API:

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const [pages, offers, testimonials, faqs, guides, media] = await Promise.all([
  payload.count({ collection: 'pages' }),
  payload.count({ collection: 'offers' }),
  payload.count({ collection: 'testimonials' }),
  payload.count({ collection: 'faqs' }),
  payload.count({ collection: 'guides' }),
  payload.count({ collection: 'media' }),
])

const activeOffers = await payload.count({
  collection: 'offers',
  where: { isActive: { equals: true } },
})

// Each result is { totalDocs: number } — access .totalDocs explicitly:
const totalRecords = pages.totalDocs + offers.totalDocs + testimonials.totalDocs
  + faqs.totalDocs + guides.totalDocs + media.totalDocs
```

No REST API calls, no auth header forwarding. This runs server-side with full admin access.

---

## 6. Constraints & Invariants

- **CSS not in importMap** — `admin.css` is imported in `layout.tsx`, not registered in `importMap.js`
- **`admin.theme: 'dark'`** must be set in `payload.config.ts` to lock the dark baseline and ensure CSS variable overrides apply reliably
- **Counts via local API only** — use `payload.count()` server-side, not `GET /api/[collection]?limit=0`
- **Create Account → `/api/users`** — no custom auth logic; submission targets Payload's standard user creation endpoint
- **Confirm Password is UI-only** — client-side match check only; not server-enforced
- **Activity dots are decorative** — no draft/publish schema exists; all dots use neutral gold color
- **`views.login` is undocumented** — works at runtime via Payload's view index signature but is not a typed key; test after upgrades
- **All component paths use string format** — `'/src/components/admin/Dashboard#default'` not a direct import
- **Font loading via Google Fonts `@import` in `admin.css`** — no CSP currently; if a CSP is added later, `font-src` and `style-src` headers must include Google's domains
- **Secrets never in code** — no API keys or credentials introduced by this feature

---

## 7. Out of Scope

- Custom rich text editor toolbar styling
- Mobile admin UI (Payload admin is desktop-primary)
- Email notifications for new user creation
- Custom collection list views or edit form styling (beyond global theme)
- Draft/publish workflow (would require `versions` config on collections)
- Role-based access control (all admin users have equal access in v1)
