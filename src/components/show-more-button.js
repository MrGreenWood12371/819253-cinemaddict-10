import AbstractComponent from './abstract-component.js';

export const getShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
