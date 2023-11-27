const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("departments", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dept_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      store_location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "stores", key: "location" },
        onDelete: "CASCADE",
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("departments");
  },
};
