'use client'

import React, { useState, FormEvent } from 'react'

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Sign In state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Create Account state
  const [createName, setCreateName] = useState('')
  const [createEmail, setCreateEmail] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.errors?.[0]?.message || 'Invalid credentials')
      }
      window.location.href = '/admin'
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (createPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (createPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: createName,
          email: createEmail,
          password: createPassword,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.errors?.[0]?.message || 'Account creation failed')
      }
      setSuccess('Account created. You may now sign in.')
      setActiveTab('signin')
      setEmail(createEmail)
      setCreateName('')
      setCreateEmail('')
      setCreatePassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Account creation failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    background: '#0a0a0a',
    border: '1px solid rgba(180, 145, 85, 0.2)',
    borderRadius: 4,
    color: '#e0d4bc',
    fontFamily: "'Jost', sans-serif",
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 6,
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'rgba(224, 212, 188, 0.5)',
    fontFamily: "'Jost', sans-serif",
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px',
    background: 'transparent',
    border: '1px solid #b49155',
    color: '#b49155',
    fontFamily: "'Jost', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    cursor: loading ? 'wait' : 'pointer',
    transition: 'all 0.2s ease',
    borderRadius: 4,
    opacity: loading ? 0.6 : 1,
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gold gradient */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(180, 145, 85, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(180, 145, 85, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 145, 85, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420, padding: '0 20px' }}>
        {/* Brand mark */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              border: '1px solid rgba(180, 145, 85, 0.5)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: 14,
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
          <div
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
          </div>
        </div>

        {/* Form card */}
        <div
          style={{
            background: 'rgba(20, 20, 20, 0.6)',
            border: '1px solid rgba(180, 145, 85, 0.15)',
            borderRadius: 8,
            backdropFilter: 'blur(20px)',
            padding: '32px 28px',
          }}
        >
          {/* Tab switcher */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(180, 145, 85, 0.1)', marginBottom: 28 }}>
            {(['signin', 'create'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setError(null); setSuccess(null) }}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #b49155' : '2px solid transparent',
                  padding: '0 0 12px',
                  color: activeTab === tab ? '#b49155' : 'rgba(224, 212, 188, 0.4)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                {tab === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Error / success */}
          {error && (
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(196, 67, 58, 0.1)',
                border: '1px solid rgba(196, 67, 58, 0.3)',
                borderRadius: 4,
                color: '#e07a73',
                fontSize: 13,
                marginBottom: 20,
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(180, 145, 85, 0.08)',
                border: '1px solid rgba(180, 145, 85, 0.2)',
                borderRadius: 4,
                color: '#b49155',
                fontSize: 13,
                marginBottom: 20,
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {success}
            </div>
          )}

          {/* Sign In form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn}>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.2)')}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.2)')}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(180, 145, 85, 0.12)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#b49155'
                }}
              >
                {loading ? 'Signing in...' : 'Enter'}
              </button>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 16,
                  fontSize: 12,
                  color: 'rgba(224, 212, 188, 0.35)',
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                <a
                  href="/admin/forgot"
                  style={{ color: 'rgba(180, 145, 85, 0.5)', textDecoration: 'none' }}
                >
                  Forgot your password?
                </a>
              </div>
            </form>
          )}

          {/* Create Account form */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateAccount}>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.2)')}
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  required
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.2)')}
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  required
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.2)')}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.45)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(180, 145, 85, 0.2)')}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(180, 145, 85, 0.12)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#b49155'
                }}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 16,
                  fontSize: 11,
                  color: 'rgba(224, 212, 188, 0.3)',
                  fontFamily: "'Jost', sans-serif",
                  lineHeight: 1.5,
                }}
              >
                Access is restricted to authorized administrators.
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 32,
            fontSize: 10,
            color: 'rgba(224, 212, 188, 0.15)',
            fontFamily: "'Jost', sans-serif",
            letterSpacing: '0.08em',
          }}
        >
          Soul Initiation Academy · CMS v1
        </div>
      </div>
    </div>
  )
}

export default LoginPage
