# CMS Migration — Agent Handoff Prompts

Use these prompts to continue the migration in new conversations. Tasks 10–13 are sequential — run them in order.

---

## Task 10: Write Seed Script

**Start a new conversation and paste this prompt:**

---

I'm continuing a CMS migration for Soul Initiation Academy. Tasks 1–9 are complete. I need you to implement **Task 10: Write the seed script**.

**Working directory:** `/Users/CR7/SIA_v1/.worktrees/cms-migration`
**Branch:** `feature/cms-migration`

The full implementation plan is at: `docs/superpowers/plans/2026-03-21-cms-migration.md`

Read Task 10 from that plan and implement it exactly. The seed script lives at `src/scripts/seed.ts` and uses the Payload local API to populate Supabase with the current hardcoded content. It must be idempotent (safe to re-run).

Key points from the plan:
- Uses `getPayload` from `payload`, `config` from `@payload-config`
- Has a `makeLexical(paragraphs: string[])` helper for building Lexical richText nodes
- Seeds: SiteConfig global, 3 Testimonials, 6 FAQs, 3 Guides, 1 Home page with all 14 blocks
- Creates relationship docs first, collects their IDs, then creates the home page with IDs inline
- Guards each collection with an existence check before creating (idempotency)

After writing the file, verify it compiles:
```bash
cd /Users/CR7/SIA_v1/.worktrees/cms-migration
npx tsc --noEmit 2>&1 | head -20
```

Then commit:
```bash
git add src/scripts/seed.ts
git commit -m "feat(cms): add seed script to populate Supabase with current page content"
```

Report DONE with the commit hash when complete.

---

## Task 11: Refactor page.tsx → Server Component

**Start a new conversation and paste this prompt (run AFTER Task 10 is committed):**

---

I'm continuing a CMS migration for Soul Initiation Academy. Tasks 1–10 are complete. I need you to implement **Task 11: Refactor page.tsx to a Server Component**.

**Working directory:** `/Users/CR7/SIA_v1/.worktrees/cms-migration`
**Branch:** `feature/cms-migration`

The full implementation plan is at: `docs/superpowers/plans/2026-03-21-cms-migration.md`

Read Task 11 from that plan and implement it exactly. The existing `src/app/page.tsx` is a 1,400+ line `"use client"` monolith. Replace it entirely with an ~80-line Server Component that:
- Imports `getPayload` and fetches `SiteConfig` global + `home` page with `depth: 2`
- Has a `renderBlock(block, siteConfig)` switch statement mapping all 14 `blockType` values to their components
- Renders `<RevealProvider>` wrapping `<Nav>`, blocks, `<Footer>`
- All 14 section components are already in `src/components/blocks/`

After rewriting, verify TypeScript compiles:
```bash
cd /Users/CR7/SIA_v1/.worktrees/cms-migration
npx tsc --noEmit 2>&1 | head -20
```

Then commit:
```bash
git add src/app/page.tsx
git commit -m "feat: refactor page.tsx to Server Component with CMS block switcher"
```

Report DONE with the commit hash when complete.

---

## Task 12: Generate Payload Migration

**Start a new conversation and paste this prompt (run AFTER Task 11 is committed):**

---

I'm continuing a CMS migration for Soul Initiation Academy. Tasks 1–11 are complete. I need you to implement **Task 12: Generate and run the Payload database migration**.

**Working directory:** `/Users/CR7/SIA_v1/.worktrees/cms-migration`
**Branch:** `feature/cms-migration`

The full implementation plan is at: `docs/superpowers/plans/2026-03-21-cms-migration.md`

Read Task 12 from that plan and execute it. Steps:

1. Verify `DATABASE_URI` is set in `.env`
2. Generate the migration: `npx payload migrate:create`
3. Run the migration against Supabase: `npx payload migrate`
4. Regenerate types: `npx payload generate:types`
5. Commit:
```bash
git add src/migrations/ src/payload-types.ts
git commit -m "chore(db): add Payload migration for CMS schema"
```

**Prerequisites:** `DATABASE_URI` must point to a live Supabase Postgres database. If not set, stop and ask me to add it to `.env` before proceeding.

Report DONE with the commit hash, or BLOCKED if `DATABASE_URI` is missing.

---

## Task 13: Run Seed + Final Verification

**Start a new conversation and paste this prompt (run AFTER Task 12 is committed):**

---

I'm continuing a CMS migration for Soul Initiation Academy. Tasks 1–12 are complete. I need you to implement **Task 13: Run the seed script and verify the migration**.

**Working directory:** `/Users/CR7/SIA_v1/.worktrees/cms-migration`
**Branch:** `feature/cms-migration`

The full implementation plan is at: `docs/superpowers/plans/2026-03-21-cms-migration.md`

Read Task 13 from that plan and execute it. Steps:

1. Run the seed script:
```bash
cd /Users/CR7/SIA_v1/.worktrees/cms-migration
npx tsx src/scripts/seed.ts
```
Expected output ends with: `Seed complete!`

2. Start the dev server and verify:
```bash
npm run dev
```
Check: page renders at `http://localhost:3000`, all sections visible, Payload admin at `http://localhost:3000/admin` shows all content.

3. Commit any final adjustments:
```bash
git add src/app/page.tsx src/components/ src/scripts/seed.ts
git commit -m "feat: complete CMS migration — all content now served from Payload"
```

4. After verification passes, merge the feature branch to main:
```bash
git checkout main
git merge feature/cms-migration
git push
```

Report DONE with confirmation that the page renders correctly and CMS admin shows all content.

---

## Quick Reference

| Item | Value |
|------|-------|
| Worktree path | `/Users/CR7/SIA_v1/.worktrees/cms-migration` |
| Feature branch | `feature/cms-migration` |
| Full plan | `docs/superpowers/plans/2026-03-21-cms-migration.md` |
| Design spec | `docs/superpowers/specs/2026-03-21-cms-migration-design.md` |
| Progress tracker | `docs/cms-migration-progress.md` |
