function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let checkedBooks = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );

  let returnedBooks = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  );

  return [[...checkedBooks], [...returnedBooks]];
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrows = book.borrows;

  borrows.forEach((borrow) => {
    let item = accounts.find((account) => account.id === borrow.id);

    result.push({ ...item, returned: borrow.returned });
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
