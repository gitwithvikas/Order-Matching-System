const { PendingOrder, CompletedOrder, sequelize } = require('../models');

const { Op } = require('sequelize')




async function placeOrder(req, res) {
    const { buyer_qty, buyer_price, seller_price, seller_qty } = req.body;
    try {
        await sequelize.transaction(async (t) => {
            const pendingOrders = await PendingOrder.findAll({
                where: {
                    buyer_price: { [Op.gte]: seller_price },
                    seller_price: { [Op.lte]: buyer_price }
                },
                transaction: t
            });

            let remainingQty = buyer_qty;

            for (const order of pendingOrders) {
                if (remainingQty === 0) break;

                const matchQty = Math.min(order.seller_qty, remainingQty);
                remainingQty -= matchQty;
                order.seller_qty -= matchQty;

                if (order.seller_qty === 0) {
                    await order.destroy({ transaction: t });
                } else {
                    await order.save({ transaction: t });
                }

                await CompletedOrder.create({
                    price: seller_price,
                    qty: matchQty
                }, { transaction: t });
            }

            if (remainingQty > 0) {
                await PendingOrder.create({
                    buyer_qty: remainingQty,
                    buyer_price: buyer_price,
                    seller_price: seller_price,
                    seller_qty: seller_qty
                }, { transaction: t });
            }
        });

        res.json({ status: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
}

module.exports = { placeOrder };
