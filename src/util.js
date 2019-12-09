import {RenderPosition} from './constants.js';

export const getRandomInt = (min, max) => min + Math.round(max * Math.random());
export const getElement = (dom, identity) => dom.querySelector(identity);

export const getFilteredElements = (obj, elem, isFlag) => {
  const flagCheck = isFlag ? () => obj.slice()
  .sort((prev, next) => next[elem].length - prev[elem].length)
  .slice(0, 2)
  .filter((card) => card[elem]) : () => obj.slice().sort((prev, next) => next[elem] - prev[elem]).slice(0, 2).filter((card) => card[elem]);
  return flagCheck();
};

export const getFilteredElement = (obj, elem, isFlag) => {
  const sortElements = isFlag ? (prev, next) => next[elem].length - prev[elem].length : (prev, next) => next[elem] - prev[elem];
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
