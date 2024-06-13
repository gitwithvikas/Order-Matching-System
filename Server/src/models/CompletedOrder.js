const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompletedOrder = sequelize.define('CompletedOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'completed_orders',
    timestamps: false
});

module.exports = CompletedOrder;
