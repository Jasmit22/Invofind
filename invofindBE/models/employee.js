const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "employee",

    defaultScope: {
      // where: {},
    },
    scopes: {
      admin: {
        where: {
          admin: true,
        },
      },
    },
  }
);

module.exports = Employee;
