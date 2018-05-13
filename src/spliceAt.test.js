/* Created by Alexander Nuikin (nukisman@gmail.com). */

import spliceAt from './spliceAt';

describe('spliceAt', () => {
  test('Delete 0 and insert empty', () => {
    const state = { a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] } };
    const atIndex = 3;
    const res = spliceAt(state, 'a.b', atIndex, 0);
    expect(res).toBe(state);
  });

  test('Delete and insert the same', () => {
    const state = { a: { b: [1, 2, 3, { a: 4 }, { b: 5 }, { c: 6 }] } };
    const atIndex = 3;
    const res = spliceAt(state, 'a.b', atIndex, 2, { a: 4 }, { b: 5 });
    expect(res).toBe(state);
  });

  test('Delete and insert partially changed', () => {
    const state = { a: { b: [1, 2, 3, { a: 4 }, { b: 5 }, { c: 6 }] } };
    const nextState = { a: { b: [1, 2, 3, { a: 4 }, { b: 500 }, { c: 6 }] } };
    const atIndex = 3;
    const res = spliceAt(state, 'a.b', atIndex, 2, { a: 4 }, { b: 500 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < atIndex; i++) expect(res.a.b[i]).toBe(state.a.b[i]);

    expect(res.a.b[3]).toBe(state.a.b[3]);
    expect(res.a.b[4]).not.toBe(state.a.b[4]);
  });
});
