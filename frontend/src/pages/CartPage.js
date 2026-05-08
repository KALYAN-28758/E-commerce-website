import React from 'react';

// ─── CART PAGE ────────────────────────────────────────────────────────────────
function CartPage({ products, cart, onUpdateQty, onRemove, onCheckout, onNav }) {
  if (!cart.length) {
    return (
      <div className="cart-wrap">
        <div className="cart-empty">
          <div className="big">🛒</div>
          <h3>Cart is empty</h3>
          <p style={{ marginBottom: 18 }}>Add something you love.</p>
          <button className="btn-fill" onClick={() => onNav('shop')}>Shop now →</button>
        </div>
      </div>
    );
  }

  const sub = cart.reduce((s, i) => {
    const p = products.find(p => (p.id || p._id) === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  const ship = sub > 100 ? 0 : 10;
  const total = sub + ship;

  return (
    <div className="cart-wrap">
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: 18 }}>Your cart</h2>
      <div className="cart-grid">
        <div>
          {cart.map(i => {
            const p = products.find(p => (p.id || p._id) === i.id);
            if (!p) return null;
            return (
              <div key={i.id} className="citem">
                <div className="citem-emo">{p.emoji}</div>
                <div className="citem-info">
                  <div className="citem-name">{p.name}</div>
                  <div className="citem-cat">{p.cat}</div>
                  <div className="citem-price">₹{(p.price * i.qty).toFixed(2)}</div>
                </div>
                <div className="qty">
                  <button className="qbtn" onClick={() => onUpdateQty(i.id, -1)}>−</button>
                  <span className="qnum">{i.qty}</span>
                  <button className="qbtn" onClick={() => onUpdateQty(i.id, 1)}>+</button>
                </div>
                <button className="rmv" onClick={() => onRemove(i.id)}>✕</button>
              </div>
            );
          })}
        </div>
        <div className="csummary">
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1rem', marginBottom: 12 }}>Order summary</div>
          <div className="crow"><span>Subtotal</span><span>₹{sub.toFixed(2)}</span></div>
          <div className="crow">
            <span>Shipping</span>
            <span style={{ color: ship === 0 ? 'var(--lime)' : 'var(--text)' }}>
              {ship === 0 ? 'Free' : `₹${ship.toFixed(2)}`}
            </span>
          </div>
          <div className="crow total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={onCheckout}>Checkout →</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;