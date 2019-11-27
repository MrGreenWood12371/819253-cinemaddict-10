import {createHeaderTemplate} from './components/header.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilmsContainerTemplate} from './components/filmsContainer.js';
import {createCardTemplate} from './components/card.js';
import {createFilmDetailTemplate} from './components/filmDetail.js';

const FILMS_COUNT = 5;

const createButtonShowMoreTemplate = () => `<button class="films-list__show-more">Show more</button>`;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createHeaderTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
const filmsList = siteMainElement.querySelector(`.films-list`);
const filmsContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsContainer, createCardTemplate(), `beforeend`);
}

const renderTopFilms = () => {
  let card = ``;

  for (let i = 0; i < 2; i++) {
    card += createCardTemplate();
  }
  return card;
};

const renderTopRatedTemplate = (title) =>
  `<section class="films-list--extra">
  <h2 class="films-list__title">${title}</h2>

  <div class="films-list__container">
    ${renderTopFilms()}
  </div>
</section>
`;

render(filmsList, createButtonShowMoreTemplate(), `beforeend`);

render(films, renderTopRatedTemplate(`Top rated`), `beforeend`);
render(films, renderTopRatedTemplate(`Most commented`), `beforeend`);


render(siteMainElement, createFilmDetailTemplate(), `beforeend`);
