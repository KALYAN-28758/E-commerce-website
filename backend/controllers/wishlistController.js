const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    res.json(wishlist || { userId: req.user.id, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist.', error: error.message });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { items } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.user.id },
      { items },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update wishlist.', error: error.message });
  }
};