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
    const { name, price, orig, cat, desc, emoji, stock, image } = req.body;
    const product = await Product.create({
      name,
      price,
      orig,
      cat: typeof cat === 'string' ? cat.trim() : cat,
      desc,
      emoji,
      stock,
      image
    });
    console.log('\n✅ NEW PRODUCT ADDED TO MONGODB:');
    console.log('==================================');
    console.log(JSON.stringify(product, null, 2));
    console.log('==================================\n');
    res.status(201).json(product);
  } catch (error) {
    console.error('❌ ERROR ADDING PRODUCT:', error.message);
    res.status(400).json({ message: 'Failed to create product.', error: error.message });
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