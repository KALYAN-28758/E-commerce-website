import React from 'react';

function ProductCard({ product: p, onAdd, onView, wished, onWish }) {
  const productId = p.id || p._id;
  const inStock = p.stock > 0;
  const sale = p.orig && p.orig > p.price;
  return (
    <div className="pcard">
      <div className="pcard-top" onClick={() => onView && onView(productId)} style={onView?{cursor:'pointer'}:{}}>
        {p.image
          ? <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0,borderRadius:0}} />
          : p.emoji}
        {sale && <div className="pbadge sale-badge">SALE</div>}
        {p.stock <= 4 && p.stock > 0 && <div className="pbadge low-badge">LOW</div>}
        {onWish && (
          <button
            onClick={e=>{e.stopPropagation();onWish(productId);}}
            style={{position:'absolute',top:8,right:8,background:'rgba(13,13,13,.7)',border:'none',borderRadius:'50%',width:28,height:28,cursor:'pointer',fontSize:14,color:wished?'var(--coral)':'var(--muted)',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .18s'}}
          >♥</button>
        )}
      </div>
      <div className="pcard-body">
        <div className="pcat">{p.cat}</div>
        <div className="pname" style={onView?{cursor:'pointer'}:{}} onClick={()=>onView&&onView(productId)}>{p.name}</div>
        <div className="pfoot">
          <span className="pprice">
            ₹{p.price}
            {sale && <s>₹{p.orig}</s>}
          </span>
          <span className={inStock ? 'stock-in' : 'stock-out'}>{inStock ? `${p.stock} left` : 'Sold out'}</span>
        </div>
        <button className="add-btn" disabled={!inStock} onClick={() => onAdd(productId)}>
          {inStock ? '+ Add to cart' : 'Sold out'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;