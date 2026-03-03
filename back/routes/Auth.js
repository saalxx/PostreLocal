const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "supersecreto";

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Usuario creado", id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
});

// =========================
// LOGIN (con email)
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscamos por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
});

module.exports = router;