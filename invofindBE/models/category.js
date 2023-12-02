const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100], // Set the maximum length
      },
    },
    storeLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "stores", key: "location" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "category",
  }
);

module.exports = Category;
