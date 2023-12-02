const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("tasks", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(60), // Change from TEXT to STRING with a maximum length of 60 characters
        allowNull: false,
        validate: {
          len: [1, 60], // Set the maximum length
        },
      },
      resolved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "employees", key: "id" },
        onDelete: "CASCADE",
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "items", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("tasks");
  },
};
