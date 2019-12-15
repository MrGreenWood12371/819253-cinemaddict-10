import UserRankComponent from './components/user-rank.js';
import {generateCards} from './mock/card.js';
import {getUserRank} from './mock/user-rank.js';
import PageController from './controllers/page-controller.js';
import {FilmCount} from './constants.js';
import {getElement, render, setElementTextContent} from './util.js';


export const cards = generateCards(FilmCount.ALL);

const headerElement = getElement(document, `.header`);
const footerElement = getElement(document, `.footer`);
const mainElement = getElement(document, `.main`);
const userRankComponent = new UserRankComponent(getUserRank()).getElement();
render(headerElement, userRankComponent);

export const getFilmsQuantity = (key) => cards.reduce((sum, item) => sum + (item[key] ? 1 : 0), 0);

setElementTextContent(footerElement, `.footer__statistics p`, cards.length);

const pageController = new PageController(mainElement);
pageController.render(cards);
