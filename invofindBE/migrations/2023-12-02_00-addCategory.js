const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("categories", {
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
      store_location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "stores", key: "location" },
        onDelete: "CASCADE",
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("categories");
  },
};
