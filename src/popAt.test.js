/* Created by Alexander Nuikin (nukisman@gmail.com). */

import popAt from './popAt';

describe('popAt', () => {
  test('n = 0', () => {
    const state = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] }
    };
    const res = popAt(state, 'a.b', 0);
    expect(res).toBe(state);
  });

  test('n = 1 by default', () => {
    const state = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] }
    };
    const nextState = {
      a: { b: [1, 2, 3, { a: 4 }] }
    };
    const res = popAt(state, 'a.b');
    expect(res).toEqual(nextState);
  });

  test('n = 1', () => {
    const state = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] }
    };
    const nextState = {
      a: { b: [1, 2, 3, { a: 4 }] }
    };
    const res = popAt(state, 'a.b', 1);
    expect(res).toEqual(nextState);
  });

  test('n > 1', () => {
    const state = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }, { a: 6 }, { b: 7 }] }
    };
    const nextState = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] }
    };
    const res = popAt(state, 'a.b', 2);
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < nextState.length; i++)
      expect(res.a.b[i]).toBe(state.a.b[i]);
  });
});
