const Sequelize = require("sequelize");
const BookModel = require("./models/book");

port = process.env.PORT || 4000;
let config = [];

if (port == 4000) {
  config.push.apply(config, [
    "BooksNode",
    "root",
    "password",
    { dialect: "mysql", host: "localhost", operatorsAliases: false }
  ]);
} else {
  //same as above, with live server details
}

const sequelize = new Sequelize(...config);

const Book = BookModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = Book;