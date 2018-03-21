/* Created by Alexander Nuikin (nukisman@gmail.com). */

import { createSelector as createReselectSelector } from 'reselect';
import set from './set';

const createSelector = (...selectors) => {
  const resultFunc = selectors.pop();
  let prev;
  return createReselectSelector(...selectors, (...args) => {
    const value = resultFunc(...args);
    prev = set(prev, value);
    return prev;
  });
};

export default createSelector;
