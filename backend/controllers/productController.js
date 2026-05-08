const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products.', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {

    console.log("\n📦 PRODUCT BODY RECEIVED:");
    console.log(req.body);

    const {
      name,
      price,
      orig,
      cat,
      desc,
      emoji,
      stock,
      image
    } = req.body;

    // Validation
    if (!name || !price || !cat) {
      return res.status(400).json({
        message: 'Name, price and category are required.'
      });
    }

    const productData = {
      name: String(name).trim(),
      price: Number(price),
      orig: orig ? Number(orig) : Number(price),
      cat: String(cat).trim(),
      desc: desc || '',
      emoji: emoji || '🛍️',
      stock: stock ? Number(stock) : 0,
      image: image || ''
    };

    console.log("\n✅ FINAL PRODUCT DATA:");
    console.log(productData);

    const product = await Product.create(productData);

    console.log("\n✅ PRODUCT INSERTED:");
    console.log(product);

    res.status(201).json(product);

  } catch (error) {

    console.log("\n❌ PRODUCT CREATE ERROR:");
    console.log(error);

    res.status(500).json({
      message: 'Failed to create product.',
      error: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product.', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product.', error: error.message });
  }
};
