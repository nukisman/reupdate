/* Created by Alexander Nuikin (nukisman@gmail.com). */

import deleteAt from './deleteAt';

describe('Delete at', () => {
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
