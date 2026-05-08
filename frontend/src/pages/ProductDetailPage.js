import React from 'react';
import ProductCard from '../components/ProductCard';

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────────────────────
function ProductDetailPage({ products, selectedId, onAddCart, onBack, wishlist, onToggleWish, onViewProduct }) {
  const p = products.find(x => (x.id || x._id) === selectedId);
  if (!p) return <div style={{padding:40,textAlign:'center',color:'var(--muted)'}}>Product not found. <button className="btn-fill" onClick={onBack}>Go back</button></div>;

  const productId = p.id || p._id;
  const inStock = p.stock > 0;
  const sale = p.orig && p.orig > p.price;
  const wished = wishlist.includes(productId);
  const related = products.filter(x => x.cat === p.cat && (x.id || x._id) !== productId).slice(0, 4);

  return (
    <div className="detail-wrap">
      <button className="detail-back" onClick={onBack}>← Back to shop</button>
      <div className="detail-grid">
        <div className="detail-visual" style={p.image?{padding:0,overflow:'hidden'}:{}}>
          {p.image
            ? <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:20}} />
            : p.emoji}
          <div className="detail-badges">
            {sale && <div className="pbadge sale-badge">SALE</div>}
            {p.stock <= 4 && p.stock > 0 && <div className="pbadge low-badge">LOW STOCK</div>}
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-cat">{p.cat}</div>
          <div className="detail-name">{p.name}</div>
          <div className="detail-price-row">
            <span className="detail-price">₹{p.price}</span>
            {sale && <>
              <span className="detail-orig">₹{p.orig}</span>
              <span className="detail-save">Save ₹{p.orig - p.price}</span>
            </>}
          </div>
          <div className="detail-stock-row">
            <span className={inStock ? 'stock-in' : 'stock-out'}>{inStock ? `${p.stock} in stock` : 'Out of stock'}</span>
            {p.stock <= 4 && p.stock > 0 && <span style={{fontSize:12,color:'var(--coral)'}}>⚡ Almost gone!</span>}
          </div>
          <div className="detail-desc">{p.desc}</div>
          <div className="detail-actions">
            <button className="detail-add-btn" disabled={!inStock} onClick={() => onAddCart(productId)}>
              {inStock ? '🛒 Add to cart' : 'Sold out'}
            </button>
            <button className={`detail-wish-btn${wished?' wished':''}`} onClick={() => onToggleWish(productId)}>
              {wished ? '♥ Saved to wishlist' : '♡ Save to wishlist'}
            </button>
          </div>
          <div style={{marginTop:20,padding:14,background:'rgba(200,247,74,.04)',borderRadius:10,border:'1px solid rgba(200,247,74,.1)'}}>
            <div style={{fontSize:12,fontWeight:700,color:'var(--lime)',marginBottom:8,letterSpacing:.5}}>✓ VOLT PROMISE</div>
            <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.7}}>Free shipping on orders over $100 · 30-day returns · Authenticity guaranteed</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="detail-related">
          <div className="detail-related-title">More from {p.cat}</div>
          <div className="grid">
            {related.map(r => {
              const rId = r.id || r._id;
              return <ProductCard key={rId} product={r} onAdd={onAddCart} onView={onViewProduct} wished={wishlist.includes(rId)} onWish={onToggleWish} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;