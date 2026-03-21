// src/scripts/seed.ts
import { getPayload } from 'payload'
import config from '@payload-config'

// Helper: build a properly-structured Lexical richText value from plain paragraph strings
function makeLexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        children: [{ type: 'text', version: 1, text }],
      })),
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding SiteConfig...')
  await payload.updateGlobal({
    slug: 'site-config',
    data: {
      siteTitle: 'Soul Initiation Academy',
      contactEmail: 'apply@soulinitiationacademy.com',
      copyrightText: '\u00A9 2026 Soul Initiation Arc \u00B7 All rites reserved.',
      establishedLine: '444 \u00B7 EST. MMXXIV',
      brandTagline: 'A private institution for mature soul-initiation practices.',
      navLinks: [],
      socialLinks: [
        { platform: 'instagram', url: 'https://www.instagram.com/soulinitiationacademy' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/soulinitiationacademy' },
      ],
      marqueeRow1: [
        { text: 'Soul Initiation Academy' },
        { text: 'Cross the Threshold' },
        { text: 'Six Months \u00B7 Cohort of 8' },
        { text: 'April 2026' },
        { text: 'Application Required' },
        { text: 'A Guided Crossing' },
        { text: 'Not a Course. A Rite of Passage.' },
      ],
      marqueeRow2: [
        { text: 'Separation \u00B7 Descent \u00B7 Threshold \u00B7 Return' },
        { text: 'The Work Beneath the Work' },
        { text: 'Soul. Not Ego.' },
        { text: 'Cohort VIII \u00B7 April MMXXVI' },
        { text: 'What Cannot Be Rushed' },
        { text: 'Witness. Hold. Guide.' },
        { text: 'The Crossing Begins' },
      ],
    },
  })

  // Idempotency: skip if already seeded
  console.log('Seeding Testimonials...')
  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
  let testimonialDocs: any[] = []
  if (existingTestimonials.totalDocs > 0) {
    console.log('  Testimonials already seeded — loading existing IDs')
    const all = await payload.find({ collection: 'testimonials', limit: 10 })
    testimonialDocs = all.docs
  } else {
    const testimonials = [
      { quote: 'I didn\u2019t need more insight. I needed a way to move.', name: 'S.M.', role: 'Executive, Cohort 2024', order: 1 },
      { quote: 'Something shifted \u2014 from the root, not the surface.', name: 'A.R.', role: 'Architect, Cape Town', order: 2 },
      { quote: 'It gave me a way to stay with what I was sensing.', name: 'J.K.', role: 'Therapist, Cohort 2025', order: 3 },
    ]
    for (const t of testimonials) {
      const doc = await payload.create({ collection: 'testimonials', data: t })
      testimonialDocs.push(doc)
    }
  }

  console.log('Seeding FAQs...')
  const existingFAQs = await payload.find({ collection: 'faqs', limit: 1 })
  let faqDocs: any[] = []
  if (existingFAQs.totalDocs > 0) {
    console.log('  FAQs already seeded — loading existing IDs')
    const all = await payload.find({ collection: 'faqs', limit: 10 })
    faqDocs = all.docs
  } else {
    const faqData = [
      {
        question: 'How is this different from other coaching or transformation programs?',
        paragraphs: [
          'Most programs work on the level of behavior, mindset, or strategy. Soul Initiation works at the level of identity and soul.',
          'We are not here to optimize who you are \u2014 we are here to help you discover who you actually are beneath the roles, the achievements, and the constructed self.',
        ],
        order: 1,
      },
      {
        question: 'Is this a spiritual or religious program?',
        paragraphs: [
          'Soul Initiation Academy is not affiliated with any religion. We draw on the archetypal wisdom present across many traditions \u2014 but the work is experiential, not doctrinal.',
          'You bring your own cosmology. We simply create the depth of container for it to be lived.',
        ],
        order: 2,
      },
      {
        question: 'Do I need to have done therapy or previous inner work?',
        paragraphs: [
          'This program is designed for people who have already done meaningful inner work \u2014 therapy, retreat, ceremony, mentorship. This is not an entry-level offering.',
          'If you are new to personal development, we recommend beginning there first. This is for those who have already been walking the path.',
        ],
        order: 3,
      },
      {
        question: 'What is the time commitment?',
        paragraphs: [
          'Weekly group sessions run 90 minutes. We recommend an additional 1\u20132 hours per week for reflection, journaling, and integration.',
          'Depth requires space. The program runs for six months.',
        ],
        order: 4,
      },
      {
        question: 'What happens after I apply?',
        paragraphs: [
          'We will reach out within 3 business days to schedule a conversation.',
          'This call is not a sales call \u2014 it is a genuine exploration of whether this program and cohort are the right fit for you at this moment. Mutual discernment matters to us.',
        ],
        order: 5,
      },
      {
        question: 'Why only 8 initiates per cohort?',
        paragraphs: [
          'The depth this work requires cannot happen in a large group. Eight people is deliberate.',
          'It creates the intimacy, safety, and collective field necessary for genuine initiation. Every cohort becomes its own sacred container.',
        ],
        order: 6,
      },
    ]
    for (const f of faqData) {
      const doc = await payload.create({
        collection: 'faqs',
        data: { question: f.question, answer: makeLexical(f.paragraphs), order: f.order },
      })
      faqDocs.push(doc)
    }
  }

  console.log('Seeding Guides...')
  const existingGuides = await payload.find({ collection: 'guides', limit: 1 })
  let guideDocs: any[] = []
  if (existingGuides.totalDocs > 0) {
    console.log('  Guides already seeded — loading existing IDs')
    const all = await payload.find({ collection: 'guides', limit: 10 })
    guideDocs = all.docs
  } else {
    const guidesData = [
      { title: 'The Art of Listening', role: 'Orientation Guide', body: 'A practice for meeting the silence before a crossing.', order: 1 },
      { title: 'Archetypal Descent', role: 'Mapping Guide', body: 'Exploration of patterns when identity shifts.', order: 2 },
      { title: 'Ritual & Threshold', role: 'Ceremony Guide', body: 'Foundational structures for marking transitions.', order: 3 },
    ]
    for (const g of guidesData) {
      const doc = await payload.create({ collection: 'guides', data: g })
      guideDocs.push(doc)
    }
  }

  // Idempotency: skip home page if already exists
  console.log('Seeding Home page...')
  const existingHome = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
  if (existingHome.totalDocs > 0) {
    console.log('  Home page already seeded — skipping.')
    console.log('Seed complete!')
    process.exit(0)
  }

  // Create page with relationship IDs inline (single step — no update pass needed)
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      seoTitle: 'Soul Initiation Academy — Cross the Threshold',
      seoDescription: 'A six-month rite of passage for successful but unfulfilled visionaries seeking breakthrough. Not a course. A crossing.',
      blocks: [
        {
          blockType: 'hero',
          sectionLabel: 'Soul Initiation Academy',
          headline: "You've Done the Work.",
          subheadline: "But Something in You Knows You Haven\u2019t Crossed Yet.",
          statBar: [
            { label: 'Cohort', value: '8' },
            { label: 'Duration', value: '6 Months' },
            { label: 'Begins', value: 'April 2026' },
          ],
          ctaLabel: 'Begin Your Application',
          ctaUrl: '#apply',
        },
        { blockType: 'marquee' },
        {
          blockType: 'splitLeft',
          sectionLabel: 'Do You Recognize This?',
          heading: 'There are moments when something begins to shift beneath the surface.',
          body: 'From the outside, things may still look intact. But internally, the structure that once held you no longer quite does.',
          items: [
            { num: '01', label: 'You\u2019ve outgrown something', body: 'A way of living that once fit \u2014 and no longer does.' },
            { num: '02', label: 'Something larger is asking to move through you', body: 'A sense of pressure that isn\u2019t anxiety \u2014 it\u2019s calling.' },
            { num: '03', label: 'You\u2019re between identities', body: 'Without language for where you are \u2014 but knowing you can\u2019t go back.' },
            { num: '04', label: 'You\u2019re not looking to be convinced', body: 'You already feel this. You\u2019re trying to understand what to do.' },
          ],
        },
        {
          blockType: 'thresholdStatement',
          sectionLabel: 'This Is Not Confusion',
          headline: "It's a",
          emphasisWord: 'Threshold.',
          quote: 'A genuine life threshold is not a problem to be solved. It is a passage to be moved through.',
          quoteCaption: 'In traditional cultures, these crossings were marked, held, and guided. In modern life, they rarely are.',
          collapseLabel: 'The Modern Collapse:',
          collapseItems: [
            { label: 'Prolonged uncertainty', body: 'The waiting stretches without forward movement.' },
            { label: 'Looping reflection', body: 'The same questions cycling without resolution.' },
            { label: 'Quiet stagnation', body: 'Something real is happening without being named.' },
          ],
        },
        {
          blockType: 'splitRight',
          sectionLabel: 'The Soul Initiation Program',
          heading: 'A structured threshold.',
          body: 'A six-month container \u2014 not a course, not a retreat, not coaching. A rite of passage.',
          notItems: [
            { text: 'A course or curriculum' },
            { text: 'Coaching or therapy' },
            { text: 'A peak experience' },
            { text: 'A guaranteed outcome' },
          ],
          isItems: [
            { text: 'A rite of passage' },
            { text: 'A guided crossing' },
            { text: 'A space for identity shift' },
            { text: 'Lived, structured' },
          ],
        },
        {
          blockType: 'process',
          sectionLabel: 'How It Works',
          heading: 'The Arc of Initiation',
          subheading: 'adapted from the deep logic of rites of passage for contemporary life.',
          phases: [
            { numeral: 'I', name: 'Separation', body: 'Stepping back from the structures and roles that shaped your life.' },
            { numeral: 'II', name: 'Descent', body: 'Developing a living relationship with a deeper layer of intelligence \u2014 Soul.' },
            { numeral: 'III', name: 'Threshold', body: 'A one-day solo ceremony in nature \u2014 the SoulQuest \u2014 marking the actual crossing.' },
            { numeral: 'IV', name: 'Return', body: 'Re-entering your life with a different orientation \u2014 and learning how to live from it.' },
          ],
        },
        {
          blockType: 'whatThisRequires',
          sectionLabel: 'What This Requires',
          heading: 'This work asks something real of you.',
          stats: [
            { label: 'Duration', value: '6 Months', note: 'April through September 2026' },
            { label: 'Time / Week', value: '4\u20136 Hours', note: 'Sessions and practice' },
            { label: 'Group Sessions', value: '12 Live', note: 'Via Zoom' },
            { label: '1:1 Mentoring', value: '12 Sessions', note: 'One-on-one support' },
            { label: 'The SoulQuest', value: '1 Day Solo', note: 'A ceremony in nature' },
            { label: 'Integration', value: 'Built In', note: 'Guided return support' },
          ],
        },
        {
          blockType: 'whoItsFor',
          sectionLabel: 'Who This Is For',
          heading: 'Not designed\nfor everyone.',
          items: [
            { text: 'Sense that something in life is shifting at a deeper level' },
            { text: 'Have already done significant inner or outer work' },
            { text: 'Are not looking for quick answers' },
            { text: 'Feel ready to engage something meaningful' },
          ],
        },
        {
          blockType: 'outcomes',
          sectionLabel: 'What Tends to Change',
          heading: 'The reorganization is felt from the inside out.',
          changes: [
            { label: 'Clearer direction', body: 'A growing sense of what you are oriented toward.' },
            { label: 'Decisions that hold', body: 'Choices rooted in something more stable than mood.' },
            { label: 'A living relationship with depth', body: 'An ongoing connection with a deeper intelligence.' },
            { label: 'Life gathering around a new center', body: 'What was ambiguous becomes more legible.' },
          ],
        },
        {
          blockType: 'guides',
          sectionLabel: 'Threshold Documents',
          heading: 'Foundations for the crossing',
          guides: [],
        },
        {
          blockType: 'testimonials',
          sectionLabel: 'Participants',
          heading: 'Words from the threshold',
          testimonials: [],
        },
        {
          blockType: 'offer',
          sectionLabel: 'Investment & Application',
          heading: 'Soul Initiation Program',
          subheading: 'April through September 2026 \u00B7 6\u201312 participants',
          stepsHeading: 'The next step',
          steps: [
            { label: 'Submit your application', body: 'A short form to help us understand where you are.' },
            { label: 'Receive the full guide', body: 'Complete details on schedule and practices.' },
            { label: 'Optional conversation', body: 'Explore whether this is the right fit.' },
            { label: 'Invitation to join', body: 'If the program aligns, receive an invitation.' },
          ],
          investmentLabel: 'Investment',
          investmentHeadline: 'Founding Cohort Rate',
          investmentBody: 'Disclosed upon application. Payment plans available.',
          ctaLabel: 'Begin Your Application',
          ctaUrl: '#apply-form',
        },
        {
          blockType: 'faqs',
          sectionLabel: 'FAQ',
          heading: 'Questions at the Threshold',
          faqs: [],
        },
        {
          blockType: 'finalCta',
          sectionLabel: '',
          headline: 'The threshold is here.',
          body: '',
          ctaLabel: 'Cross the Threshold \u2014 Apply for April 2026',
          ctaUrl: '#apply-form',
        },
      ],
    },
  })

  // Update relationship fields with created doc IDs
  const homePage = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })
  if (homePage.docs[0]) {
    const blocks = homePage.docs[0].blocks as any[]
    const updatedBlocks = blocks.map((block: any) => {
      if (block.blockType === 'guides') {
        return { ...block, guides: guideDocs.map((d) => d.id) }
      }
      if (block.blockType === 'testimonials') {
        return { ...block, testimonials: testimonialDocs.map((d) => d.id) }
      }
      if (block.blockType === 'faqs') {
        return { ...block, faqs: faqDocs.map((d) => d.id) }
      }
      return block
    })

    await payload.update({
      collection: 'pages',
      id: homePage.docs[0].id,
      data: { blocks: updatedBlocks },
    })
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
