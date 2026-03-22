import type { CollectionConfig } from 'payload'

import { Hero } from '@/blocks/Hero'
import { Marquee } from '@/blocks/Marquee'
import { SplitLeft } from '@/blocks/SplitLeft'
import { ThresholdStatement } from '@/blocks/ThresholdStatement'
import { SplitRight } from '@/blocks/SplitRight'
import { Process } from '@/blocks/Process'
import { WhatThisRequires } from '@/blocks/WhatThisRequires'
import { WhoItsFor } from '@/blocks/WhoItsFor'
import { Outcomes } from '@/blocks/Outcomes'
import { AccompaniedBlock } from '@/blocks/AccompaniedBlock'
import { GuidesBlock } from '@/blocks/GuidesBlock'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock'
import { Offer } from '@/blocks/Offer'
import { FAQsBlock } from '@/blocks/FAQsBlock'
import { FinalCTA } from '@/blocks/FinalCTA'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: () => true },
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL path — e.g. "home", "about"' } },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Hero, Marquee, SplitLeft, ThresholdStatement, SplitRight, Process, WhatThisRequires, WhoItsFor, Outcomes, AccompaniedBlock, GuidesBlock, TestimonialsBlock, Offer, FAQsBlock, FinalCTA],
    },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
}
