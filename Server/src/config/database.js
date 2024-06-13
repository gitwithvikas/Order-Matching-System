const { Sequelize } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
