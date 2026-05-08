import React, { useState } from 'react';
import EditModal from '../components/EditModal';

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ products, deals, cart, orders, onUpdateProduct, onAddProduct, onDeleteProduct, onAddDeal, onUpdateDeal, onToggleDeal, onDeleteDeal, onNav, toast }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [view, setView] = useState('products');
  const [newProd, setNewProd] = useState({ name: '', cat: 'Electronics', price: 0, stock: 0, desc: '', emoji: '📱', image: null });
  const [dealForm, setDealForm] = useState({ title: '', pct: 10, code: '', on: true });
  const [editingDeal, setEditingDeal] = useState(null);
  const [showDealForm, setShowDealForm] = useState(false);

  const handleSave = (p) => {
    if (editing) {
      onUpdateProduct(editing.id, p);
      setEditing(null);
    } else if (adding) {
      onAddProduct(p);
      setAdding(false);
      setNewProd({ name: '', cat: 'Electronics', price: 0, stock: 0, desc: '', emoji: '📱', image: null });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      onDeleteProduct(id);
    }
  };

  const openDealForm = (deal = null) => {
    if (deal) {
      setEditingDeal(deal);
      setDealForm({ title: deal.title, pct: deal.pct, code: deal.code, on: deal.on });
    } else {
      setEditingDeal(null);
      setDealForm({ title: '', pct: 10, code: '', on: true });
    }
    setShowDealForm(true);
  };

  const saveDeal = () => {
    if (!dealForm.title.trim() || !dealForm.code.trim()) {
      alert('Please enter a deal title and code.');
      return;
    }
    if (editingDeal) {
      onUpdateDeal(editingDeal.id, dealForm);
    } else {
      onAddDeal(dealForm);
    }
    setShowDealForm(false);
    setEditingDeal(null);
    setDealForm({ title: '', pct: 10, code: '', on: true });
  };

  const handleDealDelete = (id) => {
    if (window.confirm('Delete this deal?')) {
      onDeleteDeal(id);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalActiveDeals = deals.filter(d => d.on).length;

  return (
    <div className="admin-wrap">
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>Admin Panel</h2>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 8 }}>
        <button className={`btn-metric${view === 'products' ? ' active' : ''}`} onClick={() => setView('products')} title="Total Products - Click to manage">
          📦 {products.length}
        </button>
        <button className={`btn-metric${view === 'deals' ? ' active' : ''}`} onClick={() => setView('deals')} title="Active Deals - Click to manage">
          🎯 {totalActiveDeals}
        </button>
        <button className={`btn-metric${view === 'cart-overview' ? ' active' : ''}`} onClick={() => setView('cart-overview')} title="Items in Cart - Click to view">
          🛒 {totalCartItems}
        </button>
        <button className={`btn-metric${view === 'orders-overview' ? ' active' : ''}`} onClick={() => setView('orders-overview')} title="Total Orders - Click to view">
          📋 {orders.length}
        </button>
        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 4px' }}></div>
        <button className={`btn-nav${view === 'products' ? ' active' : ''}`} onClick={() => setView('products')}>
          Products
        </button>
        <button className={`btn-nav${view === 'deals' ? ' active' : ''}`} onClick={() => setView('deals')}>
          Deals
        </button>
        <button className={`btn-nav${view === 'reports' ? ' active' : ''}`} onClick={() => setView('reports')}>
          Reports
        </button>
        <button className="btn-fill" onClick={() => { setView('products'); setAdding(true); }}>➕ Add Product</button>
        {view === 'deals' && (
          <button className="btn-fill" onClick={() => openDealForm()}>➕ Add Deal</button>
        )}
      </div>

      {view === 'reports' && (
        <div>
          <h3 style={{ marginBottom: 20, fontSize: '1.15rem', fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>📊 Dashboard Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginBottom: 24 }}>
            <div className="report-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <div className="report-icon">📦</div>
              <div className="report-content">
                <div className="report-title">Total Products</div>
                <div className="report-value">{products.length}</div>
                <div className="report-subtitle">Items in catalog</div>
              </div>
            </div>
            <div className="report-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <div className="report-icon">🎯</div>
              <div className="report-content">
                <div className="report-title">Active Deals</div>
                <div className="report-value">{totalActiveDeals}</div>
                <div className="report-subtitle">Live promotions</div>
              </div>
            </div>
            <div className="report-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <div className="report-icon">🛒</div>
              <div className="report-content">
                <div className="report-title">Items in Cart</div>
                <div className="report-value">{totalCartItems}</div>
                <div className="report-subtitle">Across all users</div>
              </div>
            </div>
            <div className="report-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
              <div className="report-icon">📋</div>
              <div className="report-content">
                <div className="report-title">Total Orders</div>
                <div className="report-value">{orders.length}</div>
                <div className="report-subtitle">Completed purchases</div>
              </div>
            </div>
          </div>

          {/* Enhanced Orders Section */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.15rem', fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>📋 Recent Orders</h3>
            <div className="orders-summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
              {orders.slice(0, 6).map(order => (
                <div key={order.id} className="order-summary-card" style={{
                  background: 'white',
                  border: '1px solid #e1e5e9',
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{order.id}</div>
                    <span className={`order-status ${order.status === 'Delivered' ? 'status-delivered' : order.status === 'Shipped' ? 'status-shipped' : 'status-processing'}`} style={{
                      padding: '4px 8px',
                      borderRadius: 12,
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}>
                      {order.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 8 }}>{order.date}</div>
                  <div style={{ fontSize: '0.9rem', marginBottom: 8 }}>
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ₹{order.total.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {order.items.map(item => item.name).join(', ')}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: 40,
                  background: '#f8f9fa',
                  borderRadius: 12,
                  color: '#666'
                }}>
                  No orders yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {view === 'cart-overview' && (
        <div>
          <h3 style={{ marginBottom: 20, fontSize: '1.15rem', fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>🛒 Cart Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
            {cart.map(item => (
              <div key={item.id} style={{
                background: 'white',
                borderRadius: 12,
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e1e5e9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: '1.5rem' }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.cat}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Qty: {item.qty}</div>
                  <div style={{ fontWeight: 600, color: '#2d3748' }}>₹{(item.price * item.qty).toFixed(2)}</div>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: 40,
                background: '#f8f9fa',
                borderRadius: 12,
                color: '#666'
              }}>
                No items in cart
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'orders-overview' && (
        <div>
          <h3 style={{ marginBottom: 20, fontSize: '1.15rem', fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>📋 Orders Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(350px,1fr))', gap: 16 }}>
            {orders.map(order => (
              <div key={order.id} style={{
                background: 'white',
                borderRadius: 12,
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e1e5e9'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>Order #{order.id}</div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: order.status === 'Delivered' ? '#d4edda' : order.status === 'Processing' ? '#fff3cd' : '#f8d7da',
                    color: order.status === 'Delivered' ? '#155724' : order.status === 'Processing' ? '#856404' : '#721c24'
                  }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 8 }}>{order.date}</div>
                <div style={{ fontSize: '0.9rem', marginBottom: 8 }}>
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ₹{order.total.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  {order.items.map(item => item.name).join(', ')}
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: 40,
                background: '#f8f9fa',
                borderRadius: 12,
                color: '#666'
              }}>
                No orders yet
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'deals' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Manage Deals & Offers</h3>
          </div>
          <div className="admin-grid">
            {deals.map(deal => {
              const dealId = deal.id || deal._id;
              return (
                <div key={dealId} className="admin-card">
                  <div className="admin-info">
                    <div className="admin-name">{deal.title}</div>
                    <div className="admin-cat">Code: {deal.code}</div>
                    <div className="admin-price">Discount: {deal.pct}%</div>
                    <div className="admin-stock">Status: {deal.on ? 'Active' : 'Inactive'}</div>
                  </div>
                  <div className="admin-actions">
                    <button className="admin-btn edit" onClick={() => openDealForm(deal)}>Edit</button>
                    <button className="admin-btn edit" onClick={() => onToggleDeal(dealId)}>{deal.on ? 'Disable' : 'Enable'}</button>
                    <button className="admin-btn delete" onClick={() => handleDealDelete(dealId)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        view === 'products' && (
          <div className="admin-grid">
            {products.map(p => (
              <div key={p.id || p._id} className="admin-card">
                <div className="admin-visual">
                  {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : p.emoji}
                </div>
                <div className="admin-info">
                  <div className="admin-name">{p.name}</div>
                  <div className="admin-cat">{p.cat}</div>
                  <div className="admin-price">₹{p.price}</div>
                  <div className="admin-stock">Stock: {p.stock}</div>
                </div>
                <div className="admin-actions">
                  <button className="admin-btn edit" onClick={() => setEditing(p)}>Edit</button>
                  <button className="admin-btn delete" onClick={() => handleDelete(p.id || p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {(editing || adding) && (
        <EditModal
          product={editing || newProd}
          onSave={handleSave}
          onClose={() => { setEditing(null); setAdding(false); }}
          toast={toast}
        />
      )}

      {showDealForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">{editingDeal ? 'Edit deal' : 'Add deal'}</div>
            <div className="modal-field">
              <label className="modal-label">Title</label>
              <input className="modal-input" value={dealForm.title} onChange={e => setDealForm({ ...dealForm, title: e.target.value })} />
            </div>
            <div className="modal-field">
              <label className="modal-label">Discount %</label>
              <input className="modal-input" type="number" min="1" max="100" value={dealForm.pct} onChange={e => setDealForm({ ...dealForm, pct: Number(e.target.value) })} />
            </div>
            <div className="modal-field">
              <label className="modal-label">Code</label>
              <input className="modal-input" value={dealForm.code} onChange={e => setDealForm({ ...dealForm, code: e.target.value })} />
            </div>
            <div className="modal-field" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label className="modal-label">Active</label>
              <input type="checkbox" checked={dealForm.on} onChange={e => setDealForm({ ...dealForm, on: e.target.checked })} />
            </div>
            <div className="modal-actions">
              <button className="modal-btn save" onClick={saveDeal}>{editingDeal ? 'Save changes' : 'Add deal'}</button>
              <button className="modal-btn cancel" onClick={() => { setShowDealForm(false); setEditingDeal(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;