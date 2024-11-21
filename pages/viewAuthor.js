import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  const domString = `
  <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${obj.email}</h6>
        <p>${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i> Favorite</span>' : ''}</p>
        </div>`;

  const bookString = obj.bookObject.map((Bobj) => `<div class="card">
        <img class="card-img-top" src=${Bobj.image} alt=${Bobj.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${Bobj.title}</h5>
            <p class="card-text bold">${Bobj.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${Bobj.price}` : `$${Bobj.price}`}</p>
            <hr>
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${Bobj.firebaseKey}"></i>
            <i id="edit-book-btn--${Bobj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book-btn--${Bobj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>`);
  const detailString = (bookString + domString);
  renderToDOM('#view', detailString);
};

export default viewAuthor;
