import React from 'react';

// ─── ORDERS PAGE ──────────────────────────────────────────────────────────────
function OrdersPage({ orders, onNav }) {
  if (!orders.length) {
    return (
      <div className="orders-wrap">
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.4rem',fontWeight:800,marginBottom:18}}>My Orders</h2>
        <div className="wish-empty">
          <div className="big">📦</div>
          <h3>No orders yet</h3>
          <p style={{marginBottom:18}}>Start shopping to see your orders here.</p>
          <button className="btn-fill" onClick={() => onNav('shop')}>Shop now →</button>
        </div>
      </div>
    );
  }

  const statusClass = s => s==='Delivered'?'status-delivered':s==='Shipped'?'status-shipped':'status-processing';

  return (
    <div className="orders-wrap">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.4rem',fontWeight:800}}>My Orders</h2>
        <span style={{fontSize:13,color:'var(--muted)'}}>{orders.length} orders</span>
      </div>
      {orders.map(o => (
        <div key={o.id} className="order-card">
          <div className="order-head">
            <div>
              <div className="order-id">{o.id}</div>
              <div className="order-date">{o.date}</div>
            </div>
            <span className={`order-status ${statusClass(o.status)}`}>{o.status}</span>
          </div>
          <div className="order-items">
            {o.items.map((item,i) => (
              <div key={i} className="order-item-row">
                <span>{item.emoji}</span>
                <span style={{flex:1}}>{item.name}</span>
                <span style={{color:'var(--muted)'}}>×{item.qty}</span>
                <span style={{color:'var(--lime)',fontWeight:600}}>₹{(item.price*item.qty).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="order-foot">
            <span className="order-total">Total: ₹{o.total.toFixed(2)}</span>
            <button className="order-reorder" onClick={()=>onNav('shop')}>Shop again</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;