import React from 'react';

// ─── GUEST PROMPT ─────────────────────────────────────────────────────────────
function GuestPrompt({ onLogin, msg }) {
  return (
    <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted)'}}>
      <div style={{fontSize:'2.5rem',marginBottom:16}}>🔐</div>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.2rem',color:'var(--text)',marginBottom:8}}>{msg}</h3>
      <p style={{marginBottom:24,fontSize:14}}>Create an account or sign in to continue.</p>
      <button className="btn-fill" onClick={onLogin}>Sign in →</button>
    </div>
  );
}

export default GuestPrompt;