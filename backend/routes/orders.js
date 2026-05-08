const express = require('express');
const router = express.Router();
const { getOrders, createOrder } = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getOrders);
router.post('/', authMiddleware, createOrder);

module.exports = router;
