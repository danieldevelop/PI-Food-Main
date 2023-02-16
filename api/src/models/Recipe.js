const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    // id, lo crea automaticamente el sequelize

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary_dish: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    health_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    steps: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  });
};
