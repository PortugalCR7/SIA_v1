'use client'

import React from 'react'
import { useConfig } from '@payloadcms/ui'
import { useAuth } from '@payloadcms/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const collectionIcons: Record<string, string> = {
  pages: '◇',
  offers: '✦',
  testimonials: '❝',
  faqs: '?',
  guides: '☽',
  media: '◎',
  users: '⚙',
}

const navGroups = [
  { label: 'Overview', items: [{ type: 'link' as const, label: 'Dashboard', href: '/admin', icon: '⬡' }] },
  {
    label: 'Content',
    items: [
      { type: 'collection' as const, slug: 'pages', label: 'Pages' },
      { type: 'collection' as const, slug: 'offers', label: 'Offers' },
      { type: 'collection' as const, slug: 'testimonials', label: 'Testimonials' },
      { type: 'collection' as const, slug: 'faqs', label: 'FAQs' },
      { type: 'collection' as const, slug: 'guides', label: 'Guides' },
    ],
  },
  { label: 'Assets', items: [{ type: 'collection' as const, slug: 'media', label: 'Media' }] },
  {
    label: 'Settings',
    items: [
      { type: 'global' as const, slug: 'site-config', label: 'Site Config', href: '/admin/globals/site-config' },
      { type: 'collection' as const, slug: 'users', label: 'Users' },
    ],
  },
]

const AdminNav: React.FC = () => {
  useConfig()
  const { user } = useAuth()
  const pathname = usePathname()

  const getHref = (item: (typeof navGroups)[number]['items'][number]) => {
    if ('href' in item && item.href) return item.href
    if (item.type === 'collection') return `/admin/collections/${item.slug}`
    if (item.type === 'global') return `/admin/globals/${item.slug}`
    return '/admin'
  }

  const isActive = (item: (typeof navGroups)[number]['items'][number]) => {
    const href = getHref(item)
    if (href === '/admin') return pathname === '/admin'
    return pathname?.startsWith(href)
  }

  const userDisplay = (user as Record<string, unknown>)?.name
    ? String((user as Record<string, unknown>).name)
    : user?.email?.split('@')[0] || 'Admin'

  const userInitials = userDisplay
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <nav
      style={{
        width: 220,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#080808',
        borderRight: '1px solid rgba(180, 145, 85, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Jost', sans-serif",
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(180, 145, 85, 0.08)' }}>
        <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: '1px solid rgba(180, 145, 85, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div style={{ position: 'absolute', inset: 2, border: '1px solid rgba(180, 145, 85, 0.25)' }} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 10,
                fontWeight: 600,
                color: '#b49155',
                letterSpacing: '0.1em',
              }}
            >
              SIA
            </span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#b49155', lineHeight: 1.2 }}>Soul Initiation</div>
            <div style={{ fontSize: 9, color: 'rgba(224, 212, 188, 0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Admin CMS
            </div>
          </div>
        </Link>
      </div>

      {/* Nav groups */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {navGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: 4 }}>
            <div
              style={{
                padding: '10px 16px 4px',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(224, 212, 188, 0.25)',
              }}
            >
              {group.label}
            </div>
            {group.items.map((item) => {
              const active = isActive(item)
              const icon = 'slug' in item ? collectionIcons[item.slug] || '·' : ('icon' in item ? item.icon : '·')
              return (
                <Link
                  key={item.label}
                  href={getHref(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 16px',
                    textDecoration: 'none',
                    color: active ? '#b49155' : 'rgba(224, 212, 188, 0.55)',
                    fontSize: 13,
                    borderLeft: active ? '2px solid #b49155' : '2px solid transparent',
                    background: active ? 'rgba(180, 145, 85, 0.06)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'rgba(180, 145, 85, 0.04)'
                      e.currentTarget.style.color = 'rgba(224, 212, 188, 0.8)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'rgba(224, 212, 188, 0.55)'
                    }
                  }}
                >
                  <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer - user info */}
      {user && (
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid rgba(180, 145, 85, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(180, 145, 85, 0.12)',
              border: '1px solid rgba(180, 145, 85, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 600,
              color: '#b49155',
              letterSpacing: '0.05em',
              flexShrink: 0,
            }}
          >
            {userInitials}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(224, 212, 188, 0.7)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.email}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(224, 212, 188, 0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Admin
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default AdminNav
