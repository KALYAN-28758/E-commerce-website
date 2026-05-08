# VOLT E-Commerce - Full Stack with MongoDB ✅

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- **MongoDB** (See [MongoDB Setup](./backend/MONGODB_SETUP.md))

### Step 1: Install MongoDB
Follow the [MongoDB Setup Guide](./backend/MONGODB_SETUP.md) for your OS.

### Step 2: Start MongoDB Server
- **Windows**: MongoDB starts automatically as a service
- **macOS**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

### Step 3: Seed the Database
```bash
cd backend
npm install
npm run seed
```

### Step 4: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on: **http://localhost:5000**

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on: **http://localhost:3001** (or 3003)

---

## ✨ What's Been Done

### MongoDB Integration
- ✅ Mongoose schemas for all models
- ✅ Bcryptjs password hashing
- ✅ Proper data validation
- ✅ Seed script with demo data
- ✅ Error handling with detailed messages

### Data Persistence
- ✅ Users stored in MongoDB
- ✅ Products stored in MongoDB
- ✅ Orders, Carts, Wishlists stored in MongoDB
- ✅ Full CRUD operations with validation

### Backend Architecture
```
backend/
├── server.js (Express + MongoDB connection)
├── .env (Configuration)
├── package.json (Dependencies)
├── config/
│   └── seedDB.js (Database seeding)
├── controllers/ (Async/await operations)
├── routes/ (API endpoints)
├── middleware/ (JWT authentication)
└── models/ (Mongoose schemas)
```

### Frontend Features
- ✅ API integration with backend
- ✅ JWT authentication
- ✅ LocalStorage for persistence
- ✅ Real-time data syncing
- ✅ Error handling

---

## 📝 Demo Accounts

After running `npm run seed`:

| Role     | Email               | Password   |
|----------|-------------------- |-----------|
| Customer | jane@volt.com       | jane123   |
| Admin    | admin@volt.com      | admin123  |

---

## 🔑 Key Features

### Authentication
- JWT-based with tokens stored in localStorage
- Bcryptjs password hashing
- Role-based access control (admin/customer)
- Persistent sessions

### Shopping Features
- Browse products
- Add to cart (synced to MongoDB)
- Wishlist management
- Checkout & order creation
- Order history & tracking

### Admin Features
- Product CRUD operations
- Deal/Offer management
- Dashboard with metrics
- Navigation buttons for quick access

### Data Persistence
- All data in MongoDB
- Cart/Wishlist synced to backend
- Order history maintained

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login (returns JWT)
- `GET /api/auth/profile` - Get profile (requires JWT)

### Products
- `GET /api/products` - List all
- `POST /api/products` - Create (admin only)
- `PUT /api/products/:id` - Update (admin only)
- `DELETE /api/products/:id` - Delete (admin only)

### Deals
- `GET /api/deals` - List all
- `POST /api/deals` - Create (admin only)
- `PUT /api/deals/:id` - Update (admin only)
- `DELETE /api/deals/:id` - Delete (admin only)

### Orders
- `GET /api/orders` - Get user's orders (or all if admin)
- `POST /api/orders` - Create new order

### Cart
- `GET /api/cart` - Get user's cart
- `PUT /api/cart` - Update user's cart

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `PUT /api/wishlist` - Update user's wishlist

---

## 📦 Database Collections

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: "admin" | "customer",
  createdAt: Date
}
```

### Products
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  orig: Number (original price),
  cat: String (category),
  desc: String,
  emoji: String,
  stock: Number,
  image: String (optional),
  createdAt: Date
}
```

### Orders
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  userId: ObjectId (ref: User),
  items: [ { productId, name, emoji, qty, price } ],
  total: Number,
  status: "Processing" | "Shipped" | "Delivered",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Start MongoDB: `mongod` or service
- Verify MongoDB is running: `mongosh`

### Seeding Fails
```bash
# Make sure MongoDB is running first
npm run seed
```

### Port Already in Use
```bash
# Change port in .env or kill process
# Kill node on port 5000:
lsof -i :5000  # macOS/Linux
taskkill /F /IM node.exe  # Windows
```

### JWT Token Errors
- Tokens expire after 7 days
- Login again to get new token
- Clear localStorage if having issues

---

## 📚 Useful Commands

```bash
# Database operations
npm run seed           # Seed initial data
mongosh               # Connect to MongoDB

# Development
npm run dev           # Run with nodemon (auto-restart)

# Frontend
npm run build         # Build for production
npm run eject         # Eject from CRA (irreversible)
```

---

## 🚀 Next Steps (Optional)

1. **Add file uploads** - Store product images
2. **Add email notifications** - Order confirmations
3. **Add payment gateway** - Stripe/Razorpay
4. **Add caching** - Redis for performance
5. **Add testing** - Jest/Mocha tests
6. **Deploy** - Vercel (frontend) + Render/Heroku (backend)

---

## 📖 Documentation

- [MongoDB Setup Guide](./backend/MONGODB_SETUP.md)
- [API Documentation](./backend/README.md) (optional)
- [Frontend README](./frontend/README.md)

---

**Your VOLT E-Commerce app is now fully set up with MongoDB! 🎉**

