import React, { useState } from 'react';

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
function AuthScreen({ onLogin, onSignup }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'

  return (
    <div className="auth-screen" style={{minHeight:'calc(100vh - 57px)'}}>
      <div className="auth-glow" />
      <div className="auth-box">
        <div className="auth-brand">VOLT.</div>
        <div className="auth-tagline">Shop bold. Live free.</div>

        <div className="auth-tabs">
          <button className={`auth-tab${tab === 'login' ? ' on' : ''}`} onClick={() => setTab('login')}>Sign in</button>
          <button className={`auth-tab${tab === 'signup' ? ' on' : ''}`} onClick={() => setTab('signup')}>Create account</button>
        </div>

        {tab === 'login' ? <LoginForm onLogin={onLogin} onSwitch={() => setTab('signup')} /> : <SignupForm onSignup={onSignup} onSwitch={() => setTab('login')} />}
      </div>
    </div>
  );
}

function LoginForm({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError('');
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!password) { setError('Password is required.'); return; }
    setLoading(true);
    try {
      const err = await onLogin({ email: email.trim(), password });
      if (err) setError(err);
    } catch (error) {
      setError(error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(role) {
    if (role === 'admin') { setEmail('admin@volt.com'); setPassword('admin123'); }
    else { setEmail('jane@volt.com'); setPassword('jane123'); }
    setError('');
  }

  return (
    <>
      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        <button className="auth-guest" style={{ fontSize:11, padding:'8px 6px' }} onClick={() => fillDemo('customer')}>
          👤 Demo Customer
        </button>
        <button className="auth-guest" style={{ fontSize:11, padding:'8px 6px' }} onClick={() => fillDemo('admin')}>
          🔐 Demo Admin
        </button>
      </div>

      <div className="auth-divider"><span>or sign in with email</span></div>

      <div className="auth-field">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          className={error && !email ? 'err-input' : ''}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
      </div>

      <div className="auth-field">
        <label>Password</label>
        <div className="pw-wrap">
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            style={{ paddingRight: 40 }}
            onKeyDown={e => e.key === 'Enter' && submit()}
          />
          <button className="pw-eye" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁'}</button>
        </div>
      </div>

      {error && <div className="auth-err">⚠ {error}</div>}

      <button className="auth-submit" disabled={loading} onClick={submit}>
        {loading ? 'Signing in…' : 'Sign in →'}
      </button>

      <div className="auth-footer">
        Don't have an account? <strong style={{ cursor:'pointer', color:'var(--lime)' }} onClick={onSwitch}>Create one</strong>
      </div>
    </>
  );
}

function SignupForm({ onSignup, onSwitch }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pwStrength = !password ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColor = ['transparent', 'var(--coral)', 'var(--sky)', 'var(--lime)'][pwStrength];
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][pwStrength];

  async function submit() {
    setError('');
    if (!name.trim()) { setError('Full name is required.'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const err = await onSignup({ name: name.trim(), email: email.trim(), password, role });
      if (err) setError(err);
    } catch (error) {
      setError(error.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="auth-field">
        <label>Full name</label>
        <input
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
      </div>

      <div className="auth-field">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
      </div>

      <div className="auth-field">
        <label>Password</label>
        <div className="pw-wrap">
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            style={{ paddingRight: 40 }}
            onKeyDown={e => e.key === 'Enter' && submit()}
          />
          <button className="pw-eye" onClick={() => setShowPw(v => !v)}>{showPw ? '🙈' : '👁'}</button>
        </div>
        {password && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:6 }}>
            <div style={{ flex:1, height:3, borderRadius:50, background:'var(--border)', overflow:'hidden' }}>
              <div style={{ width: `${(pwStrength/3)*100}%`, height:'100%', background: strengthColor, borderRadius:50, transition:'all .3s' }} />
            </div>
            <span style={{ fontSize:10, fontWeight:700, color: strengthColor }}>{strengthLabel}</span>
          </div>
        )}
      </div>

      <div className="auth-field">
        <label>Confirm password</label>
        <input
          type={showPw ? 'text' : 'password'}
          placeholder="Re-enter password"
          value={confirm}
          onChange={e => { setConfirm(e.target.value); setError(''); }}
          className={confirm && confirm !== password ? 'err-input' : ''}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        {confirm && confirm !== password && <div className="auth-err">Passwords don't match</div>}
      </div>

      <div className="auth-field">
        <label>I am a</label>
        <div className="auth-role-row">
          <button className={`auth-role-btn${role === 'customer' ? ' on' : ''}`} onClick={() => setRole('customer')}>
            <span>🛍️</span> Customer
          </button>
          <button className={`auth-role-btn${role === 'admin' ? ' on' : ''}`} onClick={() => setRole('admin')}>
            <span>🔐</span> Admin
          </button>
        </div>
      </div>

      {error && <div className="auth-err">⚠ {error}</div>}

      <button className="auth-submit" disabled={loading} onClick={submit}>
        {loading ? 'Creating account…' : 'Create account →'}
      </button>

      <div className="auth-footer">
        Already have an account? <strong style={{ cursor:'pointer', color:'var(--lime)' }} onClick={onSwitch}>Sign in</strong>
      </div>
    </>
  );
}

export default AuthScreen;