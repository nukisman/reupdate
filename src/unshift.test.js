/* Created by Alexander Nuikin (nukisman@gmail.com). */

import unshift from './unshift';

describe('Unshift', () => {
  test('Empty head', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const res = unshift(state);
    expect(res).toBe(state);
  });

  test('diff = 0: Partially changed', () => {
    const state = [1, 1, { a: 2 }, { a: 2 }];
    const nextState = [1, 1, { x: 3 }, { a: 2 }, 1, 1, { a: 2 }, { a: 2 }];
    const res = unshift(state, 1, 1, { x: 3 }, { a: 2 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);

    expect(res[0]).toBe(state[0]);
    expect(res[1]).toBe(state[1]);
    expect(res[2]).not.toBe(state[2]);
    expect(res[3]).toBe(state[3]);
  });

  test('diff > 0: Partially changed', () => {
    const state = [1, 1, { a: 2 }, { a: 2 }, { a: 2 }, { a: 2 }];
    const nextState = [1, 1, 1, 1, { a: 2 }, { a: 2 }, { a: 2 }, { a: 2 }];
    const res = unshift(state, 1, 1);
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);

    expect(res[0]).toBe(state[0]);
    expect(res[1]).toBe(state[1]);
    expect(res[2]).not.toBe(state[2]);
    expect(res[3]).not.toBe(state[3]);
    expect(res[4]).toBe(state[4]);
    expect(res[5]).toBe(state[5]);
  });

  test('diff < 0: Partially changed', () => {
    const state = [1, 1, { a: 2 }, { a: 2 }];
    const nextState = [
      1,
      1,
      { a: 2 },
      { x: 3 },
      { a: 2 },
      1,
      1,
      { a: 2 },
      { a: 2 }
    ];
    const res = unshift(state, 1, 1, { a: 2 }, { x: 3 }, { a: 2 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);

    expect(res[0]).toBe(state[0]);
    expect(res[1]).toBe(state[1]);
    expect(res[2]).toBe(state[2]);
    expect(res[3]).not.toBe(state[3]);
  });
});
