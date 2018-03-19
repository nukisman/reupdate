/* Created by Alexander Nuikin (nukisman@gmail.com). */

import pop from './pop';

describe('Pop', () => {
  test('n = 0', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const res = pop(state, 0);
    expect(res).toBe(state);
  });

  test('n = 1 by default', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const nextState = [1, 2, 3, { a: 4 }];
    const res = pop(state);
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < state.length - 1; i++) expect(res[i]).toBe(state[i]);
  });

  test('n > 1', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const nextState = [1, 2, 3];
    const n = 2;
    const res = pop(state, n);
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < state.length - n; i++) expect(res[i]).toBe(state[i]);
  });
});
