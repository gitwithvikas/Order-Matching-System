const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const PendingOrder = require('../models/PendingOrder');
const CompletedOrder = require('../models/CompletedOrder');

const router = express.Router();

router.post('/place_order', placeOrder);

router.get('/pending_orders', async (req, res) => {
    try {
        const pendingOrders = await PendingOrder.findAll();
        res.json(pendingOrders);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

router.get('/completed_orders', async (req, res) => {
    try {
        const completedOrders = await CompletedOrder.findAll();
        res.json(completedOrders);
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

module.exports = router;
