import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xgaemrvenyqnmzwylgsk.supabase.co',
      },
    ],
  },
}

export default withPayload(nextConfig)
