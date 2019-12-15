import CardComponent from '../components/card.js';
import DetailComponent from '../components/filmDetail.js';
import FilterComponent from '../components/filter.js';
import SortComponent from '../components/sort.js';
import MainContentComponent from '../components/main.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, getElement, getFilteredElement} from '../util.js';
import {SortType, RenderPosition, FilmCount} from '../constants.js';
import {getFilmsQuantity} from '../main.js';

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    const mainElement = getElement(document, `.main`);
    const footerElement = getElement(document, `.footer`);
    const filterComponent = new FilterComponent(getFilmsQuantity(`isOnWatchList`), getFilmsQuantity(`isOnHistory`), getFilmsQuantity(`isOnFavorites`));

    render(this._container, filterComponent.getElement());

    render(this._container, new MainContentComponent(cards.length).getElement());

    const setList = (currentCards, targetElement) => currentCards.forEach((card) => {
      const cardElement = new CardComponent(card).getElement();

      render(targetElement, cardElement);

      const cardClickElements = cardElement.querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

      const onCardClick = () => {
        const detailComponent = new DetailComponent(card);
        const detailElement = detailComponent.getElement();

        const removeDetail = () => {
          document.body.removeChild(detailElement);
        };

        const onCloseClick = () => {
          removeDetail();
          closeDetailElement.removeEventListener(`click`, onCloseClick);
        };

        const onEscKeyDown = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

          if (isEscKey) {
            removeDetail();
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        render(footerElement, detailElement, RenderPosition.AFTEREND);

        const closeDetailElement = detailElement.querySelector(`.film-details__close-btn`);

        closeDetailElement.addEventListener(`click`, onCloseClick);

        document.addEventListener(`keydown`, onEscKeyDown);
      };

      for (let i = 0; i < cardClickElements.length; i++) {
        cardClickElements[i].addEventListener(`click`, onCardClick);
        cardClickElements[i].setAttribute(`style`, `cursor: pointer;`);
      }
    });

    const filmListContainerElement = mainElement.querySelector(`.films-list .films-list__container`);
    let showingCardsCount = FilmCount.LIST;
    setList(cards.slice(0, showingCardsCount), filmListContainerElement);

    let updatedCards = cards;
    const sortComponent = new SortComponent();
    render(filterComponent.getElement(), sortComponent.getElement(), RenderPosition.AFTEREND);
    sortComponent.setSortTypeChangeHandler((sortType) => {

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
