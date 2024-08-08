"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "Mini",
          email: "mini@mail.com",
          password: "12345",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "Miki",
          email: "miki@mail.com",
          password: "12345",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
