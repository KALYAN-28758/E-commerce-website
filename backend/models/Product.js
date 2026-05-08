const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  orig: {
    type: Number,
    default: null
  },
  cat: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Kitchen', 'Home', 'Stationery', 'Fashion', 'Furniture', 'Other'],
    trim: true,
    set: (value) => typeof value === 'string' ? value.trim() : value
  },
  desc: {
    type: String,
    required: [true, 'Description is required']
  },
  emoji: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);