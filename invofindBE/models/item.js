const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Item extends Model {}

Item.init(
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
    price: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100], // Set the maximum length
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "departments", key: "id" },
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "categories", key: "id" },
      onDelete: "CASCADE",
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "locations", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "item",
  }
);

module.exports = Item;
