export const getRandomInt = (min, max) => min + Math.round(max * Math.random());
export const getElement = (dom, identity) => dom.querySelector(identity);
export const getFilteredElement = (obj, elem, isFlag) => {
  const sortElements = isFlag ? (prev, next) => next[elem].length - prev[elem].length : (prev, next) => next[elem] - prev[elem];
  return obj
  .slice()
  .sort(sortElements)
  .slice(0, 2)
  .filter((card) => card[elem]);
};
