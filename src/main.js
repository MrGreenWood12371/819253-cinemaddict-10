import {createHeaderTemplate} from './components/header.js';
import {getMainContentTemplate} from './components/main.js';
import {createCardTemplate} from './components/card.js';
import {createFilmDetailTemplate} from './components/filmDetail.js';
import {getFiltersTemplate} from './components/filter.js';
import {getShowMoreButtonTemplate} from './components/show-more-button.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user-rank.js';
import {getElement} from './util.js';
import {getFilteredElement} from './util.js';
import {FilmCount} from './constants.js';

const cards = generateCards(FilmCount.ALL);

const topRatedCards = getFilteredElement(cards, `rating`);

const mostCommentedCards = getFilteredElement(cards, `comments`, length);

const headerElement = getElement(document, `.header`);
const footerElement = getElement(document, `.footer`);
const mainElement = getElement(document, `.main`);

const getFilmsQuantity = (key) => cards.reduce((sum, item) => sum + (item[key] ? 1 : 0), 0);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createHeaderTemplate(getUserRank()));

render(footerElement, createFilmDetailTemplate(cards[0]), `afterEnd`);

render(mainElement, getFiltersTemplate(getFilmsQuantity(`isOnWatchList`), getFilmsQuantity(`isOnHistory`), getFilmsQuantity(`isOnFavorites`)));

render(mainElement, getMainContentTemplate());

const filmListContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
let showingCardsCount = FilmCount.LIST;

const setList = (start, end) => cards.slice(start, end).forEach((card) => render(filmListContainerElement, createCardTemplate(card)));

setList(0, showingCardsCount);

render(filmListContainerElement, getShowMoreButtonTemplate(), `afterEnd`);

const [topRatedElements, mostCommentedElements] = mainElement.querySelectorAll(`.films-list--extra`);
const topRatedContentElements = topRatedElements.querySelector(`.films-list__container`);
const mostCommentedContentElements = mostCommentedElements.querySelector(`.films-list__container`);

if (topRatedCards.length) {
  topRatedCards.slice(0, FilmCount.EXTRA).forEach((card) => render(topRatedContentElements, createCardTemplate(card)));
} else {
  topRatedElements.remove();
}

if (mostCommentedCards.length) {
  mostCommentedCards.slice(0, FilmCount.EXTRA).forEach((card) => render(mostCommentedContentElements, createCardTemplate(card)));
} else {
  mostCommentedElements.remove();
}

const showMoreButtonElement = mainElement.querySelector(`.films-list__show-more`);
showMoreButtonElement.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount += FilmCount.LIST;

  setList(prevTasksCount, showingCardsCount);

  if (showingCardsCount >= cards.length) {
    showMoreButtonElement.remove();
  }
});

const setFooterElement = (element, count) => {
  footerElement.querySelector(element).textContent = count;
};

setFooterElement(`.footer__statistics p`, `${cards.length} movies inside`);

