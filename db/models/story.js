'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
    Story.belongsTo(models.User,{foreignKey:'user_id'});
    Story.hasMany(models.Comment,{
      foreignKey:'story_id',
      onDelete: 'CASCADE',
      hooks: 'true',
    });
  };
  return Story;
};
