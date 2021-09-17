const { books, getId } = require("./db");

const routes = [
  {
    path: "/book",
    method: "get",
    handleRoute: (req, res) => {
      const { query } = req;
      const { id, text, limit: limitStr, skip: skipStr } = query;
      let filteredBooks = books;
      if (id) {
        filteredBooks = filteredBooks.find(({ id }) => id === id);
      } else if (text) {
        const regexQuery = new RegExp(`.*${text}.*`);
        filteredBooks = filteredBooks.filter(({ titulo }) =>
          regexQuery.test(titulo)
        );
      }
      const limit = Number(limitStr);
      const skip = Number(skipStr) ? Number(skipStr) : 0;
      const start = skip;
      const end = limit ? skip + limit : undefined;
      filteredBooks = filteredBooks.slice(start, end);
      res.send(filteredBooks);
    },
  },
  {
    path: "/book",
    method: "post",
    handleRoute: (req, res) => {
      books.push({ id: getId(), ...req.body });
      res.send(books);
    },
  },
  {
    path: "/book/:bookId",
    method: "put",
    handleRoute: (req, res) => {
      const { bookId } = req.params;
      const foundIndexBook =
        bookId && books.findIndex(({ id }) => id === bookId);
      if (typeof foundIndexBook === "number" && foundIndexBook >= 0) {
        const { body } = req;
        delete body.id;
        books[foundIndexBook] = { ...books[foundIndexBook], ...body };
        res.send(books[foundIndexBook]);
      } else res.status(404).send({ erro: "Book not found" });
    },
  },
  {
    path: "/book/:bookId",
    method: "delete",
    handleRoute: (req, res) => {
      const { bookId } = req.params;
      const foundIndexBook =
        bookId && books.findIndex(({ id }) => id === bookId);
      if (typeof foundIndexBook === "number" && foundIndexBook >= 0) {
        const deletedDocument = books.splice(0, 1);
        res.send(deletedDocument);
      } else res.status(404).send({ erro: "Book not found" });
    },
  },
];

module.exports = { routes };
