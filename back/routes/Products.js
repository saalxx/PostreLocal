const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
// GET todos
router.get("/", authMiddleware , async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// POST crear
router.post("/",  authMiddleware ,async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});
 // buscar uno en especial
router.get("/:id", authMiddleware , async (req, res)=>{
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json(product);
});
module.exports = router;