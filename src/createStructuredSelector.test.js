/* Created by Alexander Nuikin (nukisman@gmail.com). */

import {
  createStructuredSelector as createReselectStructuredSelector,
  createSelector as createReselectSelector
} from 'reselect';
import createReupdateStructuredSelector from './createStructuredSelector';
import createReupdateSelector from './createSelector';

const createTest = (label, createStructuredSelector, createSelector) => () => {
  let recalculations = 0;

  const mySelectorA = state => state.a;
  const mySelectorB = state => state.b;
  const mySelectorC = createSelector(state => state, state => state.c);

  const structuredSelector = createStructuredSelector(
    {
      x: mySelectorA,
      y: mySelectorB,
      z: mySelectorC
    },
    (selectors, resultFunc) =>
      createSelector(selectors, (...args) => {
        // console.log(label, ...args);
        recalculations++;
        return resultFunc(...args);
      })
  );

  let result;
  result = structuredSelector({ a: 1, b: 2, c: { x: 3 } });
  expect(result.x).toBe(1);
  expect(result.y).toBe(2);
  expect(result.z).toEqual({ x: 3 });
  expect(recalculations).toBe(1);

  result = structuredSelector({ a: 1, b: 2, c: { x: 3 } }); // equal arg
  expect(result.x).toBe(1);
  expect(result.y).toBe(2);
  expect(result.z).toEqual({ x: 3 });
  if (label === 'reselect') {
    /** Extra recalculations */
    expect(recalculations).toBe(2);
  }
  if (label === 'reupdate') {
    /** No extra recalculations */
    expect(recalculations).toBe(1);
  }
};

describe('createStructuredSelector', () => {
  test(
    'reselect: extra recalculations',
    createTest(
      'reselect',
      createReselectStructuredSelector,
      createReselectSelector
    )
  );
  test(
    'reupdate: no extra recalculations',
    createTest(
      'reupdate',
      createReupdateStructuredSelector,
      createReupdateSelector
    )
  );
});
