const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const { role, id } = req.user;
    let orders;
    if (role === 'admin') {
      orders = await Order.find().populate('userId', 'name email');
    } else {
      orders = await Order.find({ userId: id });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders.', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      items,
      total
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order.', error: error.message });
  }
};