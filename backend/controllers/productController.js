const Product = require('../models/Product');

exports.getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    console.log("✅ PRODUCTS FETCHED:", products.length);

    res.status(200).json(products);

  } catch (error) {

    console.log("\n❌ FETCH PRODUCT ERROR:");
    console.log(error);

    res.status(500).json({
      message: 'Failed to fetch products.',
      error: error.message
    });
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

    // Required validation
    if (!name || !price || !cat || !desc) {

      return res.status(400).json({
        message: 'Name, price, category and description are required.'
      });
    }

    // Allowed categories
    const allowedCategories = [
      'Electronics',
      'Kitchen',
      'Home',
      'Stationery',
      'Fashion',
      'Furniture',
      'Other'
    ];

    // Fix category formatting
    const formattedCategory =
      String(cat).trim().charAt(0).toUpperCase() +
      String(cat).trim().slice(1).toLowerCase();

    // Validate category
    if (!allowedCategories.includes(formattedCategory)) {

      return res.status(400).json({
        message: `Invalid category. Allowed: ${allowedCategories.join(', ')}`
      });
    }

    const productData = {

      name: String(name).trim(),

      price: Number(price),

      orig: orig ? Number(orig) : Number(price),

      cat: formattedCategory,

      desc: String(desc).trim(),

      emoji: emoji || '🛍️',

      stock: stock ? Number(stock) : 0,

      image: image || ''
    };

    console.log("\n✅ FINAL PRODUCT DATA:");
    console.log(productData);

    const product = await Product.create(productData);

    console.log("\n✅ PRODUCT INSERTED SUCCESSFULLY:");
    console.log(product);

    res.status(201).json(product);

  } catch (error) {

    console.log("\n❌ PRODUCT CREATE ERROR:");
    console.log(error);

    if (error.errors) {

      console.log("\n🚨 VALIDATION ERRORS:");

      Object.keys(error.errors).forEach((key) => {

        console.log(`${key}: ${error.errors[key].message}`);

      });
    }

    res.status(500).json({
      message: 'Failed to create product.',
      error: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {

  try {

    console.log("\n📝 UPDATE PRODUCT:");
    console.log(req.body);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {

      return res.status(404).json({
        message: 'Product not found.'
      });
    }

    console.log("✅ PRODUCT UPDATED");

    res.status(200).json(product);

  } catch (error) {

    console.log("\n❌ UPDATE PRODUCT ERROR:");
    console.log(error);

    res.status(400).json({
      message: 'Failed to update product.',
      error: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {

      return res.status(404).json({
        message: 'Product not found.'
      });
    }

    console.log("🗑️ PRODUCT DELETED");

    res.status(200).json({
      message: 'Product deleted successfully.'
    });

  } catch (error) {

    console.log("\n❌ DELETE PRODUCT ERROR:");
    console.log(error);

    res.status(500).json({
      message: 'Failed to delete product.',
      error: error.message
    });
  }
};
