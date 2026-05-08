import React, { useState, useEffect } from 'react';
import './styles.css';
import { INIT_PRODUCTS, INIT_DEALS, INIT_ORDERS } from './utils/constants';
import { useToast } from './utils/useToast';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
import AuthScreen from './pages/AuthScreen';
import GuestPrompt from './components/GuestPrompt';

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const normalizeProduct = (product) => ({ ...product, id: product.id || product._id });
  const normalizeProducts = (items) => items.map(normalizeProduct);

  const [products, setProducts] = useState(INIT_PRODUCTS.map(normalizeProduct));
  const [deals, setDeals] = useState(INIT_DEALS);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const { toasts, addToast } = useToast();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bg: #0A0A0A;
        --card: #1C1C1C;
        --text: #FFFFFF;
        --muted: #888888;
        --lime: #C8F74A;
        --coral: #FF6B6B;
        --blue: #4ECDC4;
        --purple: #9B59B6;
        --orange: #F39C12;
        --red: #E74C3C;
        --green: #27AE60;
      }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); }
      .app { min-height: 100vh; display: flex; flex-direction: column; }
      .nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: var(--card); border-bottom: 1px solid rgba(255,255,255,.1); }
      .nav-left { display: flex; align-items: center; gap: 20px; }
      .logo { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--lime); cursor: pointer; }
      .nav-links { display: flex; gap: 20px; }
      .nav-link { color: var(--muted); cursor: pointer; transition: color 0.2s; }
      .nav-link:hover, .nav-link.active { color: var(--text); }
      .nav-right { display: flex; align-items: center; gap: 15px; }
      .nav-icon { font-size: 1.2rem; cursor: pointer; position: relative; }
      .nav-icon:hover { color: var(--lime); }
      .cart-count { position: absolute; top: -8px; right: -8px; background: var(--coral); color: white; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 600; }
      .main { flex: 1; padding: 40px; }
      .btn-fill { background: var(--lime); color: black; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
      .btn-fill:hover { background: #b8e63f; transform: translateY(-1px); }
      .btn-fill:disabled { background: var(--muted); cursor: not-allowed; transform: none; }
      .toast-container { position: fixed; top: 20px; right: 20px; z-index: 1000; }
      .toast { background: var(--card); color: var(--text); padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); animation: slideIn 0.3s ease-out; }
      .toast.success { border-left: 4px solid var(--lime); }
      .toast.error { border-left: 4px solid var(--coral); }
      @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      .big { font-size: 4rem; margin-bottom: 20px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
      .pcard { background: var(--card); border-radius: 12px; overflow: hidden; transition: transform 0.2s; cursor: pointer; }
      .pcard:hover { transform: translateY(-4px); }
      .pcard-visual { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 3rem; background: #2A2A2A; position: relative; }
      .pcard-body { padding: 16px; }
      .pcat { font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
      .pname { font-weight: 600; margin-bottom: 8px; }
      .pfoot { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
      .pprice { font-weight: 700; font-size: 1.1rem; }
      .pprice s { color: var(--muted); margin-left: 8px; }
      .stock-in { color: var(--green); font-size: 0.8rem; }
      .stock-out { color: var(--coral); font-size: 0.8rem; }
      .add-btn { width: 100%; background: var(--lime); color: black; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
      .add-btn:hover:not(:disabled) { background: #b8e63f; }
      .add-btn:disabled { background: var(--muted); cursor: not-allowed; }
      .pbadge { position: absolute; top: 8px; left: 8px; background: var(--coral); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
      .sale-badge { background: var(--lime); color: black; }
      .low-badge { background: var(--orange); }
      .hero { text-align: center; margin-bottom: 60px; }
      .hero-tag { background: rgba(200,247,74,.1); color: var(--lime); padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-block; margin-bottom: 20px; }
      .hero-title { font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800; margin-bottom: 20px; line-height: 1.1; }
      .hero-desc { font-size: 1.1rem; color: var(--muted); margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; }
      .hero-btns { display: flex; gap: 16px; justify-content: center; }
      .btn-outline { background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,.2); padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
      .btn-outline:hover { background: rgba(255,255,255,.1); }
      .deal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 60px; }
      .deal-card { background: var(--card); border-radius: 12px; padding: 24px; position: relative; overflow: hidden; }
      .deal-emo { font-size: 2rem; margin-bottom: 16px; }
      .deal-title { font-weight: 700; margin-bottom: 8px; }
      .deal-desc { color: var(--muted); margin-bottom: 16px; }
      .deal-price { font-size: 1.5rem; font-weight: 800; color: var(--lime); }
      .deal-old { color: var(--muted); text-decoration: line-through; margin-left: 8px; }
      .deal-btn { background: var(--lime); color: black; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; margin-top: 16px; }
      .deal-btn:hover { background: #b8e63f; }
      .shop-wrap { max-width: 1200px; margin: 0 auto; }
      .shop-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
      .shop-title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; }
      .filter-row { display: flex; gap: 12px; margin-bottom: 30px; flex-wrap: wrap; }
      .filter-btn { background: transparent; color: var(--muted); border: 1px solid rgba(255,255,255,.2); padding: 8px 16px; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
      .filter-btn.active { background: var(--lime); color: black; border-color: var(--lime); }
      .filter-btn:hover { background: rgba(255,255,255,.1); }
      .cart-wrap { max-width: 1000px; margin: 0 auto; }
      .cart-empty { text-align: center; padding: 60px 20px; }
      .cart-grid { display: grid; grid-template-columns: 1fr 300px; gap: 40px; }
      .citem { display: flex; align-items: center; gap: 16px; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
      .citem-emo { font-size: 2rem; width: 60px; text-align: center; }
      .citem-info { flex: 1; }
      .citem-name { font-weight: 600; margin-bottom: 4px; }
      .citem-cat { color: var(--muted); font-size: 0.8rem; }
      .citem-price { font-weight: 700; color: var(--lime); }
      .qty { display: flex; align-items: center; gap: 8px; }
      .qbtn { background: var(--card); color: var(--text); border: 1px solid rgba(255,255,255,.2); width: 32px; height: 32px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      .qbtn:hover { background: rgba(255,255,255,.1); }
      .qnum { min-width: 30px; text-align: center; font-weight: 600; }
      .rmv { background: transparent; color: var(--coral); border: none; font-size: 1.2rem; cursor: pointer; padding: 4px; }
      .rmv:hover { background: rgba(255,255,255,.1); border-radius: 4px; }
      .csummary { background: var(--card); padding: 24px; border-radius: 12px; height: fit-content; }
      .crow { display: flex; justify-content: space-between; margin-bottom: 12px; }
      .crow.total { font-weight: 700; font-size: 1.1rem; margin-bottom: 20px; }
      .checkout-btn { width: 100%; background: var(--lime); color: black; border: none; padding: 14px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 1rem; }
      .checkout-btn:hover { background: #b8e63f; }
      .detail-wrap { max-width: 1000px; margin: 0 auto; }
      .detail-back { background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,.2); padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-bottom: 30px; }
      .detail-back:hover { background: rgba(255,255,255,.1); }
      .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }
      .detail-visual { height: 400px; background: #2A2A2A; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 6rem; position: relative; }
      .detail-info { display: flex; flex-direction: column; justify-content: center; }
      .detail-cat { color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
      .detail-name { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 16px; }
      .detail-price-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
      .detail-price { font-size: 1.8rem; font-weight: 800; color: var(--lime); }
      .detail-orig { color: var(--muted); text-decoration: line-through; }
      .detail-save { background: var(--lime); color: black; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; }
      .detail-stock-row { margin-bottom: 20px; }
      .detail-desc { color: var(--muted); line-height: 1.6; margin-bottom: 30px; }
      .detail-actions { display: flex; gap: 12px; margin-bottom: 30px; }
      .detail-add-btn { flex: 1; background: var(--lime); color: black; border: none; padding: 16px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 1rem; }
      .detail-add-btn:hover:not(:disabled) { background: #b8e63f; }
      .detail-add-btn:disabled { background: var(--muted); cursor: not-allowed; }
      .detail-wish-btn { background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,.2); padding: 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
      .detail-wish-btn:hover { background: rgba(255,255,255,.1); }
      .detail-wish-btn.wished { background: var(--coral); border-color: var(--coral); color: white; }
      .detail-related { margin-top: 60px; }
      .detail-related-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; margin-bottom: 30px; }
      .wish-wrap { max-width: 1200px; margin: 0 auto; }
      .wish-empty { text-align: center; padding: 60px 20px; }
      .wish-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
      .wish-card { background: var(--card); border-radius: 12px; overflow: hidden; position: relative; }
      .wish-rm { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.5); color: white; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1; }
      .wish-rm:hover { background: rgba(0,0,0,.7); }
      .orders-wrap { max-width: 800px; margin: 0 auto; }
      .order-card { background: var(--card); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
      .order-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
      .order-id { font-weight: 700; margin-bottom: 4px; }
      .order-date { color: var(--muted); font-size: 0.9rem; }
      .order-status { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
      .status-processing { background: rgba(255,107,107,.1); color: var(--coral); }
      .status-shipped { background: rgba(78,205,196,.1); color: var(--blue); }
      .status-delivered { background: rgba(39,174,96,.1); color: var(--green); }
      .order-items { margin-bottom: 20px; }
      .order-item-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.05); }
      .order-foot { display: flex; justify-content: space-between; align-items: center; }
      .order-total { font-weight: 700; font-size: 1.1rem; }
      .order-reorder { background: var(--lime); color: black; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
      .order-reorder:hover { background: #b8e63f; }
      .profile-wrap { max-width: 600px; margin: 0 auto; }
      .profile-card { background: var(--card); border-radius: 12px; padding: 24px; display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
      .profile-avatar { width: 60px; height: 60px; background: var(--lime); color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; }
      .profile-info { flex: 1; }
      .profile-name { font-weight: 700; font-size: 1.2rem; margin-bottom: 4px; }
      .profile-email { color: var(--muted); margin-bottom: 4px; }
      .profile-role { color: var(--lime); font-size: 0.9rem; font-weight: 600; }
      .profile-actions { display: flex; flex-direction: column; gap: 12px; }
      .profile-btn { background: var(--card); color: var(--text); border: 1px solid rgba(255,255,255,.2); padding: 14px 20px; border-radius: 8px; cursor: pointer; text-align: left; font-weight: 600; transition: all 0.2s; }
      .profile-btn:hover { background: rgba(255,255,255,.1); }
      .profile-btn.logout { color: var(--coral); border-color: var(--coral); }
      .profile-btn.logout:hover { background: rgba(255,107,107,.1); }
      .admin-wrap { max-width: 1200px; margin: 0 auto; }
      .admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
      .admin-card { background: var(--card); border-radius: 12px; overflow: hidden; }
      .admin-visual { height: 150px; background: #2A2A2A; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
      .admin-info { padding: 16px; }
      .admin-name { font-weight: 600; margin-bottom: 4px; }
      .admin-cat { color: var(--muted); font-size: 0.8rem; margin-bottom: 8px; }
      .admin-price { font-weight: 700; color: var(--lime); margin-bottom: 4px; }
      .admin-stock { font-size: 0.9rem; }
      .admin-actions { padding: 16px; padding-top: 0; display: flex; gap: 8px; }
      .admin-btn { flex: 1; padding: 8px; border-radius: 6px; cursor: pointer; font-weight: 600; border: none; }
      .admin-btn.edit { background: var(--blue); color: white; }
      .admin-btn.edit:hover { background: #3da8a2; }
      .admin-btn.delete { background: var(--coral); color: white; }
      .admin-btn.delete:hover { background: #e55a5a; }
      .auth-wrap { max-width: 400px; margin: 0 auto; padding: 40px 20px; }
      .auth-tabs { display: flex; margin-bottom: 30px; }
      .auth-tab { flex: 1; padding: 12px; text-align: center; cursor: pointer; background: var(--card); border: 1px solid rgba(255,255,255,.2); transition: all 0.2s; }
      .auth-tab.active { background: var(--lime); color: black; border-color: var(--lime); }
      .auth-tab:not(.active):hover { background: rgba(255,255,255,.1); }
      .auth-form { background: var(--card); padding: 30px; border-radius: 12px; }
      .auth-title { text-align: center; font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; margin-bottom: 20px; }
      .auth-field { margin-bottom: 16px; }
      .auth-label { display: block; margin-bottom: 6px; font-weight: 600; }
      .auth-input { width: 100%; padding: 12px; background: var(--bg); border: 1px solid rgba(255,255,255,.2); border-radius: 6px; color: var(--text); font-size: 1rem; }
      .auth-input:focus { outline: none; border-color: var(--lime); }
      .auth-btn { width: 100%; background: var(--lime); color: black; border: none; padding: 14px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 1rem; margin-top: 20px; }
      .auth-btn:hover { background: #b8e63f; }
      .auth-btn:disabled { background: var(--muted); cursor: not-allowed; }
      .auth-demo { text-align: center; margin-top: 20px; color: var(--muted); font-size: 0.9rem; }
      .auth-demo-btn { background: transparent; color: var(--blue); border: none; cursor: pointer; text-decoration: underline; }
      .auth-demo-btn:hover { color: #3da8a2; }
      .guest-prompt { text-align: center; padding: 40px 20px; }
      .guest-prompt .big { font-size: 3rem; margin-bottom: 20px; }
      .guest-prompt h3 { margin-bottom: 12px; }
      .guest-prompt p { color: var(--muted); margin-bottom: 20px; }
      .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
      .modal { background: var(--card); border-radius: 12px; padding: 30px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto; }
      .modal-title { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 20px; }
      .modal-field { margin-bottom: 16px; }
      .modal-label { display: block; margin-bottom: 6px; font-weight: 600; }
      .modal-input { width: 100%; padding: 12px; background: var(--bg); border: 1px solid rgba(255,255,255,.2); border-radius: 6px; color: var(--text); font-size: 1rem; }
      .modal-input:focus { outline: none; border-color: var(--lime); }
      .modal-textarea { resize: vertical; min-height: 80px; }
      .modal-actions { display: flex; gap: 12px; margin-top: 30px; }
      .modal-btn { flex: 1; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600; border: none; }
      .modal-btn.save { background: var(--lime); color: black; }
      .modal-btn.save:hover { background: #b8e63f; }
      .modal-btn.cancel { background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,.2); }
      .modal-btn.cancel:hover { background: rgba(255,255,255,.1); }
      .image-uploader { margin-bottom: 16px; }
      .image-preview { width: 100%; height: 150px; background: var(--bg); border: 1px solid rgba(255,255,255,.2); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; overflow: hidden; }
      .image-preview img { width: 100%; height: 100%; object-fit: cover; }
      .image-preview .placeholder { color: var(--muted); font-size: 3rem; }
      .image-controls { display: flex; gap: 8px; }
      .image-btn { flex: 1; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 0.9rem; border: none; }
      .image-btn.upload { background: var(--lime); color: black; }
      .image-btn.upload:hover { background: #b8e63f; }
      .image-btn.clear { background: var(--coral); color: white; }
      .image-btn.clear:hover { background: #e55a5a; }
      .image-input { display: none; }
    `;
    document.head.appendChild(style);
  }, []);

  const API_BASE = process.env.REACT_APP_API_URL || '';
  const [token, setToken] = useState(localStorage.getItem('volt_token') || '');
  const protectedPages = new Set(['shop', 'wishlist', 'orders', 'cart', 'detail', 'profile']);
  const nav = (p) => {
    if (user && user.role === 'admin' && ['home', 'shop', 'wishlist', 'cart', 'orders', 'detail'].includes(p)) {
      setPage('admin');
      return;
    }
    if (user && p === 'home') {
      setPage('shop');
      return;
    }
    if (!user && protectedPages.has(p)) {
      setPage('auth');
      return;
    }
    setPage(p);
  };

  const apiRequest = async (path, options = {}) => {
    const { method = 'GET', body, auth = true } = options;
    const headers = { 'Content-Type': 'application/json' };
    if (auth && token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('volt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadPublicData();
    if (storedUser) {
      loadPrivateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPublicData = async () => {
    try {
      const [productsData, dealsData] = await Promise.all([
        apiRequest('/api/products', { auth: false }),
        apiRequest('/api/deals', { auth: false })
      ]);
      setProducts(normalizeProducts(productsData));
      setDeals(dealsData);
    } catch (error) {
      console.error('Fetch public data failed:', error.message);
    }
  };

  const loadPrivateData = async () => {
    if (!token) return;
    try {
      const [cartData, wishlistData, ordersData] = await Promise.all([
        apiRequest('/api/cart'),
        apiRequest('/api/wishlist'),
        apiRequest('/api/orders')
      ]);
      setCart((cartData.items || []).map(item => ({ id: item.productId || item.id, qty: item.qty || 1 })));
      setWishlist((wishlistData.items || []).map(item => item.productId || item.id));
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Fetch private data failed:', error.message);
    }
  };

  const saveCartToBackend = async (newCart) => {
    if (!user || !token) return;
    try {
      const items = newCart.map(item => {
        const product = products.find(p => (p.id || p._id) === item.id);
        return {
          productId: item.id,
          name: product?.name || 'Unknown item',
          emoji: product?.emoji || '🛍️',
          price: product?.price || 0,
          qty: item.qty,
          cat: product?.cat || 'Other'
        };
      });
      await apiRequest('/api/cart', { method: 'PUT', body: { items } });
    } catch (error) {
      console.error('Save cart failed:', error.message);
    }
  };

  const saveWishlistToBackend = async (newWishlist) => {
    if (!user || !token) return;
    try {
      const items = newWishlist.map(id => {
        const product = products.find(p => (p.id || p._id) === id);
        return {
          productId: id,
          name: product?.name || 'Unknown item',
          emoji: product?.emoji || '🛍️',
          price: product?.price || 0,
          cat: product?.cat || 'Other'
        };
      });
      await apiRequest('/api/wishlist', { method: 'PUT', body: { items } });
    } catch (error) {
      console.error('Save wishlist failed:', error.message);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const data = await apiRequest('/api/auth/login', { method: 'POST', body: { email, password }, auth: false });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('volt_token', data.token);
      localStorage.setItem('volt_user', JSON.stringify(data.user));
      setPage(data.user.role === 'admin' ? 'admin' : 'shop');
      addToast(`Welcome back, ${data.user.name.split(' ')[0]}!`, 'success');
      await loadPrivateData();
      return null;
    } catch (error) {
      return error.message;
    }
  };

  const signup = async ({ name, email, password, role }) => {
    try {
      const data = await apiRequest('/api/auth/signup', { method: 'POST', body: { name, email, password, role }, auth: false });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('volt_token', data.token);
      localStorage.setItem('volt_user', JSON.stringify(data.user));
      setPage(data.user.role === 'admin' ? 'admin' : 'shop');
      addToast('Account created!', 'success');
      await loadPrivateData();
      return null;
    } catch (error) {
      return error.message;
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setCart([]);
    setWishlist([]);
    localStorage.removeItem('volt_token');
    localStorage.removeItem('volt_user');
    setPage('home');
    addToast('Logged out', 'success');
  };

  const addCart = async (id) => {
    const existing = cart.find(i => i.id === id);
    const nextCart = existing
      ? cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { id, qty: 1 }];
    setCart(nextCart);
    await saveCartToBackend(nextCart);
    addToast('Added to cart', 'success');
  };

  const updateQty = async (id, delta) => {
    const nextCart = cart.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        if (newQty <= 0) return null;
        return { ...i, qty: newQty };
      }
      return i;
    }).filter(Boolean);
    setCart(nextCart);
    await saveCartToBackend(nextCart);
  };

  const removeCart = async (id) => {
    const nextCart = cart.filter(i => i.id !== id);
    setCart(nextCart);
    await saveCartToBackend(nextCart);
    addToast('Removed from cart', 'success');
  };

  const checkout = async () => {
    if (!user) { setPage('auth'); return; }
    const items = cart.map(i => {
      const p = products.find(p => (p.id || p._id) === i.id);
      return { name: p?.name || 'Unknown', emoji: p?.emoji || '🛍️', price: p?.price || 0, qty: i.qty };
    });
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const total = subtotal + (subtotal > 100 ? 0 : 10);
    const order = { userId: user.id, items, total };
    try {
      const created = await apiRequest('/api/orders', { method: 'POST', body: order });
      setOrders([created, ...orders]);
      setCart([]);
      await saveCartToBackend([]);
      setPage('orders');
      addToast('Order placed!', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const toggleWish = async (id) => {
    const contains = wishlist.includes(id);
    const nextWishlist = contains ? wishlist.filter(i => i !== id) : [...wishlist, id];
    setWishlist(nextWishlist);
    await saveWishlistToBackend(nextWishlist);
    addToast(contains ? 'Removed from wishlist' : 'Added to wishlist', 'success');
  };

  const viewProduct = (id) => { setSelectedId(id); setPage('detail'); };
  const backToShop = () => { setSelectedId(null); setPage('shop'); };
  const updateProduct = async (id, updates) => {
    try {
      const updated = normalizeProduct(await apiRequest(`/api/products/${id}`, { method: 'PUT', body: updates }));
      setProducts(products.map(p => p.id === id ? updated : p));
      addToast('Product updated', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };
  const addProduct = async (p) => {
    try {
      const created = normalizeProduct(await apiRequest('/api/products', { method: 'POST', body: p }));
      setProducts([...products, created]);
      addToast('Product added', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };
  const deleteProduct = async (id) => {
    try {
      await apiRequest(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
      addToast('Product deleted', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const addDeal = async (deal) => {
    try {
      const created = await apiRequest('/api/deals', { method: 'POST', body: deal });
      setDeals([...deals, created]);
      addToast('Deal added', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const updateDeal = async (id, updates) => {
    try {
      const updated = await apiRequest(`/api/deals/${id}`, { method: 'PUT', body: updates });
      setDeals(deals.map(d => d._id === id ? updated : d));
      addToast('Deal updated', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const deleteDeal = async (id) => {
    try {
      await apiRequest(`/api/deals/${id}`, { method: 'DELETE' });
      setDeals(deals.filter(d => d._id !== id));
      addToast('Deal removed', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const toggleDealActive = async (id) => {
    const deal = deals.find(d => d._id === id);
    if (!deal) return;
    await updateDeal(id, { ...deal, on: !deal.on });
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return user ? <ShopPage products={products} cart={cart} onAddCart={addCart} wishlist={wishlist} onToggleWish={toggleWish} onViewProduct={viewProduct} /> : <HomePage products={products.slice(0, 4)} onNav={nav} authUser={!!user} />;
      case 'shop': return user ? <ShopPage products={products} cart={cart} onAddCart={addCart} wishlist={wishlist} onToggleWish={toggleWish} onViewProduct={viewProduct} /> : <GuestPrompt onLogin={() => setPage('auth')} msg="Please sign in to shop." />;
      case 'cart': return user ? <CartPage products={products} cart={cart} onUpdateQty={updateQty} onRemove={removeCart} onCheckout={checkout} onNav={nav} /> : <GuestPrompt onLogin={() => setPage('auth')} msg="Please sign in to view your cart." />;
      case 'detail': return user ? <ProductDetailPage products={products} selectedId={selectedId} onAddCart={addCart} onBack={backToShop} wishlist={wishlist} onToggleWish={toggleWish} onViewProduct={viewProduct} /> : <GuestPrompt onLogin={() => setPage('auth')} msg="Please sign in to view product details." />;
      case 'wishlist': return user ? <WishlistPage products={products} wishlist={wishlist} onToggleWish={toggleWish} onAddCart={addCart} onNav={nav} onViewProduct={viewProduct} /> : <GuestPrompt onLogin={() => setPage('auth')} msg="Please sign in to access your wishlist." />;
      case 'orders': return user ? <OrdersPage orders={orders} onNav={nav} /> : <GuestPrompt onLogin={() => setPage('auth')} msg="Please sign in to access your orders." />;
      case 'profile': return user ? <ProfilePage user={user} onLogout={logout} onNav={nav} /> : <GuestPrompt onLogin={() => setPage('auth')} msg="Please sign in to view your profile." />;
      case 'admin': return user && user.role === 'admin' ? <AdminPanel products={products} deals={deals} cart={cart} orders={orders} onUpdateProduct={updateProduct} onAddProduct={addProduct} onDeleteProduct={deleteProduct} onAddDeal={addDeal} onUpdateDeal={updateDeal} onToggleDeal={toggleDealActive} onDeleteDeal={deleteDeal} onNav={nav} toast={addToast} /> : <div style={{padding:40,textAlign:'center'}}>Access denied.</div>;
      case 'auth': return <AuthScreen onLogin={login} onSignup={signup} />;
      default: return user ? <HomePage products={products.slice(0, 4)} onNav={nav} authUser={!!user} /> : <AuthScreen onLogin={login} onSignup={signup} />;
    }
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-left">
          <div className="logo" onClick={() => nav('home')}>VOLT</div>
          <div className="nav-links">
            {!user && <div className={`nav-link ${page === 'home' ? 'active' : ''}`} onClick={() => nav('home')}>Home</div>}
            {user && user.role !== 'admin' && (
              <>
                <div className={`nav-link ${page === 'shop' ? 'active' : ''}`} onClick={() => nav('shop')}>Shop</div>
                <div className={`nav-link ${page === 'wishlist' ? 'active' : ''}`} onClick={() => nav('wishlist')}>Wishlist</div>
                <div className={`nav-link ${page === 'orders' ? 'active' : ''}`} onClick={() => nav('orders')}>Orders</div>
              </>
            )}
            {user && user.role === 'admin' && <div className={`nav-link ${page === 'admin' ? 'active' : ''}`} onClick={() => nav('admin')}>Admin</div>}
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-icon" onClick={() => nav('cart')}>
            🛒
            {cart.length > 0 && <div className="cart-count">{cart.reduce((s, i) => s + i.qty, 0)}</div>}
          </div>
          {user ? (
            <div className="nav-icon" onClick={() => nav('profile')}>👤</div>
          ) : (
            <div className="nav-link" onClick={() => nav('auth')}>Login</div>
          )}
        </div>
      </nav>
      <main className="main">
        {renderPage()}
      </main>
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;