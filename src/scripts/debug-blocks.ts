import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })
  const r = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 1 })
  const page = r.docs[0]
  if (!page) { console.log('NO PAGE FOUND'); process.exit(1) }
  const blocks = page.blocks as Array<Record<string, unknown>>
  console.log('Total blocks:', blocks.length)
  blocks.forEach((b, i) => {
    console.log(`[${i}] blockType="${b.blockType}" sectionLabel="${b.sectionLabel}" heading="${String(b.heading || '').slice(0, 40)}"`)
  })
  process.exit(0)
}
main().catch(e => { console.error('ERROR:', e.message); process.exit(1) })
