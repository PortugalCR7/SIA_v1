import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: add body, fits_heading, not_fit_heading columns + not_fit_items table to who_its_for block
 * Applied: 2026-03-21 — "Who This Is For" full copy migration from soul-initiation-program-copy.md
 *
 * New fields:
 *   body             — introductory paragraph
 *   fits_heading     — sub-heading for the "fits" list
 *   not_fit_heading  — sub-heading for the "not a fit" list
 *   notFitItems      — array of "not a fit" items (new child table)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add scalar columns to the main block table
  await db.execute(sql`
    ALTER TABLE pages_blocks_who_its_for
      ADD COLUMN IF NOT EXISTS body text,
      ADD COLUMN IF NOT EXISTS fits_heading varchar,
      ADD COLUMN IF NOT EXISTS not_fit_heading varchar;
  `)

  // Create child table for the notFitItems array — mirrors Payload's varchar ID convention
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS pages_blocks_who_its_for_not_fit_items (
      _order      integer           NOT NULL,
      _parent_id  character varying NOT NULL,
      id          character varying PRIMARY KEY,
      text        character varying NOT NULL
    );
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS pages_blocks_who_its_for_not_fit_items_parent_idx
      ON pages_blocks_who_its_for_not_fit_items (_parent_id);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS pages_blocks_who_its_for_not_fit_items;
  `)

  await db.execute(sql`
    ALTER TABLE pages_blocks_who_its_for
      DROP COLUMN IF EXISTS body,
      DROP COLUMN IF EXISTS fits_heading,
      DROP COLUMN IF EXISTS not_fit_heading;
  `)
}
