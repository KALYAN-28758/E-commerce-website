const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const Deal = require('../models/Deal');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/volt-ecommerce');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Deal.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Seed users
    const hashedPassword1 = await bcrypt.hash('admin123', 10);
    const hashedPassword2 = await bcrypt.hash('jane123', 10);

    await User.create([
      { name: 'Admin User', email: 'admin@volt.com', password: hashedPassword1, role: 'admin' },
      { name: 'Jane Doe', email: 'jane@volt.com', password: hashedPassword2, role: 'customer' }
    ]);

    console.log('👥 Users seeded');

    // Seed products
    await Product.create([
      { name: 'Ceramic mug', price: 34, orig: null, cat: 'Kitchen', desc: 'Handmade ceramic in matte finish.', emoji: '☕', stock: 18 },
      { name: 'Leather journal', price: 52, orig: 68, cat: 'Stationery', desc: 'Full-grain leather, 200 ivory pages.', emoji: '📒', stock: 9 },
      { name: 'Linen throw', price: 110, orig: null, cat: 'Home', desc: 'Stonewashed linen, earthy tones.', emoji: '🛋️', stock: 4 },
      { name: 'Soy candle set', price: 44, orig: 58, cat: 'Home', desc: 'Three hand-poured, 40hr burn.', emoji: '🕯️', stock: 20 },
      { name: 'Merino scarf', price: 88, orig: null, cat: 'Fashion', desc: '140cm herringbone weave.', emoji: '🧣', stock: 0 },
      { name: 'Brass lamp', price: 175, orig: 210, cat: 'Furniture', desc: 'Adjustable arc with Edison bulb.', emoji: '🪔', stock: 3 },
      { name: 'Honey trio', price: 36, orig: null, cat: 'Kitchen', desc: 'Wildflower, manuka & lavender.', emoji: '🍯', stock: 28 },
      { name: 'Ring set', price: 68, orig: 82, cat: 'Fashion', desc: 'Three sterling silver stackers.', emoji: '💍', stock: 11 }
    ]);

    console.log('📦 Products seeded');

    // Seed deals
    await Deal.create([
      { title: 'Summer sale', pct: 20, code: 'SUMMER20', on: true },
      { title: 'Welcome', pct: 15, code: 'WELCOME15', on: true },
      { title: 'Flash Friday', pct: 30, code: 'FLASH30', on: false }
    ]);

    console.log('🎯 Deals seeded');

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
