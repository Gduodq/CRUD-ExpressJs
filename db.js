const { v4: uuidv4 } = require("uuid");

const getId = () => uuidv4();

const books = [
  { id: getId(), titulo: "Harry Potter" },
  { id: getId(), titulo: "Percy Jackson" },
  { id: getId(), titulo: "Game of Thrones" },
  { id: getId(), titulo: "Lord of the Rings" },
];

module.exports = { books, getId };
