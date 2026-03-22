// src/scripts/seed-accompanied.ts
// Inserts the "You Are Accompanied, Not Led" block into the home page
// immediately after the outcomes block, with verbatim copy from
// soul-initiation-program-copy.md (lines 126–133).
// Safe to run multiple times — idempotent (skips if already present).

import { getPayload } from 'payload'
import config from '@payload-config'

// Verbatim copy — do not edit without updating soul-initiation-program-copy.md
const VERBATIM = {
  blockType: 'accompanied' as const,
  sectionLabel: 'Guidance',
  heading: 'You Are Accompanied, Not Led',
  paragraph1:
    'Each guide in this program has crossed similar terrain themselves. This is not mentorship offered from a distance — it is presence offered from experience. They know what it is to not yet know where you are headed, and to stay in the process anyway.',
  paragraph2:
    'Their role is not to provide answers or to accelerate your crossing. It is to help you stay in relationship with what is genuinely unfolding — especially at the points where it would be easier to turn away, collapse into certainty, or retreat to familiar ground.',
  paragraph3:
    'This is not about authority. It is about presence, discernment, and steadiness in the work — offered by people who have earned it through their own passage.',
}

async function run() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
  })

  const page = result.docs[0]
  if (!page) {
    console.error('Home page not found — run `npm run seed` first.')
    process.exit(1)
  }

  const blocks = (page.blocks ?? []) as Array<Record<string, unknown>>

  // Idempotency check
  if (blocks.some((b) => b.blockType === 'accompanied')) {
    console.log('ℹ︎  "You Are Accompanied" block already present — skipping.')
    process.exit(0)
  }

  // Insert after the outcomes block
  const outcomesIdx = blocks.findIndex((b) => b.blockType === 'outcomes')
  const insertAt = outcomesIdx >= 0 ? outcomesIdx + 1 : blocks.length

  const updatedBlocks = [
    ...blocks.slice(0, insertAt),
    VERBATIM,
    ...blocks.slice(insertAt),
  ]

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { blocks: updatedBlocks },
    depth: 0,
  })

  console.log(
    `✓ "You Are Accompanied, Not Led" block seeded at position ${insertAt + 1} (after outcomes).`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
