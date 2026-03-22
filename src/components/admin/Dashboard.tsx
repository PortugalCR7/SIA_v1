import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { DefaultTemplate } from '@payloadcms/next/templates'
import type { AdminViewProps } from 'payload'

const collectionMeta: Record<string, { icon: string; singular: string }> = {
  pages: { icon: '◇', singular: 'Page' },
  offers: { icon: '✦', singular: 'Offer' },
  testimonials: { icon: '❝', singular: 'Testimonial' },
  faqs: { icon: '?', singular: 'FAQ' },
  guides: { icon: '☽', singular: 'Guide' },
}

function timeAgo(date: string | Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const Dashboard: React.FC<AdminViewProps> = async ({ initPageResult }) => {
  const payload = await getPayload({ config })

  const collections = ['pages', 'offers', 'testimonials', 'faqs', 'guides', 'media'] as const

  const counts = await Promise.all(collections.map((c) => payload.count({ collection: c })))

  const countMap: Record<string, number> = {}
  collections.forEach((c, i) => {
    countMap[c] = counts[i].totalDocs
  })

  const totalRecords = Object.values(countMap).reduce((sum, n) => sum + n, 0)

  const activeOffers = await payload.count({
    collection: 'offers',
    where: { isActive: { equals: true } },
  })

  const featuredTestimonials = await payload.count({
    collection: 'testimonials',
    where: { featured: { equals: true } },
  })

  // Recent records for each collection (for "last edited" and activity feed)
  const recentByCollection = await Promise.all(
    (['pages', 'offers', 'testimonials', 'faqs', 'guides'] as const).map((c) =>
      payload.find({ collection: c, limit: 1, sort: '-updatedAt' }).then((r) => ({
        collection: c,
        doc: r.docs[0] || null,
      }))
    )
  )

  // Build activity feed — merge all recent, sort by updatedAt, take top 5
  const activityItems = recentByCollection
    .filter((r) => r.doc)
    .map((r) => ({
      collection: r.collection,
      title: (r.doc as Record<string, unknown>).name || (r.doc as Record<string, unknown>).title || (r.doc as Record<string, unknown>).question || r.collection,
      updatedAt: (r.doc as Record<string, unknown>).updatedAt as string,
    }))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const user = initPageResult?.req?.user
  const userName = (user as Record<string, unknown>)?.name
    ? String((user as Record<string, unknown>).name)
    : user?.email?.split('@')[0] || 'Admin'

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const cardStyle: React.CSSProperties = {
    background: 'rgba(20, 20, 20, 0.6)',
    border: '1px solid rgba(180, 145, 85, 0.15)',
    borderRadius: 8,
    padding: '20px',
    transition: 'border-color 0.2s',
  }

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      user={initPageResult.req.user ?? undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <div
        style={{
          minHeight: '100vh',
          background: '#000000',
          fontFamily: "'Jost', sans-serif",
          color: '#e0d4bc',
          padding: '0 32px 48px',
        }}
      >
        {/* Grid texture overlay */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(180, 145, 85, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 145, 85, 0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Topbar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 0 32px',
              borderBottom: '1px solid rgba(180, 145, 85, 0.08)',
              marginBottom: 32,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  fontFamily: "'Cormorant Garamond', serif",
                  margin: 0,
                  color: '#e0d4bc',
                }}
              >
                {getGreeting()},{' '}
                <em style={{ color: '#b49155', fontStyle: 'italic' }}>{userName}</em>
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(224, 212, 188, 0.35)',
                }}
              >
                {currentDate}
              </span>
              <a
                href="/admin/collections/pages/create"
                style={{
                  padding: '8px 18px',
                  border: '1px solid #b49155',
                  color: '#b49155',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  borderRadius: 4,
                  transition: 'all 0.2s',
                }}
              >
                ＋ New Entry
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Total Records', value: totalRecords, sub: 'across all collections' },
              { label: 'Active Offers', value: activeOffers.totalDocs, sub: `of ${countMap.offers} total` },
              {
                label: 'Testimonials',
                value: countMap.testimonials,
                sub: `${featuredTestimonials.totalDocs} featured`,
              },
              { label: 'Media Files', value: countMap.media, sub: 'uploaded assets' },
            ].map((stat) => (
              <div key={stat.label} style={{ ...cardStyle, position: 'relative', overflow: 'hidden' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, #b49155, rgba(180, 145, 85, 0.2))',
                  }}
                />
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(224, 212, 188, 0.45)', marginBottom: 8 }}>
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: '#b49155',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(224, 212, 188, 0.3)' }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Collection Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            {Object.entries(collectionMeta).map(([slug, meta]) => {
              const count = countMap[slug] || 0
              const recent = recentByCollection.find((r) => r.collection === slug)
              const lastEdited = recent?.doc
                ? timeAgo((recent.doc as Record<string, unknown>).updatedAt as string)
                : 'never'

              return (
                <div key={slug} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <span style={{ fontSize: 24, opacity: 0.6 }}>{meta.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'rgba(180, 145, 85, 0.5)',
                      }}
                    >
                      {count}
                    </span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4, color: '#e0d4bc' }}>
                    {slug.charAt(0).toUpperCase() + slug.slice(1)}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(224, 212, 188, 0.3)', marginBottom: 16 }}>
                    Last edited {lastEdited}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a
                      href={`/admin/collections/${slug}`}
                      style={{
                        fontSize: 11,
                        color: '#b49155',
                        textDecoration: 'none',
                        padding: '6px 12px',
                        border: '1px solid rgba(180, 145, 85, 0.2)',
                        borderRadius: 3,
                        transition: 'all 0.2s',
                      }}
                    >
                      View all
                    </a>
                    <a
                      href={`/admin/collections/${slug}/create`}
                      style={{
                        fontSize: 11,
                        color: 'rgba(224, 212, 188, 0.5)',
                        textDecoration: 'none',
                        padding: '6px 12px',
                        border: '1px solid rgba(180, 145, 85, 0.1)',
                        borderRadius: 3,
                        transition: 'all 0.2s',
                      }}
                    >
                      ＋ Add {meta.singular}
                    </a>
                  </div>
                </div>
              )
            })}

            {/* Site Config card */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: 24, opacity: 0.6 }}>⚙</span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 14,
                    color: 'rgba(180, 145, 85, 0.5)',
                  }}
                >
                  Global
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4, color: '#e0d4bc' }}>Site Config</div>
              <div style={{ fontSize: 11, color: 'rgba(224, 212, 188, 0.3)', marginBottom: 16 }}>
                Global site settings
              </div>
              <a
                href="/admin/globals/site-config"
                style={{
                  fontSize: 11,
                  color: '#b49155',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  border: '1px solid rgba(180, 145, 85, 0.2)',
                  borderRadius: 3,
                }}
              >
                Edit config
              </a>
            </div>
          </div>

          {/* Bottom Two-Column Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Recent Activity */}
            <div style={cardStyle}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(224, 212, 188, 0.45)',
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                Recent Activity
              </h3>
              {activityItems.length === 0 ? (
                <div style={{ fontSize: 13, color: 'rgba(224, 212, 188, 0.3)' }}>No recent activity</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {activityItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#b49155',
                          flexShrink: 0,
                          opacity: 0.6,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: '#e0d4bc' }}>
                          <span style={{ color: 'rgba(224, 212, 188, 0.5)', fontSize: 11 }}>
                            {item.collection} ·{' '}
                          </span>
                          {String(item.title)}
                        </div>
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(224, 212, 188, 0.25)', flexShrink: 0 }}>
                        {timeAgo(item.updatedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div style={cardStyle}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(224, 212, 188, 0.45)',
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { label: 'Add testimonial', href: '/admin/collections/testimonials/create' },
                  { label: 'Edit site config', href: '/admin/globals/site-config' },
                  { label: 'Upload media', href: '/admin/collections/media/create' },
                  { label: 'Create FAQ', href: '/admin/collections/faqs/create' },
                  { label: 'Manage users', href: '/admin/collections/users' },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    style={{
                      display: 'block',
                      padding: '8px 12px',
                      fontSize: 13,
                      color: 'rgba(224, 212, 188, 0.6)',
                      textDecoration: 'none',
                      borderRadius: 4,
                      transition: 'all 0.15s',
                      border: '1px solid transparent',
                    }}
                  >
                    → {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  )
}

export default Dashboard
