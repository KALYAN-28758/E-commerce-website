const express = require('express');
const router = express.Router();
const { getDeals, createDeal, updateDeal, deleteDeal } = require('../controllers/dealController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', getDeals);
router.post('/', createDeal);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

module.exports = router;
