import AbstractComponent from './abstract-component.js';

const getMainContentTemplate = (cardQuantity) => {

  let allFilmsContent = null;

  if (!cardQuantity) {
    allFilmsContent = `<h2 class="films-list__title">There are no movies in our database</h2>`;
  } else {
    allFilmsContent = `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">

      </div>`;
  }

  return (
    `<section class="films">
    <section class="films-list">
      ${allFilmsContent}
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">

      </div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">

      </div>
    </section>
  </section>`
  );
};

export default class MainContent extends AbstractComponent {
  constructor(cardQuantity = 0) {
    super();
    this._cardQuantity = cardQuantity;
  }

  getTemplate() {
    return getMainContentTemplate(this._cardQuantity);
  }
}
