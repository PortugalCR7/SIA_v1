export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'

import RevealProvider from '@/components/RevealProvider'
import PageLoader from '@/components/PageLoader'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import HeroSection from '@/components/blocks/HeroSection'
import MarqueeSection from '@/components/blocks/MarqueeSection'
import SplitLeftSection from '@/components/blocks/SplitLeftSection'
import ThresholdStatementSection from '@/components/blocks/ThresholdStatementSection'
import SplitRightSection from '@/components/blocks/SplitRightSection'
import ProcessSection from '@/components/blocks/ProcessSection'
import WhatThisRequiresSection from '@/components/blocks/WhatThisRequiresSection'
import WhoItsForSection from '@/components/blocks/WhoItsForSection'
import OutcomesSection from '@/components/blocks/OutcomesSection'
import GuidesSection from '@/components/blocks/GuidesSection'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import OfferSection from '@/components/blocks/OfferSection'
import FAQSection from '@/components/blocks/FAQSection'
import FinalCTASection from '@/components/blocks/FinalCTASection'

interface MarqueeItem {
  text: string
}

/* eslint-disable @typescript-eslint/no-explicit-any -- CMS blocks are dynamic; props are spread directly from Payload */
function renderBlock(block: any, siteConfig: any) {
  switch (block.blockType) {
    case 'hero':
      return <HeroSection key={block.id} {...block} />
    case 'marquee':
      return <MarqueeSection key={block.id} row1={siteConfig.marqueeRow1?.map((r: MarqueeItem) => r.text) ?? []} row2={siteConfig.marqueeRow2?.map((r: MarqueeItem) => r.text) ?? []} />
    case 'splitLeft':
      return <SplitLeftSection key={block.id} {...block} />
    case 'thresholdStatement':
      return <ThresholdStatementSection key={block.id} {...block} />
    case 'splitRight':
      return <SplitRightSection key={block.id} {...block} />
    case 'process':
      return <ProcessSection key={block.id} {...block} />
    case 'whatThisRequires':
      return <WhatThisRequiresSection key={block.id} {...block} />
    case 'whoItsFor':
      return <WhoItsForSection key={block.id} {...block} />
    case 'outcomes':
      return <OutcomesSection key={block.id} {...block} />
    case 'guides':
      return <GuidesSection key={block.id} {...block} />
    case 'testimonials':
      return <TestimonialsSection key={block.id} {...block} />
    case 'offer':
      return <OfferSection key={block.id} {...block} />
    case 'faqs':
      return <FAQSection key={block.id} {...block} />
    case 'finalCta':
      return <FinalCTASection key={block.id} {...block} />
    default:
      return null
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async function Home() {
  const payload = await getPayload({ config })

  const siteConfig = await payload.findGlobal({ slug: 'site-config' })

  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 2,
  })

  const page = pageResult.docs[0]
  if (!page) return <div>Page not found</div>

  return (
    <RevealProvider>
      <main className="bg-ink min-h-screen">
        <PageLoader />
        <Nav
          siteTitle={siteConfig.siteTitle}
          navLinks={siteConfig.navLinks}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- CMS blocks are dynamic from Payload */}
        {page.blocks?.map((block: any) => renderBlock(block, siteConfig))}
        <Footer
          siteTitle={siteConfig.siteTitle}
          brandTagline={siteConfig.brandTagline ?? ''}
          contactEmail={siteConfig.contactEmail}
          establishedLine={siteConfig.establishedLine ?? ''}
          copyrightText={siteConfig.copyrightText ?? ''}
          socialLinks={siteConfig.socialLinks}
        />
      </main>
    </RevealProvider>
  )
}
