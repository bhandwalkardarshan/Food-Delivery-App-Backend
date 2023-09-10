const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = express.Router();
const UserModel = require("../models/user.model");

// Register a new user
userRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    // Check if the user with the given email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      address
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log('Error in register', error);
    res.status(500).json({ error: "Error registering user"});
  }
});

// Login and return a JWT token
userRoutes.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Reset user password
userRoutes.post("/user/:id/reset", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the provided current password matches the stored password
      const passwordMatch = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }
  
      // Hash the new password before updating it
      const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
  
      // Update the user's password with the new hashed password
      user.password = newPasswordHash;
      await user.save();
  
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error resetting password" });
    }
  });

module.exports = userRoutes;
