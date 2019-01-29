const express = require("express");
const Book = require('../dbconnection');

function routes() {
  const bookRouter = express.Router();

  bookRouter.route("/books")
    .post((req, res) => {
        const body = req.body;

        Book.create(body)
        .then(books => res.status(201).json(books))
        .catch(err => res.status(400).json(err));
    })
    .get((req, res) => {
        if (req.query.genre) {
            query.genre = req.query.genre;
          }

        Book.findAll().then(books => res.status(200).json(books));
    });

    bookRouter.use('/books/:bookId', (req, res, next) => {
        Book.findOne({
            where: { id: req.params.bookId }
        })
            .then(book => {
                if (book) {
                    req.book = book;
                    return next();
                }
                return res.sendStatus(404);
            })
    });

  bookRouter.route("/books/:bookId")
      .get((req, res) => res.status(200).json(req.book))
      .put((req, res) => {
        Book.update(
              {
                  title: req.body.title,
                  author: req.body.author,
                  genre: req.body.genre,
                  read: req.body.read ? req.body.read : 0
              },
              { returning: true, plain: true, where: { id: req.params.bookId } })
              .then(result => {
                  res.status(201).json(result);
              })
              .catch(err => res.status(404).json(err));
        })
      .delete((req, res) => {
          Book.destroy({
              where: { id: req.params.bookId }
          })
              .then(result => {
                  res.status(200).json(result);
              })
              .catch(err => res.status(404).json(err));
      })

  return bookRouter;
}

module.exports = routes;
