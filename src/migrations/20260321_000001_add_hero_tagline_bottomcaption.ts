import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: add tagline (text) and bottom_caption (varchar) to pages_blocks_hero
 * Applied: 2026-03-21 — Hero section copy migration from soul-initiation-program-copy.md
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_hero
      ADD COLUMN IF NOT EXISTS tagline text,
      ADD COLUMN IF NOT EXISTS bottom_caption varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_hero
      DROP COLUMN IF EXISTS tagline,
      DROP COLUMN IF EXISTS bottom_caption;
  `)
}
