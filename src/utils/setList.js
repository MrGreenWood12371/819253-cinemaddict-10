import CardComponent from '../components/card.js';
import DetailComponent from '../components/filmDetail.js';
import {render} from './render.js';
import {RenderPosition} from '../constants.js';
import {getElement} from '../util.js';

const footerElement = getElement(document, `.footer`);

export const setList = (currentCards, targetElement) => currentCards.forEach((card) => {
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
