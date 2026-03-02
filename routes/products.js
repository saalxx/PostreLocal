const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET todos
router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// POST crear
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

module.exports = router;