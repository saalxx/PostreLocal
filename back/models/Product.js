const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.JSON,
    allowNull: false, //esto lo que hace es que si o si el campo descripcion sea true (no puede estar vacio)
    validate: {
      isValidStructure(value) {  // esto nos permite para crear que sequelize permita validaciones personalizadas 
        if (
          typeof value !== "object" || 
          !value.numeroSerie ||
          !value.lugarFabricacion ||
          !value.detalle
        ) {
          throw new Error("La descripcion debe contener numeroSerie, lugarFabricacion y detalle");
        }
      }
    }
  },
  
});

module.exports = Product;