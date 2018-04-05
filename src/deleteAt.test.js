/* Created by Alexander Nuikin (nukisman@gmail.com). */

import deleteAt from './deleteAt';

describe('deleteAt', () => {
  test('Delete at implicit undefined', () => {
    const state = {
      a: true,
      b: { x: 123 }
    };
    const res = deleteAt(state, 'wrong');
    expect(res).toBe(state);
  });

  test('Delete at explicit undefined', () => {
    const state = {
      a: true,
      b: { x: 123 },
      c: undefined
    };
    const res = deleteAt(state, 'c');
    expect(res).toBe(state);
  });

  test('Delete at wrong path', () => {
    const state = {
      a: true,
      b: {},
      c: undefined,
      d: [],
      e: null,
      f: {
        g: {
          h: 123
        }
      }
    };
    let res;

    res = deleteAt(state, 'a[0].foo');
    expect(res).toBe(state);

    res = deleteAt(state, 'b[0].foo');
    expect(res).toBe(state);

    res = deleteAt(state, 'c[0].foo');
    expect(res).toBe(state);

    res = deleteAt(state, 'd.foo.bar');
    expect(res).toBe(state);

    res = deleteAt(state, 'e.foo.bar');
    expect(res).toBe(state);

    res = deleteAt(state, 'f.g.h.i');
    expect(res).toBe(state);

    res = deleteAt(state, 'f.g.h.i.j');
    expect(res).toBe(state);

    res = deleteAt(state, 'f.g.h.i.j.k');
    expect(res).toBe(state);
  });

  test('Delete at wip', () => {
    const state = {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const nextState = {
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const res = deleteAt(state, 'wip');
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    expect(res.result).toBe(state.result);
    expect(res.result.total).toBe(state.result.total);
    expect(res.result.ids).toBe(state.result.ids);
    expect(res.result.ids).toEqual(state.result.ids);
    expect(res).toEqual(nextState);
  });

  test('Delete at result.ids', () => {
    const state = {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const nextState = {
      wip: true,
      result: {
        total: 3
      }
    };
    const res = deleteAt(state, 'result.ids');
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    expect(res.result).not.toBe(state.result);
    expect(res.result.total).toBe(state.result.total);
  });
});
