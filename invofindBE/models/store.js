const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Store extends Model {}

Store.init(
  {
    location: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "companies", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "store",
  }
);

module.exports = Store;
