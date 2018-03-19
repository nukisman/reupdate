/* Created by Alexander Nuikin (nukisman@gmail.com). */

import insert from './insert';

describe('Insert', () => {
  test('Empty tail', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const at = 3;
    const res = insert(state, at);
    expect(res).toBe(state);
  });

  test('diff = 0: partially changed', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const nextState = [1, 2, 3, { a: 7 }, { b: 5 }, { a: 4 }, { b: 5 }];
    const at = 3;
    const res = insert(state, at, { a: 7 }, { b: 5 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < at; i++) expect(res[i]).toBe(state[i]);

    expect(res[3]).not.toBe(state[3]);
    expect(res[4]).toBe(state[4]);
  });

  test('diff > 0: partially changed', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }, { c: 6 }];
    const nextState = [
      1,
      2,
      3,
      { a: 7 },
      { b: 5 },
      { a: 4 },
      { b: 5 },
      { c: 6 }
    ];
    const at = 3;
    const res = insert(state, at, { a: 7 }, { b: 5 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < at; i++) expect(res[i]).toBe(state[i]);

    expect(res[3]).not.toBe(state[3]);
    expect(res[4]).toBe(state[4]);
  });

  test('diff < 0: partially changed', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const nextState = [
      1,
      2,
      3,
      { a: 7 },
      { b: 5 },
      { c: 7 },
      { a: 4 },
      { b: 5 }
    ];
    const at = 3;
    const res = insert(state, at, { a: 7 }, { b: 5 }, { c: 7 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < at; i++) expect(res[i]).toBe(state[i]);

    expect(res[3]).not.toBe(state[3]);
    expect(res[4]).toBe(state[4]);
  });
});
