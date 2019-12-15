import {RenderPosition} from './constants.js';

export const getRandomInt = (min, max) => min + Math.round(max * Math.random());
export const getElement = (dom, identity) => dom.querySelector(identity);

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
