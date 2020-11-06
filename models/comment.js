module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Comment;
  };