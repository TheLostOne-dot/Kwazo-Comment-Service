module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment",
    {
      content: {
        type: Sequelize.STRING,
      },
    },
    {
      updatedAt: false,
    }
  );
  return Comment;
};
