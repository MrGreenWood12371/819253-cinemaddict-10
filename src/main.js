import CardComponent from './components/card.js';
import DetailComponent from './components/filmDetail.js';
import FilterComponent from './components/filter.js';
import SortComponent from './components/sort.js';
import MainContentComponent from './components/main.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import UserRankComponent from './components/user-rank.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user-rank.js';
import {FilmCount, RenderPosition} from './constants.js';
import {getElement, getFilteredElement, render, setElementTextContent, setList} from './util.js';


export const cards = generateCards(FilmCount.ALL);

const topRatedCards = getFilteredElement(cards, `rating`);

const mostCommentedCards = getFilteredElement(cards, `comments`, length);

const headerElement = getElement(document, `.header`);
const footerElement = getElement(document, `.footer`);
const mainElement = getElement(document, `.main`);

const getFilmsQuantity = (key) => cards.reduce((sum, item) => sum + (item[key] ? 1 : 0), 0);

render(headerElement, new UserRankComponent(getUserRank()).getElement());

render(mainElement, new FilterComponent(getFilmsQuantity(`isOnWatchList`), getFilmsQuantity(`isOnHistory`), getFilmsQuantity(`isOnFavorites`)).getElement());

render(mainElement, new SortComponent().getElement());

render(mainElement, new MainContentComponent(cards.length).getElement());

const filmListContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
let showingCardsCount = FilmCount.LIST;

setList(cards.slice(0, showingCardsCount), filmListContainerElement, CardComponent, DetailComponent);

render(filmListContainerElement, new ShowMoreButtonComponent().getElement(), RenderPosition.AFTEREND);

const [topRatedElements, mostCommentedElements] = mainElement.querySelectorAll(`.films-list--extra`);
const topRatedContentElements = topRatedElements.querySelector(`.films-list__container`);
const mostCommentedContentElements = mostCommentedElements.querySelector(`.films-list__container`);

if (topRatedCards.length) {
  setList(topRatedCards.slice(0, FilmCount.EXTRA), topRatedContentElements, CardComponent, DetailComponent);
} else {
  topRatedElements.remove();
}

if (mostCommentedCards.length) {
  setList(mostCommentedCards.slice(0, FilmCount.EXTRA), mostCommentedContentElements, CardComponent, DetailComponent);
} else {
  mostCommentedElements.remove();
}

const showMoreButtonElement = mainElement.querySelector(`.films-list__show-more`);

if (showMoreButtonElement) {
  showMoreButtonElement.addEventListener(`click`, () => {
    const prevTasksCount = showingCardsCount;
    showingCardsCount += FilmCount.LIST;

    setList(cards.slice(prevTasksCount, showingCardsCount), filmListContainerElement);
    
    if (showingCardsCount >= cards.length) {
      showMoreButtonElement.remove();
    }
  });
}

setElementTextContent(footerElement, `.footer__statistics p`, cards.length);
