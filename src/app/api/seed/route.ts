import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // ─────────────────────────────────────────
  // 0. Admin User — upsert (delete + recreate)
  // ─────────────────────────────────────────
  const existingUsers = await payload.find({ collection: 'users', limit: 100 })
  await Promise.all(
    existingUsers.docs.map((doc) => payload.delete({ collection: 'users', id: doc.id })),
  )
  await payload.create({
    collection: 'users',
    data: {
      email: 'david@david.com',
      password: 'david123',
    },
  })

  // ─────────────────────────────────────────
  // 1. Testimonials — wipe all, recreate clean
  // ─────────────────────────────────────────
  const existing = await payload.find({ collection: 'testimonials', limit: 100 })
  await Promise.all(
    existing.docs.map((doc) => payload.delete({ collection: 'testimonials', id: doc.id })),
  )

  const [t1, t2, t3] = await Promise.all([
    payload.create({
      collection: 'testimonials',
      data: {
        name: 'Participant',
        quote: "I didn't need more insight. I needed a way to move.",
        featured: true,
        order: 1,
      },
    }),
    payload.create({
      collection: 'testimonials',
      data: {
        name: 'Participant',
        quote: 'Something in my life finally shifted — from the root, not the surface.',
        featured: true,
        order: 2,
      },
    }),
    payload.create({
      collection: 'testimonials',
      data: {
        name: 'Participant',
        quote: 'It gave me a way to stay with what I was already sensing, instead of bypassing it.',
        featured: true,
        order: 3,
      },
    }),
  ])

  // ─────────────────────────────────────────
  // 2. Offer — upsert by slug
  // ─────────────────────────────────────────
  const existingOffer = await payload.find({
    collection: 'offers',
    where: { slug: { equals: 'soul-initiation-program' } },
  })
  if (existingOffer.docs.length === 0) {
    await payload.create({
      collection: 'offers',
      data: {
        name: 'Soul Initiation Program',
        slug: 'soul-initiation-program',
        tagline:
          'A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through.',
        ctaLabel: 'Apply Now',
        ctaUrl: '/apply',
        isActive: true,
      },
    })
  }

  // ─────────────────────────────────────────
  // 3. SiteConfig global
  // ─────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-config',
    data: {
      siteTitle: 'Soul Initiation Academy',
      brandTagline:
        'A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through.',
      marqueeRow1: [
        { text: 'Soul Initiation Program' },
        { text: 'April 2026' },
        { text: '6 Months' },
        { text: 'Small Cohort · 6–12' },
        { text: 'Application Required' },
        { text: 'Group + 1:1 Mentoring' },
        { text: 'The SoulQuest' },
        { text: 'A Rite of Passage' },
      ],
      marqueeRow2: [
        { text: 'Separation' },
        { text: 'Descent' },
        { text: 'Threshold' },
        { text: 'Return' },
        { text: 'A Guided Crossing' },
        { text: 'Soul Initiation Academy' },
        { text: 'Founded in Purpose' },
        { text: 'Real Transition' },
      ],
    },
  })

  // ─────────────────────────────────────────
  // 4. Home page — upsert by slug
  // ─────────────────────────────────────────
  const pageBlocks = [
    // ── Hero ─────────────────────────────────────────────────────────────
    {
      blockType: 'hero',
      sectionLabel: 'Soul Initiation Academy',
      headline: "You've Done the Work. But Something in You Knows You Haven't Crossed Yet.",
      subheadline:
        'A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through.',
      statBar: [
        { label: 'Duration', value: '6 Months' },
        { label: 'Participants', value: '6–12 max' },
        { label: 'Format', value: 'Group + 1:1' },
        { label: 'Begins', value: 'April 2026' },
      ],
      ctaLabel: 'Apply Now',
      ctaUrl: '/apply',
    },

    // ── Do You Recognize This? ────────────────────────────────────────────
    {
      blockType: 'splitLeft',
      sectionLabel: 'Recognition',
      heading: 'Do You Recognize This?',
      body: "There are moments in life when something begins to shift beneath the surface. From the outside, things may still look intact. But internally, the structure that once held you no longer quite does — and you know it, even if you can't yet name it.",
      items: [
        {
          num: '01',
          label: "You've outgrown something",
          body: 'A way of working, relating, or living that once fit — and no longer does.',
        },
        {
          num: '02',
          label: 'Something larger is asking to move through you',
          body: "A sense of pull or pressure that isn't anxiety — it's calling.",
        },
        {
          num: '03',
          label: "You're between identities",
          body: 'Clarity in some areas, but a lack of orientation in others — without language for where you are.',
        },
        {
          num: '04',
          label: "You're not looking to be convinced",
          body: "You already feel this. You're trying to understand what to do with it.",
        },
      ],
    },

    // ── This Is Not Confusion. It's a Threshold. ─────────────────────────
    {
      blockType: 'thresholdStatement',
      sectionLabel: 'Orientation',
      headline: "This Is Not Confusion. It's a Threshold.",
      emphasisWord: 'Threshold.',
      quote:
        'A genuine life threshold is not a problem to be solved. It is a passage to be moved through — a moment when one chapter has ended and another has not yet fully begun. In traditional cultures, these crossings were marked, held, and guided.\n\nIn modern life, they rarely are.',
      quoteCaption: 'What a threshold actually is',
      collapseLabel: 'What happens without structure',
      collapseItems: [
        {
          label: 'Prolonged uncertainty',
          body: 'The waiting stretches without a sense of forward movement.',
        },
        {
          label: 'Looping reflection',
          body: 'The same questions cycling without resolution or relief.',
        },
        {
          label: 'Quiet stagnation',
          body: 'Not because something is wrong — but because something real is happening without being named.',
        },
      ],
    },

    // ── The Soul Initiation Program ───────────────────────────────────────
    {
      blockType: 'splitRight',
      sectionLabel: 'The Program',
      heading: 'The Soul Initiation Program',
      body: 'A structured threshold. A six-month container designed to support a specific kind of transition: the reorganization of your life around a deeper center.',
      notItems: [
        { text: 'A course or curriculum' },
        { text: 'Coaching or therapy' },
        { text: 'A peak experience or retreat' },
        { text: 'A defined path to a guaranteed outcome' },
      ],
      isItems: [
        { text: 'A rite of passage' },
        { text: 'A guided crossing' },
        { text: 'A space where identity can shift — without being rushed or forced' },
        { text: 'Lived, structured, and supported from beginning to end' },
      ],
    },

    // ── Mistaken Identity ─────────────────────────────────────────────────
    {
      blockType: 'thresholdStatement',
      sectionLabel: '',
      headline: 'Most people are not lost.',
      emphasisWord: 'lost.',
      quote:
        "Most people are not lost. They are living from a structure that is no longer true.\n\nYou could call it a kind of mistaken identity. The issue isn't a lack of insight — you likely have plenty of that. The issue is that your life is still organized around something you've already outgrown. Your habits, choices, and sense of self are still shaped by an older version of who you were.\n\nInitiation is what allows that structure to loosen — and something more aligned to take its place. Not by force, and not through more understanding alone, but through a process that works at the level where the structure actually lives.",
      quoteCaption:
        'The insight was never the missing piece. The missing piece was a structure capable of honoring what is actually happening — and supporting you through it.',
      collapseLabel: '',
      collapseItems: [],
    },

    // ── The Arc of Initiation ─────────────────────────────────────────────
    {
      blockType: 'process',
      sectionLabel: 'How It Works',
      heading: 'The Arc of Initiation',
      subheading:
        'The program follows a time-tested structure drawn from the deep logic of rites of passage — adapted for the conditions of contemporary life. Each phase builds on the one before it.',
      phases: [
        {
          numeral: '1',
          name: 'Separation',
          body: 'Stepping back from the structures, identities, and roles that have shaped your life — creating the necessary space for something new to emerge.',
        },
        {
          numeral: '2',
          name: 'Descent',
          body: 'Developing a living relationship with a deeper layer of intelligence — what this work calls Soul. Learning to listen to what has been speaking beneath the noise.',
        },
        {
          numeral: '3',
          name: 'Threshold',
          body: 'A one-day solo ceremony in nature — the SoulQuest — marking the actual crossing. A moment held by the earth, the silence, and the work that came before.',
        },
        {
          numeral: '4',
          name: 'Return',
          body: 'Re-entering your life with a different orientation — and learning, with support, how to actually live from it in the day-to-day.',
        },
      ],
    },

    // ── What This Requires ────────────────────────────────────────────────
    {
      blockType: 'whatThisRequires',
      sectionLabel: 'Commitment',
      heading: 'What This Requires',
      stats: [
        { label: 'Duration', value: '6 months', note: 'April through September 2026' },
        {
          label: 'Time Commitment',
          value: '4–6 hours per week',
          note: 'sessions, practice, and integration',
        },
        {
          label: 'Group Sessions',
          value: '12 live sessions',
          note: 'via Zoom — recordings available',
        },
        {
          label: '1:1 Mentoring',
          value: '12 private sessions',
          note: 'one-on-one support throughout',
        },
        {
          label: 'The SoulQuest',
          value: 'One day solo',
          note: 'a threshold ceremony held in nature',
        },
        {
          label: 'Integration',
          value: 'Built in',
          note: 'Guided preparation and ongoing return support',
        },
      ],
    },

    // ── Who This Is For ───────────────────────────────────────────────────
    {
      blockType: 'whoItsFor',
      sectionLabel: 'Fit',
      heading: 'Who This Is For',
      items: [
        { text: 'Sense that something in their life is shifting at a deeper level' },
        { text: 'Have already done significant inner or outer work' },
        { text: 'Are not looking for quick answers, but for real orientation' },
        { text: "Feel ready to engage something meaningful, even if it's uncertain" },
      ],
    },

    // ── What Tends to Change ──────────────────────────────────────────────
    {
      blockType: 'outcomes',
      sectionLabel: 'What Changes',
      heading: 'What Tends to Change',
      changes: [
        {
          label: 'Clearer direction',
          body: 'A growing sense of what you are oriented toward — even when the full path is still unfolding.',
        },
        {
          label: 'Decisions that hold',
          body: 'Choices that feel less tentative, less revisited — rooted in something more stable than mood or circumstance.',
        },
        {
          label: 'A living relationship with depth',
          body: 'An ongoing, felt connection with a deeper layer of intelligence — not as an idea, but as something you can actually access.',
        },
        {
          label: 'Life gathering around a new center',
          body: 'What was previously ambiguous becomes more legible — not because everything is resolved, but because you are no longer relating to your life in the same way.',
        },
      ],
    },

    // ── You Are Accompanied, Not Led ──────────────────────────────────────
    {
      blockType: 'thresholdStatement',
      sectionLabel: 'Guides',
      headline: 'You Are Accompanied, Not Led.',
      emphasisWord: 'Accompanied,',
      quote:
        'Each guide in this program has crossed similar terrain themselves. This is not mentorship offered from a distance — it is presence offered from experience. They know what it is to not yet know where you are headed, and to stay in the process anyway.\n\nTheir role is not to provide answers or to accelerate your crossing. It is to help you stay in relationship with what is genuinely unfolding — especially at the points where it would be easier to turn away, collapse into certainty, or retreat to familiar ground.\n\nThis is not about authority. It is about presence, discernment, and steadiness in the work — offered by people who have earned it through their own passage.',
      quoteCaption: '',
      collapseLabel: '',
      collapseItems: [],
    },

    // ── What Participants Have Said ───────────────────────────────────────
    {
      blockType: 'testimonials',
      sectionLabel: 'Voices',
      heading: 'What Participants Have Said',
      testimonials: [t1.id, t2.id, t3.id],
    },

    // ── Investment & Application ──────────────────────────────────────────
    {
      blockType: 'offer',
      sectionLabel: 'Investment & Application',
      heading: 'Investment & Application',
      subheading: 'Founding Cohort Rate',
      investmentLabel: 'Investment',
      investmentHeadline: 'Founding Cohort Rate',
      investmentBody:
        'Payment plans available upon request.\n\nThis is a serious commitment — both financially and personally. The founding cohort rate reflects the real value of the work and the intimacy of the container.',
      stepsHeading: 'What the Next Step Looks Like',
      steps: [
        {
          label: 'Submit your application',
          body: 'A short form to help us understand where you are and what is calling you forward.',
        },
        {
          label: 'Receive the full program guide',
          body: 'Complete details on structure, schedule, practices, and the SoulQuest ceremony.',
        },
        {
          label: 'Optional conversation',
          body: "If you'd like to explore whether this is the right fit before deciding.",
        },
        {
          label: 'Invitation to join',
          body: "If the program aligns, you'll receive an invitation to confirm your place in the cohort.",
        },
      ],
      ctaLabel: 'Apply Now',
      ctaUrl: '/apply',
    },

    // ── Final CTA ─────────────────────────────────────────────────────────
    {
      blockType: 'finalCta',
      sectionLabel: '',
      headline: 'If You Recognize Yourself in This, You May Already Be at the Threshold.',
      body: 'This work is designed precisely for the moment you are in — when something real is happening and you need more than another framework to understand it. You need a structure capable of holding the actual crossing.\n\nThe April 2026 cohort is small by design. If this speaks to something in you, the application is the first step.',
      ctaLabel: 'Apply Now',
      ctaUrl: '/apply',
    },
  ]

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })

  if (existingPage.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      data: {
        title: 'Home',
        slug: 'home',
        seoTitle: 'Soul Initiation Program · April 2026',
        seoDescription:
          'A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through.',
        blocks: pageBlocks,
      },
    })
  } else {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        seoTitle: 'Soul Initiation Program · April 2026',
        seoDescription:
          'A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through.',
        blocks: pageBlocks,
      },
    })
  }

  return NextResponse.json({
    ok: true,
    message: 'Seed complete.',
    testimonials: [t1.id, t2.id, t3.id],
  })
}
