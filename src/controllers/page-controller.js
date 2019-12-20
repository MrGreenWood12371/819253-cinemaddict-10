import FilterComponent from '../components/filter.js';
import SortComponent from '../components/sort.js';
import MainContentComponent from '../components/main.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {getElement, getFilteredElement} from '../util.js';
import {render} from '../utils/render.js';
import {SortType, RenderPosition, FilmCount} from '../constants.js';
import {getFilmsQuantity} from '../main.js';
import {setList} from '../utils/setList.js';
export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    const mainElement = getElement(document, `.main`);
    const filterComponent = new FilterComponent(getFilmsQuantity(`isOnWatchList`), getFilmsQuantity(`isOnHistory`), getFilmsQuantity(`isOnFavorites`));

    render(this._container, filterComponent.getElement());

    render(this._container, new MainContentComponent(cards.length).getElement());

    const filmListContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
    let showingCardsCount = FilmCount.LIST;
    setList(cards.slice(0, showingCardsCount), filmListContainerElement);

    let updatedCards = cards;

    const sortElements = (sortType) => {
      switch (sortType) {
        case SortType.DATE:
          updatedCards = cards
            .slice()
            .sort((prev, next) => next.releaseDate - prev.releaseDate);
          break;
        case SortType.RATING:
          updatedCards = cards
            .slice()
            .sort((prev, next) => next.rating - prev.rating);
          break;
        case SortType.DEFAULT:
          updatedCards = cards;
          break;
      }
    };

    const sortComponent = new SortComponent();
    render(filterComponent.getElement(), sortComponent.getElement(), RenderPosition.AFTEREND);
    sortComponent.setSortTypeChangeHandler((sortType) => {

      sortElements(sortType);

      filmListContainerElement.innerHTML = ``;
      setList(updatedCards.slice(0, showingCardsCount), filmListContainerElement);
    });

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(filmListContainerElement, showMoreButtonComponent.getElement(), RenderPosition.AFTEREND);
    showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingCardsCount;
      showingCardsCount += FilmCount.LIST;

      setList(updatedCards.slice(prevTasksCount, showingCardsCount), filmListContainerElement);

      if (showingCardsCount >= cards.length) {
        showMoreButtonComponent.getElement().remove();
      }
    });

    const [topRatedElements, mostCommentedElements] = this._container.querySelectorAll(`.films-list--extra`);
    const topRatedContentElements = topRatedElements.querySelector(`.films-list__container`);
    const mostCommentedContentElements = mostCommentedElements.querySelector(`.films-list__container`);

    const topRatedCards = getFilteredElement(cards, `rating`);

    if (topRatedCards.length) {
      setList(topRatedCards.slice(0, FilmCount.EXTRA), topRatedContentElements);
    } else {
      topRatedElements.remove();
    }

    const mostCommentedCards = getFilteredElement(cards, `comments`, length);

    if (mostCommentedCards.length) {
      setList(mostCommentedCards.slice(0, FilmCount.EXTRA), mostCommentedContentElements);
    } else {
      mostCommentedElements.remove();
    }

  }
}
