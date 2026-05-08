import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

// ─── SHOP PAGE ────────────────────────────────────────────────────────────────
function ShopPage({ products, onAddCart, onViewProduct, wishlist, onToggleWish }) {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(products.map(p => p.cat))];
  const filtered = filter === 'All' ? products : products.filter(p => p.cat === filter);

  return (
    <div className="shop-wrap">
      <div className="shop-top">
        <div className="shop-title">All products</div>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{filtered.length} items</span>
      </div>
      <div className="filters">
        {cats.map(c => (
          <button key={c} className={`chip${filter === c ? ' on' : ''}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <div className="grid">
        {filtered.map(p => {
          const productId = p.id || p._id;
          return <ProductCard key={productId} product={p} onAdd={onAddCart} onView={onViewProduct} wished={wishlist?.includes(productId)} onWish={onToggleWish} />;
        })}
      </div>
    </div>
  );
}

export default ShopPage;