// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { connection } = require('./config/db')
const userRoutes = require("./routes/user.routes")
const restaurantRoutes = require("./routes/restaurant.routes")
const orderRoutes = require("./routes/order.routes")

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Routes and other configurations will be added later
app.use("/api",userRoutes)
app.use("/api/restaurants",restaurantRoutes)
app.use("/api/orders",orderRoutes)

// Start the server
app.listen(port, async () => {
    try {
        await connection;
        console.log(`Mongo DB connected!`);
    } catch (error) {
        console.log(error)
        console.log("Something went wrong")
    }
  console.log(`Server is running on port ${port}`);
});
