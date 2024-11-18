import { getSingleAuthor, getAuthorBooks, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

// for merged promises
// TODO: Get data for viewBook
const getBookDetails = async (firebaseKey) => {
  const bookObject = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);
  return { ...bookObject, authorObject };
};

// get data for viewAuthor
const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const bookObject = await getAuthorBooks(authorObject.firebaseKey);
  return { ...authorObject, bookObject };
};

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getAuthorDetails,
  getBookDetails,
  deleteAuthorBooksRelationship
};
