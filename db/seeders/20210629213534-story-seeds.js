'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Stories', [
    {
    title: 'Stef',
    content: 'This is Stef\'s content',
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    },

    {
    title: 'Diana',
    content: 'This is Diana\'s content',
    user_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    },

    {
    title: 'Jun',
    content: 'This is Jun\'s content',
    user_id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    },

    {
    title: 'Kagen',
    content: 'This is Kagen\'s content',
    user_id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Stories', null, {});
  }
};
