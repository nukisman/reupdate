/* Created by Alexander Nuikin (nukisman@gmail.com). */

import shift from './shift';

describe('shift', () => {
  test('n = 0', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const res = shift(state, 0);
    expect(res).toBe(state);
  });

  test('n = 1 by default', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const nextState = [2, 3, { a: 4 }, { b: 5 }];
    const res = shift(state);
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
  });

  test('Partially changed head', () => {
    const state = [1, 1, 1, 1, { a: 2 }, { a: 2 }, { a: 2 }, { a: 2 }];
    const nextState = [1, 1, { a: 2 }, { a: 2 }, { a: 2 }, { a: 2 }];
    const res = shift(state, 2);
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);

    expect(res[0]).toBe(state[0]);
    expect(res[1]).toBe(state[1]);
    expect(res[2]).not.toBe(state[2]);
    expect(res[3]).not.toBe(state[3]);
    expect(res[4]).toBe(state[4]);
    expect(res[5]).toBe(state[5]);
  });
});
