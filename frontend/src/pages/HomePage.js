import React from 'react';

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ products, onNav, authUser }) {
  const go = (dest) => onNav(authUser ? dest : 'auth');
  return (
    <div className="hero">
      <div>
        <div className="hero-tag">New Drop 2024</div>
        <h1>Shop <span>bold.</span><br />Live free.</h1>
        <p>Curated products delivered with speed and style. No noise, just the good stuff.</p>
        <div className="hero-btns">
          <button className="btn-fill" onClick={() => go('shop')}>Browse all →</button>
          <button className="btn-ghost" onClick={() => go('cart')}>View cart</button>
        </div>
      </div>
      <div className="hero-visual">
        {products.slice(0, 4).map(p => (
          <div key={p.id || p._id} className="hero-card" onClick={() => go('shop')}>
            <div className="hc-icon">{p.emoji}</div>
            <div className="hc-name">{p.name}</div>
            <div className="hc-price">₹{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;