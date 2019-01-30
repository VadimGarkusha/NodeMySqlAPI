/* eslint-disable no-console */
const Sequelize = require('sequelize');
const BookModel = require('./models/book');

const port = process.env.PORT || 4000;
const config = [];

console.log(`Running in ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'Test') {
  config.push.apply(config, [
    'BooksNode_Test',
    'root',
    'password',
    { dialect: 'mysql', host: 'localhost', operatorsAliases: false },
  ]);
} else if (port == 4000) { // eslint-disable-line eqeqeq
  config.push.apply(config, [
    'BooksNode',
    'root',
    'password',
    { dialect: 'mysql', host: 'localhost', operatorsAliases: false },
  ]);
} else {
  config.push.apply(config, [
    'BooksNode',
    'root',
    'password',
    { dialect: 'mysql', host: '<heroku host>', operatorsAliases: false },
  ]);
}

const sequelize = new Sequelize(...config);

const Book = BookModel(sequelize, Sequelize);
const { Op } = Sequelize;

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = { Book, Op };
