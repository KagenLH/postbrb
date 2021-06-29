'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    catagory_id: DataTypes.INTEGER
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
    Story.belongsTo(models.User,{foreignKey:'user_id'});
  };
  return Story;
};
