import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

/**
 * Migration: create pages_blocks_accompanied table
 * Applied: 2026-03-22 — "You Are Accompanied, Not Led" full copy migration from soul-initiation-program-copy.md
 *
 * New table: pages_blocks_accompanied
 * Fields:
 *   section_label — overline label above the heading (optional)
 *   heading       — primary section heading (required)
 *   paragraph1    — first body paragraph (guides' presence from shared experience)
 *   paragraph2    — second body paragraph (guide's role: holding relationship, not providing answers)
 *   paragraph3    — third body paragraph (presence, discernment, steadiness earned through passage)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS pages_blocks_accompanied (
      _order        integer           NOT NULL,
      _parent_id    character varying NOT NULL,
      _path         text              NOT NULL,
      id            character varying PRIMARY KEY,
      block_type    character varying,
      section_label character varying,
      heading       character varying,
      paragraph1    text,
      paragraph2    text,
      paragraph3    text
    );
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS pages_blocks_accompanied_parent_idx
      ON pages_blocks_accompanied (_parent_id);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS pages_blocks_accompanied;
  `)
}
