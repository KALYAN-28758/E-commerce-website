# VOLT E-Commerce App

A modern, dark-themed e-commerce application built with React for selling premium electronics and gadgets.

## Features

- **Product Catalog**: Browse electronics by category (Electronics, Gaming, Audio, Smart Home, Accessories)
- **Product Details**: Detailed product pages with images, descriptions, pricing, and stock status
- **Shopping Cart**: Add/remove items, update quantities, calculate totals with shipping
- **Wishlist**: Save favorite products for later
- **User Authentication**: Login/signup with demo accounts
- **Order Management**: View order history and status
- **Admin Panel**: Manage products (add, edit, delete) for administrators
- **Responsive Design**: Dark theme optimized for all devices

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: CSS with custom properties for theming
- **State Management**: React useState hooks
- **Icons**: Emoji-based icons for modern look
- **Fonts**: Inter for body text, Syne for headings

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GuestPrompt.js
│   │   ├── ProductCard.js
│   │   ├── ImageUploader.js
│   │   └── EditModal.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ShopPage.js
│   │   ├── CartPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── WishlistPage.js
│   │   ├── OrdersPage.js
│   │   ├── ProfilePage.js
│   │   ├── AdminPanel.js
│   │   └── AuthScreen.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── useToast.js
│   ├── styles.css
│   ├── App.js
│   └── index.js
└── package.json
```

## Getting Started

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** to `http://localhost:3000`

## Demo Accounts

- **Customer**: email: `user@volt.com`, password: `user123`
- **Admin**: email: `admin@volt.com`, password: `admin123`

## Key Components

- **App.js**: Main application with routing and state management
- **ProductCard.js**: Reusable product display component
- **AuthScreen.js**: Login/signup forms
- **AdminPanel.js**: Product management interface
- **CartPage.js**: Shopping cart with checkout
- **ProductDetailPage.js**: Individual product details

## Features Implemented

- ✅ Modular component architecture
- ✅ State management with React hooks
- ✅ Responsive dark theme design
- ✅ Product filtering and search
- ✅ Shopping cart functionality
- ✅ User authentication flow
- ✅ Admin product management
- ✅ Toast notifications
- ✅ Image upload support
- ✅ Order tracking
- ✅ Wishlist functionality

The application maintains good code quality with proper separation of concerns, reusable components, and clean state management patterns.