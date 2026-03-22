import React from 'react'

const AdminLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: 56,
          height: 56,
          border: '1px solid rgba(180, 145, 85, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 3,
            border: '1px solid rgba(180, 145, 85, 0.25)',
          }}
        />
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 600,
            color: '#b49155',
            letterSpacing: '0.15em',
          }}
        >
          SIA
        </span>
      </div>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          fontWeight: 500,
          color: 'rgba(180, 145, 85, 0.6)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontVariant: 'small-caps',
        }}
      >
        Soul Initiation Academy
      </span>
    </div>
  )
}

export default AdminLogo
