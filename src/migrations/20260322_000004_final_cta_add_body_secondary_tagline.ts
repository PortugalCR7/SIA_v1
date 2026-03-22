import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: add body_secondary + tagline to pages_blocks_final_cta
 * Applied: 2026-03-22 — "If You Recognize Yourself in This" full copy migration
 *
 * New columns:
 *   body_secondary — second closing paragraph
 *     "The April 2026 cohort is small by design. If this speaks to something in
 *      you, the application is the first step."
 *     Kept separate from `body` so editors can update each paragraph independently.
 *
 *   tagline — badge/stamp line rendered beneath body copy
 *     e.g. "APRIL 2026 · 6–12 PARTICIPANTS · APPLICATION REQUIRED"
 *     Displayed in uppercase tracking; optional — suppressed when blank.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_final_cta
      ADD COLUMN IF NOT EXISTS body_secondary text,
      ADD COLUMN IF NOT EXISTS tagline character varying;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_final_cta
      DROP COLUMN IF EXISTS body_secondary,
      DROP COLUMN IF EXISTS tagline;
  `)
}
