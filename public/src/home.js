function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksOut = [];
  books.map((book) => {
    borrows = book.borrows;

    borrows.find((borrow) => {
      if (borrow.returned === false) {
        booksOut.push(book);
      }
    });
  });

  return booksOut.length;
}

function getMostCommonGenres(books) {
  bookGenres = books.reduce((acc, book) => {
    if (acc[book.genre]) {
      acc[book.genre].push(book);
    } else {
      acc[book.genre] = [book];
    }
    return acc;
  });

  let res = [];

  for (let genre in bookGenres) {
    const name = genre;
    const count = bookGenres[genre].length;
    if (name.charAt(0) == name.charAt(0).toUpperCase()) {
      res.push({ name: name, count: count });
    }
  }

  return res.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.reduce((acc, book) => {
    let borrows = book.borrows;
    popularBooks.push({ name: book.title, count: borrows.length });
  }, {});
  popularBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let popBooks = getMostPopularBooks(books);
  let authorBooks = [];

  for (let book in popBooks) {
    let currentBook = books.find(
      (oneBook) => oneBook.title === popBooks[book].name
    );
    let author = authors.find((author) => author.id === currentBook.authorId);
    const name = author.name.first + " " + author.name.last;

    authorBooks.push({ name: name, count: currentBook.borrows.length });
  }

  return authorBooks.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
