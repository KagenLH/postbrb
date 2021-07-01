'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
    {
      story_id: 1,
      user_id: 1,
      content: 'this is a comment from user 1',
    },
    {
      story_id: 1,
      user_id: 2,
      content: 'this is a comment from user 2',
    },
    {
      story_id: 1,
      user_id: 3,
      content: 'this is a comment from user 3',
    },
    {
      story_id: 2,
      user_id: 1,
      content: 'this is a comment from user 1',
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
