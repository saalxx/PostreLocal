const express = require("express");
const cors = require("cors");  
const app = express();
const sequelize = require("./config/database");
const productRoutes = require("./routes/Products");
const authRoutes = require("./routes/Auth");

app.use(cors());                
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;

sequelize.sync()
  .then(() => {
    console.log("📦 DB sincronizada");
    app.listen(PORT, () => {
      console.log(`🚀 Server en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ Error DB:", err));