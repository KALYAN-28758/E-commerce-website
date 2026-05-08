# MongoDB Setup Guide

## Prerequisites

Install MongoDB Community Edition on your system:

### Windows
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will be installed at `C:\Program Files\MongoDB\Server\{version}`
4. MongoDB runs as a service by default

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
apt-get update
apt-get install -y mongodb-org
sudo systemctl start mongod
```

---

## MongoDB Connection

### Default Connection String
```
mongodb://localhost:27017/volt-ecommerce
```

This is already configured in the `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/volt-ecommerce
```

---

## Verify MongoDB is Running

### Windows
MongoDB runs as a Windows Service. Check Services (services.msc) or:
```cmd
net start MongoDB
```

### macOS/Linux
```bash
brew services list  # macOS
sudo systemctl status mongod  # Linux
```

### Test Connection
```bash
mongosh  # or mongo for older versions
```

---

## Setup Instructions

### 1. Start MongoDB Server

**Windows:**
- MongoDB should start automatically as a service
- Or manually: `C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe`

**macOS/Linux:**
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

### 2. Verify Connection
```bash
mongosh
```
You should see a `test>` prompt. Type `exit` to quit.

### 3. Seed the Database
```bash
cd e:/E-Commerce/backend
npm run seed
```

This will:
- Create 2 demo users (admin@volt.com, jane@volt.com)
- Create 8 demo products
- Create 3 demo deals

### 4. Start the Backend
```bash
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### 5. Start the Frontend
```bash
cd e:/E-Commerce/frontend
npm start
```

---

## Demo Accounts

After seeding:

| Role     | Email               | Password   |
|----------|-------------------- |-----------|
| Customer | jane@volt.com       | jane123   |
| Admin    | admin@volt.com      | admin123  |

---

## Stop MongoDB

**Windows:**
```cmd
net stop MongoDB
```

**macOS:**
```bash
brew services stop mongodb-community
```

**Linux:**
```bash
sudo systemctl stop mongod
```

---

## MongoDB Tools

### Compass (GUI)
Download MongoDB Compass: https://www.mongodb.com/products/compass

- Visual database browser
- Query builder
- Performance monitoring

### CLI (mongosh)
```bash
mongosh                    # Connect to default database
mongosh "mongodb://..."    # Connect to specific URI
show dbs                   # List all databases
use volt-ecommerce         # Switch database
show collections           # List collections
db.users.find()           # View all users
```

---

## Troubleshooting

### MongoDB not connecting
- Check if MongoDB service is running
- Verify port 27017 is open
- Check `.env` file for correct `MONGODB_URI`

### Connection timeout
```bash
# Test connection
mongosh --eval "db.version()"
```

### Port already in use
MongoDB default port is 27017. Change in `.env`:
```
MONGODB_URI=mongodb://localhost:27018/volt-ecommerce
```

### Permission denied
Run with sudo (macOS/Linux):
```bash
sudo mongod
# or
sudo systemctl start mongod
```

---

## Database Structure

### Collections Created:
- `users` - User accounts (admin/customer)
- `products` - Product catalog
- `deals` - Promotional deals
- `orders` - Customer orders
- `carts` - Shopping carts
- `wishlists` - Wishlist items

---

**Backend is now fully MongoDB integrated! 🚀**
