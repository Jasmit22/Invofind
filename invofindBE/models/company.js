const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Company extends Model {}

Company.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "company",
  }
);

module.exports = Company;
