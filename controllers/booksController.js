booksController = (Book, Op) => {
    get = (req, res) => {
        let genre = '';
        if (req.query.genre) {
            genre = req.query.genre;
          }

        Book.findAll({where: { genre: { [Op.like]: `%${genre}%` }}})
        .then(books => res.status(200).json(books));
    }

    post = (req, res) => {
        const body = req.body;

        Book.create(body)
        .then(books => res.status(201).json(books))
        .catch(err => res.status(400).json(err));
    }

    return {post, get};
}

module.exports = booksController;