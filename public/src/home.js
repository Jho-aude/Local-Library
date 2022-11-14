function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksCheckedOut = books.filter(
    (book) =>
      book.borrows.filter((record) => record.returned === false).length > 0
  );
  return booksCheckedOut.length;
}

function getMostCommonGenres(books) {
  let map = {};
  books.forEach((num) => {
    if (map[num.genre]) {
      map[num.genre]++;
    } else {
      map[num.genre] = 1;
    }
  });
  return Object.entries(map)
    .map(([name, count]) => {
      return {
        name,
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorList = [];
  const countList = [];
  const authorIdList = [];

  authors.forEach(author => {
    
    if (!authorIdList.includes(author.id)) {
    authorIdList.push(author.id);
    
    authorList.push(`${author.name.first} ${author.name.last}`);
  
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBooksBorrows = authorBooks.map(book => book.borrows.length);
 
    countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  
  return makeSortedTopFiveNameCountArray(authorList, countList);
}


function makeNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}


function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}


function topFive (list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}


function makeSortedTopFiveNameCountArray (nameList, countList)
{
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
