export const getRandomInt = (min, max) => min + Math.round(max * Math.random());
export const getElement = (dom, identity) => dom.querySelector(identity);
export const getFilteredElement = (obj, elem, third) => {
  if (third) {
    return obj
  .slice()
  .sort((prev, next) => next[elem].third - prev[elem].third)
  .slice(0, 2)
  .filter((card) => card[elem]);
  }
  return obj
  .slice()
  .sort((prev, next) => next[elem] - prev[elem])
  .slice(0, 2)
  .filter((card) => card[elem]);
};
