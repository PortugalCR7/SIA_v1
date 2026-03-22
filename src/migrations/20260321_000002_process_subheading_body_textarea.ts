import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: change process block subheading + phases.body from varchar → text
 * Applied: 2026-03-21 — Arc of Initiation copy migration requires multiline body fields
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_process
      ALTER COLUMN subheading TYPE text;
  `)
  await db.execute(sql`
    ALTER TABLE pages_blocks_process_phases
      ALTER COLUMN body TYPE text;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages_blocks_process
      ALTER COLUMN subheading TYPE varchar;
  `)
  await db.execute(sql`
    ALTER TABLE pages_blocks_process_phases
      ALTER COLUMN body TYPE varchar;
  `)
}
