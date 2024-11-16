import { getSingleAuthor, getAuthorBooks } from './authorData';
import { getSingleBook } from './bookData';

// for merged promises
// TODO: Get data for viewBook
const getBookDetails = async (firebaseKey) => {
  const bookObject = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);
  return { ...bookObject, authorObject };
};

// const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   // GET SINGLE BOOK
//   getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
//     getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
//       .then((authorObject) => resolve({ ...bookObject, authorObject }));
//   }).catch(reject);
//   // GET AUTHOR
//   // Create an object that has book data and an object named authorObject
// });

// get data for viewAuthor
const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const bookObject = await getAuthorBooks(authorObject.firebaseKey);
  return { ...authorObject, bookObject };
};

export {
  getAuthorDetails,
  getBookDetails
};
