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

  bookRouter.route("/books/:bookId")
  .get((req, res) => {
    const queryString = "SELECT * FROM BOOKS WHERE ID = ?";

    getConnection().query(queryString, req.params.bookId, (err, results, fields) => {
        if (err) {
          console.log(`Failed to query for books: ${err}`);
          res.sendStatus(500);
          return;
        }

        console.log("Fetched successfully");
        return res.status(200).json(results);
      }
    );
  })
  .put((req, res) => {
    const queryString = "UPDATE BOOKS SET ? WHERE  ID = ?";
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        read: req.body.read ? req.body.read : 0
      };

    getConnection().query(queryString, [book, req.params.bookId], (err, results, fields) => {
        if (err) {
          console.log(`Failed to query for books: ${err}`);
          res.sendStatus(500);
          return;
        }

        console.log("Updated successfully");
        res.end();
      }
    );
    return res.status(201).json(book);
  })
  .delete((req, res) => {
    const queryString = "DELETE FROM BOOKS WHERE  ID = ?";

    getConnection().query(queryString, req.params.bookId, (err, results, fields) => {
        if (err) {
          console.log(`Failed to query for books: ${err}`);
          res.sendStatus(500);
          return;
        }

        console.log("Deleted successfully");
        res.end();
      }
    );
    return res.status(204);
  })

  return bookRouter;
}

module.exports = routes;
