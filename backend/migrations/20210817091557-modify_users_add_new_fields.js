"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn("deviceConsume", "issueTo", "UserId");
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
