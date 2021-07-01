'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {
      username:'aleckeeler99',
      email: 'aleckeeler@postbrb.com',
      hashedPassword: '$2a$10$zR2Fi5nXkNPH9occMIpHAeZMyfpnIUlt7ROI0uOeN2vf1G9vbl2Um',
      avatarUrl: '/assets/avatars/woman.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
