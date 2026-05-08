import React from 'react';

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ user, onLogout, onNav }) {
  if (!user) return <div style={{padding:40,textAlign:'center'}}>Please log in to view profile.</div>;

  const displayName = typeof user.name === 'string' && user.name.trim() ? user.name : user.email || 'Customer';
  const avatarLetter = typeof user.name === 'string' && user.name.trim() ? user.name.charAt(0).toUpperCase() : 'C';

  return (
    <div className="profile-wrap">
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.4rem',fontWeight:800,marginBottom:18}}>Profile</h2>
      <div className="profile-card">
        <div className="profile-avatar">{avatarLetter}</div>
        <div className="profile-info">
          <div className="profile-name">{displayName}</div>
          <div className="profile-email">{user.email}</div>
          <div className="profile-role">{user.role === 'admin' ? 'Administrator' : 'Customer'}</div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="profile-btn" onClick={() => onNav('orders')}>📦 My Orders</button>
        <button className="profile-btn" onClick={() => onNav('wishlist')}>♡ Wishlist</button>
        <button className="profile-btn" onClick={() => onNav('cart')}>🛒 Cart</button>
        {user.role === 'admin' && <button className="profile-btn" onClick={() => onNav('admin')}>⚙️ Admin Panel</button>}
        <button className="profile-btn logout" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfilePage;