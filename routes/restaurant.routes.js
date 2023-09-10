const express = require("express");
const restaurantRoutes = express.Router();
const RestaurantModel = require("../models/restaurant.model");

// Create a new restaurant
restaurantRoutes.post("/", async (req, res) => {
  try {
    const newRestaurant = await RestaurantModel.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Error creating a new restaurant" });
  }
});

// Get all restaurants
restaurantRoutes.get("/", async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching restaurants" });
  }
});

// Get a single restaurant by ID
restaurantRoutes.get("/:id", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the restaurant" });
  }
});

// Add this route to restaurantRoutes.js

// Get the menu of a specific restaurant by ID
restaurantRoutes.get("/:id/menu", async (req, res) => {
    try {
      const restaurant = await RestaurantModel.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
  
      const menu = restaurant.menu; // Assuming "menu" is an array of menu items
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ error: "Error fetching the menu" });
    }
  });
  

// Update a restaurant by ID
restaurantRoutes.put("/:id", async (req, res) => {
  try {
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Error updating the restaurant" });
  }
});

// Delete a restaurant by ID
restaurantRoutes.delete("/:id", async (req, res) => {
  try {
    const deletedRestaurant = await RestaurantModel.findByIdAndRemove(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Error deleting the restaurant" });
  }
});

module.exports = restaurantRoutes;
