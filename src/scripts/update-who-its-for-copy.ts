// src/scripts/update-who-its-for-copy.ts
// Patches the "Who This Is For" whoItsFor block on the home page
// with verbatim copy from soul-initiation-program-copy.md (lines 100–114).
// Safe to run multiple times — idempotent.

import { getPayload } from 'payload'
import config from '@payload-config'

// Verbatim copy — do not edit without updating soul-initiation-program-copy.md
const VERBATIM = {
  sectionLabel: 'Who This Is For',
  heading: 'Not designed\nfor everyone.',
  body: 'This program is not designed for everyone \u2014 and that\u2019s intentional. It is designed for people at a particular kind of moment. If you recognize yourself here, that recognition matters.',
  fitsHeading: 'This Tends To Be A Fit For People Who:',
  items: [
    { text: 'Sense that something in their life is shifting at a deeper level' },
    { text: 'Have already done significant inner or outer work' },
    { text: 'Are not looking for quick answers, but for real orientation' },
    { text: 'Feel ready to engage something meaningful, even if it\u2019s uncertain' },
  ],
  notFitHeading: 'This Is Likely Not A Fit If You:',
  notFitItems: [
    { text: 'Are primarily seeking clarity without willingness to change' },
    { text: 'Want a defined outcome or guaranteed transformation' },
    { text: 'Are not in a place to make real space for this level of engagement' },
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
    if (block.blockType === 'whoItsFor') {
      patched = true
      return { ...block, ...VERBATIM }
    }
    return block
  })

  if (!patched) {
    console.error('No whoItsFor block found on home page.')
    process.exit(1)
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { blocks: updatedBlocks },
  })

  console.log('✓ "Who This Is For" block updated with verbatim copy from markdown.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
