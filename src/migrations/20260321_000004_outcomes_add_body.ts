import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: add body column to outcomes block
 * Applied: 2026-03-21 — "What Tends to Change" full copy migration from soul-initiation-program-copy.md
 *
 * New fields:
 *   body — introductory paragraph beneath the section heading
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_outcomes
      ADD COLUMN IF NOT EXISTS body text;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_outcomes
      DROP COLUMN IF EXISTS body;
  `)
}
