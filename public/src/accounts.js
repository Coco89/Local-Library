function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  //TODO: use  reduce
  for (let book of books) {
    for (let borrow of book.borrows) {
      if (borrow.id === account.id) {
        totalBorrows = totalBorrows + 1;
      }
    }
  }

  return totalBorrows;
}

function addAuthorToBook(book, authors) {
  return authors.find((author) => {
    if (author.id === book.authorId) {
      return `{
          id: ${author.id},
          ...${author}
        }`;
    }
  });
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedBooks = [];

  books.filter((book) => {
    return book.borrows.filter((borrow) => {
      if (borrow.id === account.id && borrow.returned != true) {
        let item = addAuthorToBook(book, authors);

        checkedBooks.push({ ...book, author: item });
      }
    });
  });
  return checkedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
