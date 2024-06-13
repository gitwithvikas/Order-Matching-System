const express = require('express');
const sequelize = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config()

const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all models
        await sequelize.sync({ force: false });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
