import type { CollectionConfig } from 'payload'

import { Hero } from '../blocks/Hero.ts'
import { Marquee } from '../blocks/Marquee.ts'
import { SplitLeft } from '../blocks/SplitLeft.ts'
import { ThresholdStatement } from '../blocks/ThresholdStatement.ts'
import { SplitRight } from '../blocks/SplitRight.ts'
import { Process } from '../blocks/Process.ts'
import { WhatThisRequires } from '../blocks/WhatThisRequires.ts'
import { WhoItsFor } from '../blocks/WhoItsFor.ts'
import { Outcomes } from '../blocks/Outcomes.ts'
import { AccompaniedBlock } from '../blocks/AccompaniedBlock.ts'
import { GuidesBlock } from '../blocks/GuidesBlock.ts'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock.ts'
import { Offer } from '../blocks/Offer.ts'
import { FAQsBlock } from '../blocks/FAQsBlock.ts'
import { FinalCTA } from '../blocks/FinalCTA.ts'

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
