const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const User = require("../module/Authmodule");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // React dev server
    credentials: true,
  })
);

// ===== Routes =====

// Root test
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running!" });
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
});

// Seed users (run once)
app.get("/seed-users", async (req, res) => {
  try {
    const users = await User.insertMany([
      { name: "Swetha", number: "12345" },
      { name: "Alex", number: "67890" },
      { name: "John", number: "11111" }
    ]);
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ message: "Seed failed", error: err });
  }
});

// Example POST and PATCH routes
app.post("/about", (req, res) => {
  res.status(200).json({ message: "creation" });
});

app.patch("/updation", (req, res) => {
  res.status(200).json({ message: "updation" });
});

// ===== MongoDB connection =====
mongoose.connect(process.env.MANGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
