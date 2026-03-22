import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: make testimonials.name nullable
 * Applied: 2026-03-22 — "What Participants Have Said" copy migration from soul-initiation-program-copy.md
 *
 * The three participant quotes in this section are anonymous (no name, no role).
 * Previously name was NOT NULL; this drops that constraint so anonymous entries can be saved.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE testimonials
      ALTER COLUMN name DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE testimonials
      ALTER COLUMN name SET NOT NULL;
  `)
}
