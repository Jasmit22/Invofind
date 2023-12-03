const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(60), // Change from TEXT to STRING with a maximum length of 60 characters
      allowNull: false,
      validate: {
        len: [1, 60], // Set the maximum length
      },
    },
    date: {
      type: DataTypes.DATE,
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
    modelName: "location",
  }
);

module.exports = Location;
