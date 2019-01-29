const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("book", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    author: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    genre: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    read: {
      type: Sequelize.TEXT("tiny")
    }
  });
};
