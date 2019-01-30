const booksController = (Book, Op) => {
  const get = (req, res) => {
    const genre = req.query.genre ? req.query.genre : '';

    Book.findAll({ where: { genre: { [Op.like]: `%${genre}%` } } }).then(
      books => {
          const returnBooks = books.map(book => {
              let newBook = book.toJSON();
              newBook.links = {self:`http://${req.headers.host}/api/books/${book.id}`};
              return newBook;
          })
          console.log(returnBooks);
          res.status(200).json(returnBooks);}
    );
  };

  const post = (req, res) => {
    const { body } = req;

    if(!body.title){
        res.status(400);
        return res.send('Title is required');
    }

    Book.create(body)
      .then(books => {
          res.status(201)
          return res.json(books);
        })
      .catch(err => res.status(400).json(err));
  };

  return { post, get };
};

module.exports = booksController;
