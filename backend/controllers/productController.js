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

    console.log("\n========== PRODUCT API HIT ==========");
    console.log("BODY:");
    console.log(JSON.stringify(req.body, null, 2));

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

    console.log("RAW VALUES:");
    console.log({
      name,
      price,
      orig,
      cat,
      desc,
      emoji,
      stock,
      image
    });

    const allowedCategories = [
      'Electronics',
      'Kitchen',
      'Home',
      'Stationery',
      'Fashion',
      'Furniture',
      'Other'
    ];

    const formattedCategory =
      cat
        ? cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()
        : '';

    console.log("FORMATTED CATEGORY:", formattedCategory);

    if (!allowedCategories.includes(formattedCategory)) {

      console.log("❌ INVALID CATEGORY");

      return res.status(400).json({
        message: "Invalid category",
        received: formattedCategory
      });
    }

    const productData = {

      name: String(name || '').trim(),

      price: Number(price),

      orig: orig ? Number(orig) : Number(price),

      cat: formattedCategory,

      desc: String(desc || '').trim(),

      emoji: emoji || '🛍️',

      stock: stock ? Number(stock) : 0,

      image: image || ''
    };

    console.log("\nFINAL PRODUCT DATA:");
    console.log(productData);

    const product = await Product.create(productData);

    console.log("\n✅ PRODUCT SAVED:");
    console.log(product);

    res.status(201).json(product);

  } catch (error) {

    console.log("\n❌ PRODUCT SAVE ERROR:");
    console.log(error);

    if (error.errors) {

      Object.keys(error.errors).forEach((key) => {

        console.log(
          "FIELD:",
          key,
          "MESSAGE:",
          error.errors[key].message
        );

      });
    }

    res.status(500).json({
      message: "Failed to create product",
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
