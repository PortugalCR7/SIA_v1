import React from 'react'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap.js'

type LayoutArgs = {
  children: React.ReactNode
}

const Layout = async ({ children }: LayoutArgs) => {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={handleServerFunctions}>
      {children}
    </RootLayout>
  )
}

export default Layout
