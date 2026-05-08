const express = require('express');
const router = express.Router();
const { getCart, updateCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getCart);
router.put('/', authMiddleware, updateCart);

module.exports = router;
