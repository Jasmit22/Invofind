const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("items", {
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
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "departments", key: "id" },
        onDelete: "CASCADE",
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "categories", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("items");
  },
};
