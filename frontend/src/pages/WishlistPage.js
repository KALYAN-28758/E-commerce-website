import React from 'react';

// ─── WISHLIST PAGE ────────────────────────────────────────────────────────────
function WishlistPage({ products, wishlist, onToggleWish, onAddCart, onNav, onViewProduct }) {
  const wished = products.filter(p => wishlist.includes(p.id || p._id));

  if (!wished.length) {
    return (
      <div className="wish-wrap">
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.4rem',fontWeight:800,marginBottom:18}}>Wishlist</h2>
        <div className="wish-empty">
          <div className="big">♡</div>
          <h3>Nothing saved yet</h3>
          <p style={{marginBottom:18}}>Heart items you love while browsing.</p>
          <button className="btn-fill" onClick={() => onNav('shop')}>Browse shop →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wish-wrap">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.4rem',fontWeight:800}}>Wishlist</h2>
        <span style={{fontSize:13,color:'var(--muted)'}}>{wished.length} saved</span>
      </div>
      <div className="wish-grid">
        {wished.map(p => {
          const productId = p.id || p._id;
          const inStock = p.stock > 0;
          const sale = p.orig && p.orig > p.price;
          return (
            <div key={productId} className="wish-card">
              <button className="wish-rm" onClick={() => onToggleWish(productId)}>✕</button>
              <div style={{height:120,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem',background:'#1C1C1C',cursor:'pointer'}} onClick={()=>onViewProduct(productId)}>
                {p.emoji}
                {sale && <div className="pbadge sale-badge" style={{position:'absolute',top:8,left:8}}>SALE</div>}
              </div>
              <div className="pcard-body">
                <div className="pcat">{p.cat}</div>
                <div className="pname" style={{cursor:'pointer'}} onClick={()=>onViewProduct(productId)}>{p.name}</div>
                <div className="pfoot">
                  <span className="pprice">₹{p.price}{sale&&<s>₹{p.orig}</s>}</span>
                  <span className={inStock?'stock-in':'stock-out'}>{inStock?`${p.stock} left`:'Sold out'}</span>
                </div>
                <button className="add-btn" disabled={!inStock} onClick={()=>onAddCart(productId)}>
                  {inStock?'+ Add to cart':'Sold out'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WishlistPage;