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

import { Pages } from '@/collections/Pages'
import { Offers } from '@/collections/Offers'
import { Testimonials } from '@/collections/Testimonials'
import { FAQs } from '@/collections/FAQs'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'
import { Guides } from '@/collections/Guides'
import { SiteConfig } from '@/globals/SiteConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    push: true,
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
