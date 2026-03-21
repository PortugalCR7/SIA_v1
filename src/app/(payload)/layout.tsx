import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap.js'
import { serverFunction } from '@/app/(payload)/serverFunction'

type LayoutArgs = {
  children: React.ReactNode
}

const Layout = async ({ children }: LayoutArgs) => {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

export default Layout
