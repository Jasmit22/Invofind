const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("companies", {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    });
    await queryInterface.createTable("stores", {
      location: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "companies", key: "name" },
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addColumn("employees", "store_location", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "stores", key: "location" },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("companies");
    await queryInterface.dropTable("stores");
  },
};
