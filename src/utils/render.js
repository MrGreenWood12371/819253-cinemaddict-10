import {RenderPosition} from '../constants.js';

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
