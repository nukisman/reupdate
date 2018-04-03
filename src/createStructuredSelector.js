/* Created by Alexander Nuikin (nukisman@gmail.com). */

import { createStructuredSelector as createReselectStructuredSelector } from 'reselect';
import createReupdateSelector from './createSelector';

const createStructuredSelector = (
  selectors,
  selectorCreator = createReupdateSelector
) => createReselectStructuredSelector(selectors, selectorCreator);

export default createStructuredSelector;
