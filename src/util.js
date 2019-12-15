import {RenderPosition} from './constants.js';

export const getRandomInt = (min, max) => min + Math.round(max * Math.random());
export const getElement = (dom, identity) => dom.querySelector(identity);

const footerElement = getElement(document, `.footer`);

export const setElementTextContent = (container, element, count) => {
  container.querySelector(element).textContent = `${count} movies inside`;
};

export const getFilteredElement = (obj, elem, isFlag) => {
  let sortElements = null;

  if (isFlag) {
    sortElements = (prev, next) => next[elem].length - prev[elem].length;
  } else {
    sortElements = (prev, next) => next[elem] - prev[elem];
  }
  
  return obj
  .slice()
  .sort(sortElements)
  .slice(0, 2)
  .filter((card) => card[elem]);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (container && element) {
    switch (place) {
      case RenderPosition.AFTERBEGIN:
        container.prepend(element);
        break;
      case RenderPosition.BEFOREEND:
        container.append(element);
        break;
      case RenderPosition.AFTEREND:
        container.after(element);
        break;
    }
  }
};

export const setList = (currentCards, targetElement, Card, Detail) => currentCards.forEach((card) => {
  const cardElement = new Card(card).getElement();

  render(targetElement, cardElement);

  const cardClickElements = cardElement.querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

  const onCardClick = () => {
    const detailComponent = new Detail(card);
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
