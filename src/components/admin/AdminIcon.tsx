import React from 'react'

const AdminIcon: React.FC = () => {
  return (
    <div
      style={{
        width: 32,
        height: 32,
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
          inset: 2,
          border: '1px solid rgba(180, 145, 85, 0.25)',
        }}
      />
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 12,
          fontWeight: 600,
          color: '#b49155',
          letterSpacing: '0.1em',
        }}
      >
        SIA
      </span>
    </div>
  )
}

export default AdminIcon
