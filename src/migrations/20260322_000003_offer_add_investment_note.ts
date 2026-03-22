import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: add investment_note to pages_blocks_offer
 * Applied: 2026-03-22 — "Investment & Application" full copy migration
 *
 * New column: investment_note
 *   A short editorial note that sits between the price headline and the
 *   commitment body — e.g. "Payment plans available upon request."
 *   Rendered as a distinct element; kept separate so editors can update
 *   it independently of the main commitment statement.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_offer
      ADD COLUMN IF NOT EXISTS investment_note character varying;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_offer
      DROP COLUMN IF EXISTS investment_note;
  `)
}
