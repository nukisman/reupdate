/* Created by Alexander Nuikin (nukisman@gmail.com). */

import insertAt from './insertAt';

describe('insertAt', () => {
  test('Empty values', () => {
    const state = { a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] } };
    const at = 3;
    const res = insertAt(state, 'a.b', at);
    expect(res).toBe(state);
  });

  test('diff = 0: partially changed', () => {
    const state = { a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] } };
    const nextState = {
      a: { b: [1, 2, 3, { a: 7 }, { b: 5 }, { a: 4 }, { b: 5 }] }
    };
    const at = 3;
    const res = insertAt(state, 'a.b', at, { a: 7 }, { b: 5 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < at; i++) expect(res.a.b[i]).toBe(state.a.b[i]);

    expect(res.a.b[3]).not.toBe(state.a.b[3]);
    expect(res.a.b[4]).toBe(state.a.b[4]);
  });

  test('diff > 0: partially changed', () => {
    const state = { a: { b: [1, 2, 3, { a: 4 }, { b: 5 }, { c: 6 }] } };
    const nextState = {
      a: {
        b: [1, 2, 3, { a: 7 }, { b: 5 }, { a: 4 }, { b: 5 }, { c: 6 }]
      }
    };
    const at = 3;
    const res = insertAt(state, 'a.b', at, { a: 7 }, { b: 5 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < at; i++) expect(res.a.b[i]).toBe(state.a.b[i]);

    expect(res.a.b[3]).not.toBe(state.a.b[3]);
    expect(res.a.b[4]).toBe(state.a.b[4]);
  });

  test('diff < 0: partially changed', () => {
    const state = { a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] } };
    const nextState = {
      a: {
        b: [1, 2, 3, { a: 7 }, { b: 5 }, { c: 7 }, { a: 4 }, { b: 5 }]
      }
    };
    const at = 3;
    const res = insertAt(state, 'a.b', at, { a: 7 }, { b: 5 }, { c: 7 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < at; i++) expect(res.a.b[i]).toBe(state.a.b[i]);

    expect(res.a.b[3]).not.toBe(state.a.b[3]);
    expect(res.a.b[4]).toBe(state.a.b[4]);
  });
});
