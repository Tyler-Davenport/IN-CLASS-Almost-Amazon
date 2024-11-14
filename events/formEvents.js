/* eslint-disable quotes */
import { createAuthor, getAuthors, updateAuthor } from "../api/authorData";
import { createBook, updateBook, getBooks } from "../api/bookData";
import { showAuthors } from "../pages/authors";
import { showBooks } from "../pages/books";

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    // Submit Book
    if (e.target.id.includes('submit-book')) {
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
      };

      createBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBook(patchPayload).then(() => {
          getBooks().then(showBooks);
        });
      });
    }

    // Update Book
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        firebaseKey,
      };

      updateBook(payload).then(() => {
        getBooks().then(showBooks);
      });
    }

    // Submit Author
    if (e.target.id.includes('submit-author')) {
      const payload = {
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
      };

      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateAuthor(patchPayload).then(() => {
          getAuthors().then(showAuthors);
        });
      });
    }

    // Update Author
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        firebaseKey,
      };

      updateAuthor(payload).then(() => {
        getAuthors().then(showAuthors);
      });
    }
  });
};

export default formEvents;
