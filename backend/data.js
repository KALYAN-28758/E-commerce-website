const users = [
  { id: 1, name: 'Admin User', email: 'admin@volt.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Jane Doe', email: 'jane@volt.com', password: 'jane123', role: 'customer' }
];

let nextUserId = 3;
let nextProductId = 9;
let nextDealId = 4;

const products = [
  { id: 1, name: 'Ceramic mug', price: 34, orig: null, cat: 'Kitchen', desc: 'Handmade ceramic in matte finish.', emoji: '☕', stock: 18 },
  { id: 2, name: 'Leather journal', price: 52, orig: 68, cat: 'Stationery', desc: 'Full-grain leather, 200 ivory pages.', emoji: '📒', stock: 9 },
  { id: 3, name: 'Linen throw', price: 110, orig: null, cat: 'Home', desc: 'Stonewashed linen, earthy tones.', emoji: '🛋️', stock: 4 },
  { id: 4, name: 'Soy candle set', price: 44, orig: 58, cat: 'Home', desc: 'Three hand-poured, 40hr burn.', emoji: '🕯️', stock: 20 },
  { id: 5, name: 'Merino scarf', price: 88, orig: null, cat: 'Fashion', desc: '140cm herringbone weave.', emoji: '🧣', stock: 0 },
  { id: 6, name: 'Brass lamp', price: 175, orig: 210, cat: 'Furniture', desc: 'Adjustable arc with Edison bulb.', emoji: '🪔', stock: 3 },
  { id: 7, name: 'Honey trio', price: 36, orig: null, cat: 'Kitchen', desc: 'Wildflower, manuka & lavender.', emoji: '🍯', stock: 28 },
  { id: 8, name: 'Ring set', price: 68, orig: 82, cat: 'Fashion', desc: 'Three sterling silver stackers.', emoji: '💍', stock: 11 }
];

const deals = [
  { id: 1, title: 'Summer sale', pct: 20, code: 'SUMMER20', on: true },
  { id: 2, title: 'Welcome', pct: 15, code: 'WELCOME15', on: true },
  { id: 3, title: 'Flash Friday', pct: 30, code: 'FLASH30', on: false }
];

const orders = [
  {
    id: 'ORD-1001',
    userId: 2,
    date: 'Apr 28, 2025',
    status: 'Delivered',
    items: [
      { emoji: '☕', name: 'Ceramic mug', qty: 2, price: 34 },
      { emoji: '🕯️', name: 'Soy candle set', qty: 1, price: 44 }
    ],
    total: 112
  },
  {
    id: 'ORD-1002',
    userId: 2,
    date: 'May 2, 2025',
    status: 'Shipped',
    items: [
      { emoji: '📒', name: 'Leather journal', qty: 1, price: 52 }
    ],
    total: 62
  },
  {
    id: 'ORD-1003',
    userId: 2,
    date: 'May 5, 2025',
    status: 'Processing',
    items: [
      { emoji: '🍯', name: 'Honey trio', qty: 3, price: 36 }
    ],
    total: 118
  }
];

const carts = [
  { userId: 2, items: [] }
];

const wishlists = [
  { userId: 2, items: [] }
];

module.exports = {
  users,
  products,
  deals,
  orders,
  carts,
  wishlists,
  nextUserId,
  nextProductId,
  nextDealId
};
