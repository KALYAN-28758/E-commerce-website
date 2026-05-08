const express = require('express');
const router = express.Router();
const { getWishlist, updateWishlist } = require('../controllers/wishlistController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getWishlist);
router.put('/', authMiddleware, updateWishlist);

module.exports = router;
