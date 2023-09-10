const express = require("express");
const orderRoutes = express.Router();
const OrderModel = require("../models/order.model");

// Place an order
orderRoutes.post("/", async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error placing the order" });
  }
});

// Get the details of a specific order by ID
orderRoutes.get("/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate('user')
      .populate('restaurant');
      
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order details" });
  }
});

// Update the status of a specific order by ID
orderRoutes.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating the order status" });
  }
});

module.exports = orderRoutes;
