const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Store extends Model {}

Store.init(
  {
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    companyId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "companies", key: "name" },
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
