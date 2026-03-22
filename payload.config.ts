import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Pages } from './src/collections/Pages.ts'
import { Offers } from './src/collections/Offers.ts'
import { Testimonials } from './src/collections/Testimonials.ts'
import { FAQs } from './src/collections/FAQs.ts'
import { Media } from './src/collections/Media.ts'
import { Users } from './src/collections/Users.ts'
import { Guides } from './src/collections/Guides.ts'
import { SiteConfig } from './src/globals/SiteConfig.ts'

const dirname = path.resolve()

export default buildConfig({
  admin: {
    theme: 'dark',
    user: Users.slug,
    components: {
      Nav: '/src/components/admin/AdminNav#default',
      graphics: {
        Logo: '/src/components/admin/AdminLogo#default',
        Icon: '/src/components/admin/AdminIcon#default',
      },
      views: {
        dashboard: {
          Component: '/src/components/admin/Dashboard#default',
        },
        login: {
          Component: '/src/components/admin/LoginPage#default',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Pages, Offers, Testimonials, FAQs, Guides, Media, Users],
  globals: [SiteConfig],
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      LinkFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      max: 3,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  }),
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          defaultFromAddress: process.env.EMAIL_FROM || 'noreply@soulinitiation.com',
          defaultFromName: 'Soul Initiation Academy',
          apiKey: process.env.RESEND_API_KEY,
        }),
      }
    : {}),
  sharp,
})
