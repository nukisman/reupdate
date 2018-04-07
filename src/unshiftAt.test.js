/* Created by Alexander Nuikin (nukisman@gmail.com). */

import unshiftAt from './unshiftAt';

describe('unshiftAt', () => {
  test('Empty head', () => {
    const state = {
      a: { b: [1, 2, 3, { a: 4 }, { b: 5 }] }
    };
    const res = unshiftAt(state, 'a.b');
    expect(res).toBe(state);
  });

  test('diff = 0: Partially changed', () => {
    const state = {
      a: { b: [1, 1, { a: 2 }, { a: 2 }] }
    };
    const nextState = {
      a: { b: [1, 1, { x: 3 }, { a: 2 }, 1, 1, { a: 2 }, { a: 2 }] }
    };
    const res = unshiftAt(state, 'a.b', 1, 1, { x: 3 }, { a: 2 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);

    expect(res.a.b[0]).toBe(state.a.b[0]);
    expect(res.a.b[1]).toBe(state.a.b[1]);
    expect(res.a.b[2]).not.toBe(state.a.b[2]);
    expect(res.a.b[3]).toBe(state.a.b[3]);
  });

  test('diff > 0: Partially changed', () => {
    const state = {
      a: { b: [1, 1, { a: 2 }, { a: 2 }, { a: 2 }, { a: 2 }] }
    };
    const nextState = {
      a: { b: [1, 1, 1, 1, { a: 2 }, { a: 2 }, { a: 2 }, { a: 2 }] }
    };
    const res = unshiftAt(state, 'a.b', 1, 1);
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);

    expect(res.a.b[0]).toBe(state.a.b[0]);
    expect(res.a.b[1]).toBe(state.a.b[1]);
    expect(res.a.b[2]).not.toBe(state.a.b[2]);
    expect(res.a.b[3]).not.toBe(state.a.b[3]);
    expect(res.a.b[4]).toBe(state.a.b[4]);
    expect(res.a.b[5]).toBe(state.a.b[5]);
  });

  test('diff < 0: Partially changed', () => {
    const state = {
      a: { b: [1, 1, { a: 2 }, { a: 2 }] }
    };
    const nextState = {
      a: {
        b: [1, 1, { a: 2 }, { x: 3 }, { a: 2 }, 1, 1, { a: 2 }, { a: 2 }]
      }
    };
    const res = unshiftAt(state, 'a.b', 1, 1, { a: 2 }, { x: 3 }, { a: 2 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);

    expect(res.a.b[0]).toBe(state.a.b[0]);
    expect(res.a.b[1]).toBe(state.a.b[1]);
    expect(res.a.b[2]).toBe(state.a.b[2]);
    expect(res.a.b[3]).not.toBe(state.a.b[3]);
  });
});
