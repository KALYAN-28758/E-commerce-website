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
    min: [0, 'Price cannot be negative']
  },

  orig: {
    type: Number,
    default: 0,
    min: [0, 'Original price cannot be negative']
  },

  cat: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'Electronics',
        'Kitchen',
        'Home',
        'Stationery',
        'Fashion',
        'Furniture',
        'Other'
      ],
      message: 'Invalid category'
    },
    trim: true
  },

  desc: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },

  emoji: {
    type: String,
    default: '🛍️'
  },

  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },

  image: {
    type: String,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
