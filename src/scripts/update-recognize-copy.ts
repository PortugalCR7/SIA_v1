// src/scripts/update-recognize-copy.ts
// Patches the "Do You Recognize This?" splitLeft block on the home page
// with verbatim copy from soul-initiation-program-copy.md (lines 16–24).
//
// Uses direct SQL (pg) instead of payload.update() to avoid Payload's
// post-write full-page SELECT, which fails when block schema definitions
// are ahead of the database (schema drift on unrelated blocks).
//
// Safe to run multiple times — idempotent.

import { Pool } from 'pg'

const DATABASE_URI = process.env.DATABASE_URI
if (!DATABASE_URI) {
  console.error('DATABASE_URI env var is required.')
  process.exit(1)
}

// Verbatim copy from soul-initiation-program-copy.md (lines 16–24).
// DB layout: sectionLabel="Recognition", heading="Do You Recognize This?"
// Full intro paragraph → body field; bullet points → items rows.
const BODY =
  'There are moments in life when something begins to shift beneath the surface. From the outside, things may still look intact. But internally, the structure that once held you no longer quite does \u2014 and you know it, even if you can\u2019t yet name it.'

const ITEMS = [
  { num: '01', label: 'You\u2019ve outgrown something', body: 'A way of working, relating, or living that once fit \u2014 and no longer does.' },
  { num: '02', label: 'Something larger is asking to move through you', body: 'A sense of pull or pressure that isn\u2019t anxiety \u2014 it\u2019s calling.' },
  { num: '03', label: 'You\u2019re between identities', body: 'Clarity in some areas, but a lack of orientation in others \u2014 without language for where you are.' },
  { num: '04', label: 'You\u2019re not looking to be convinced', body: 'You already feel this. You\u2019re trying to understand what to do with it.' },
]

async function run() {
  const pool = new Pool({ connectionString: DATABASE_URI })
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // 1. Find the splitLeft block row for the home page
    const blockRes = await client.query<{ id: number }>(`
      SELECT b.id
      FROM   pages_blocks_split_left b
      JOIN   pages p ON p.id = b._parent_id
      WHERE  p.slug = 'home'
      LIMIT  1
    `)

    if (!blockRes.rows.length) {
      console.error('splitLeft block not found on home page.')
      await client.query('ROLLBACK')
      process.exit(1)
    }

    const blockId = blockRes.rows[0].id

    // 2. Update the block body
    await client.query(
      `UPDATE pages_blocks_split_left SET body = $1 WHERE id = $2`,
      [BODY, blockId]
    )

    // 3. Update each item row in-place (matched by _order)
    for (let i = 0; i < ITEMS.length; i++) {
      const { num, label, body } = ITEMS[i]
      const updated = await client.query(
        `UPDATE pages_blocks_split_left_items
            SET num = $1, label = $2, body = $3
          WHERE _parent_id = $4 AND _order = $5`,
        [num, label, body, blockId, i + 1]
      )
      if (updated.rowCount === 0) {
        // Row doesn't exist yet — insert it
        await client.query(
          `INSERT INTO pages_blocks_split_left_items (_order, _parent_id, num, label, body)
           VALUES ($1, $2, $3, $4, $5)`,
          [i + 1, blockId, num, label, body]
        )
      }
    }

    await client.query('COMMIT')
    console.log(`\u2713 "Do You Recognize This?" block updated with verbatim copy from markdown.`)
    console.log(`  block id: ${blockId} | body: ${BODY.slice(0, 60)}\u2026`)
    ITEMS.forEach((it, i) => console.log(`  item ${i + 1}: "${it.label.slice(0, 40)}\u2026"`))
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
    await pool.end()
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Update failed:', err.message)
    process.exit(1)
  })
