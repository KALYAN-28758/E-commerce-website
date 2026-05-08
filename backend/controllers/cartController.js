const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart.', error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update cart.', error: error.message });
  }
};