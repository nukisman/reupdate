/* Created by Alexander Nuikin (nukisman@gmail.com). */

import extendAt from './extendAT';

describe('Extend object', () => {
  test('Extend with empty at root', () => {
    const state = {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const res = extendAt(state, '', {});
    expect(res).toEqual(state);

    expect(res).toBe(state);
  });
  test('Extend with empty at path', () => {
    const state = {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const res = extendAt(state, 'result', {});
    expect(res).toEqual(state);

    expect(res).toBe(state);
  });

  test('Changed part at root', () => {
    const state = {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const ext = {
      wip: true
    };
    const res = extendAt(state, '', ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).not.toBe(state);
    expect(res.wip).not.toBe(state.wip);
    expect(res.result).toBe(state.result);
    expect(res.result.total).toBe(state.result.total);
    expect(res.result.ids).toBe(state.result.ids);
  });

  test('Changed part at path', () => {
    const state = {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const ext = {
      total: 4
    };
    const res = extendAt(state, 'result', ext);
    expect(res).toEqual({
      ...state,
      ...{ result: { ...state.result, ...ext } }
    });

    expect(res).not.toBe(state);
    expect(res.wip).toBe(state.wip);
    expect(res.result).not.toBe(state.result);
    expect(res.result.total).not.toBe(state.result.total);
    expect(res.result.ids).toBe(state.result.ids);
  });

  test('Changed at root', () => {
    const state = {
      wip: true,
      result: {
        total: 300,
        ids: ['a', 'b', 'c']
      }
    };
    const ext = {
      wip: false,
      result: {
        total: 300,
        ids: ['a', 'b', 'c']
      }
    };
    // console.log('Extend: Changed');
    const res = extendAt(state, '', ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).not.toBe(state);
    expect(res.wip).not.toBe(state.wip);
    expect(res.result).toBe(state.result);
    expect(res.result === state.result).toEqual(true);
    expect(res.result.total).toBe(state.result.total);
    expect(res.result.ids).toBe(state.result.ids);
    expect(res.result.ids === state.result.ids).toEqual(true);
  });

  test('Changed at path', () => {
    const state = {
      wip: true,
      result: {
        total: 300,
        ids: ['a', 'b', 'c']
      }
    };
    const ext = {
      total: 222,
      ids: ['a', 'b', 'c']
    };
    const res = extendAt(state, 'result', ext);
    console.log({ res });
    expect(res).toEqual({
      ...state,
      ...{ result: { ...state.result, ...ext } }
    });

    expect(res).not.toBe(state);
    expect(res.wip).toBe(state.wip);
    expect(res.result).not.toBe(state.result);
    expect(res.result !== state.result).toEqual(true);
    expect(res.result.total).not.toBe(state.result.total);
    expect(res.result.ids).toBe(state.result.ids);
    expect(res.result.ids === state.result.ids).toEqual(true);
  });

  test('Not changed at root', () => {
    const state = {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const ext = {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const res = extendAt(state, '', ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).toBe(state);
  });

  test('Not changed at path', () => {
    const state = {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const ext = {
      total: 3,
      ids: ['dd2', '35', '4']
    };
    const res = extendAt(state, 'result', ext);
    expect(res).toBe(state);
  });

  test('Not changed part at root', () => {
    const state = {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const ext = {
      wip: false
    };
    const res = extendAt(state, '', ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).toBe(state);
  });

  test('Not changed part at path', () => {
    const state = {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const ext = {
      total: 3
    };
    const res = extendAt(state, 'result', ext);
    expect(res).toBe(state);
  });
});
