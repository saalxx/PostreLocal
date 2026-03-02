const express = require("express");
const app = express();
const sequelize = require("./config/database");
const productRoutes = require("./routes/products");

app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = 3000;

sequelize.sync()
  .then(() => {
    console.log("📦 DB sincronizada");
    app.listen(PORT, () => {
      console.log(`🚀 Server en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ Error DB:", err));