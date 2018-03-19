/* Created by Alexander Nuikin (nukisman@gmail.com). */

import splice from './splice';

describe('Splice', () => {
  test('Delete 0 and insert empty', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const atIndex = 3;
    const res = splice(state, atIndex, 0);
    expect(res).toBe(state);
  });

  test('Delete and insert the same', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }, { c: 6 }];
    const atIndex = 3;
    const res = splice(state, atIndex, 2, { a: 4 }, { b: 5 });
    expect(res).toBe(state);
  });

  test('Delete and insert partially changed', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }, { c: 6 }];
    const nextState = [1, 2, 3, { a: 4 }, { b: 500 }, { c: 6 }];
    const atIndex = 3;
    const res = splice(state, atIndex, 2, { a: 4 }, { b: 500 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < atIndex; i++) expect(res[i]).toBe(state[i]);

    expect(res[3]).toBe(state[3]);
    expect(res[4]).not.toBe(state[4]);
  });
});
