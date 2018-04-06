/* Created by Alexander Nuikin (nukisman@gmail.com). */

import pushAt from './pushAt';

describe('pushAt', () => {
  test('Empty tail', () => {
    const state = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] }
    };
    const res = pushAt(state, 'a.b');
    expect(res).toBe(state);
  });

  test('Not empty tail', () => {
    const state = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] }
    };
    const nextState = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }, { a: 6 }, { b: 7 }] }
    };
    const res = pushAt(state, 'a.b', { a: 6 }, { b: 7 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < state.length; i++)
      expect(res.a.b[i]).toBe(state.a.b[i]);
  });
});
