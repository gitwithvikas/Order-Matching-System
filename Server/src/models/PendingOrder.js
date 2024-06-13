const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PendingOrder = sequelize.define('PendingOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    buyer_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    buyer_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    seller_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    seller_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'pending_orders',
    timestamps: false
});

module.exports = PendingOrder;
