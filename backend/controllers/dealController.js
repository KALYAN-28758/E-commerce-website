const Deal = require('../models/Deal');

exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch deals.', error: error.message });
  }
};

exports.createDeal = async (req, res) => {
  try {
    const { title, pct, code, on } = req.body;
    const deal = await Deal.create({ title, pct, code: (code || '').toUpperCase(), on });
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create deal.', error: error.message });
  }
};

exports.updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!deal) return res.status(404).json({ message: 'Deal not found.' });
    res.json(deal);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update deal.', error: error.message });
  }
};

exports.deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ message: 'Deal not found.' });
    res.json({ message: 'Deal deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete deal.', error: error.message });
  }
};