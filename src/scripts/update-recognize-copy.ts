// src/scripts/update-recognize-copy.ts
// Patches the "Do You Recognize This?" splitLeft block on the home page
// with verbatim copy from soul-initiation-program-copy.md (lines 16–24).
// Safe to run multiple times — idempotent.

import { getPayload } from 'payload'
import config from '@payload-config'

// DB layout (post-admin-edit): sectionLabel="Recognition", heading="Do You Recognize This?"
// Full intro paragraph maps to body; bullet points map to items.
const VERBATIM = {
  body: 'There are moments in life when something begins to shift beneath the surface. From the outside, things may still look intact. But internally, the structure that once held you no longer quite does \u2014 and you know it, even if you can\u2019t yet name it.',
  items: [
    {
      num: '01',
      label: 'You\u2019ve outgrown something',
      body: 'A way of working, relating, or living that once fit \u2014 and no longer does.',
    },
    {
      num: '02',
      label: 'Something larger is asking to move through you',
      body: 'A sense of pull or pressure that isn\u2019t anxiety \u2014 it\u2019s calling.',
    },
    {
      num: '03',
      label: 'You\u2019re between identities',
      body: 'Clarity in some areas, but a lack of orientation in others \u2014 without language for where you are.',
    },
    {
      num: '04',
      label: 'You\u2019re not looking to be convinced',
      body: 'You already feel this. You\u2019re trying to understand what to do with it.',
    },
  ],
}

async function run() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) {
    console.error('Home page not found — run `npm run seed` first.')
    process.exit(1)
  }

  const blocks = page.blocks as Array<Record<string, unknown>>
  let patched = false

  const updatedBlocks = blocks.map((block) => {
    if (block.blockType === 'splitLeft') {
      patched = true
      return { ...block, ...VERBATIM }
    }
    return block
  })

  if (!patched) {
    console.error('No splitLeft block found on home page.')
    process.exit(1)
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { blocks: updatedBlocks },
  })

  console.log('✓ "Do You Recognize This?" block updated with verbatim copy from markdown.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
