"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "deviceProperties", // table name
        "adddisplay", // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "0",
        }
      ),
      queryInterface.addColumn(
        "deviceProperties", // table name
        "removedisplay", // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "0",
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
