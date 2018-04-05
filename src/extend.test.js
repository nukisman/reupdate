/* Created by Alexander Nuikin (nukisman@gmail.com). */

import extend from './extend';

describe('extend', () => {
  test('Empty', () => {
    const state = {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    };
    const res = extend(state, {});
    expect(res).toEqual(state);

    expect(res).toBe(state);
  });
  test('Changed part', () => {
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
    const res = extend(state, ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).not.toBe(state);
    expect(res.wip).not.toBe(state.wip);
    expect(res.result).toBe(state.result);
    expect(res.result.total).toBe(state.result.total);
    expect(res.result.ids).toBe(state.result.ids);
  });

  test('Changed', () => {
    const state = {
      wip: true,
      result: {
        total: 300,
        ids: [
          '000_deal0',
          '000_deal1',
          '000_deal2',
          '0010_deal0',
          '0010_deal1',
          '0010_deal2',
          '0011_deal0',
          '0011_deal1'
        ]
      }
    };
    const ext = {
      wip: false,
      result: {
        total: 300,
        ids: [
          '000_deal0',
          '000_deal1',
          '000_deal2',
          '0010_deal0',
          '0010_deal1',
          '0010_deal2',
          '0011_deal0',
          '0011_deal1'
        ]
      }
    };
    // console.log('Extend: Changed');
    const res = extend(state, ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).not.toBe(state);
    expect(res.wip).not.toBe(state.wip);
    expect(res.result).toBe(state.result);
    expect(res.result === state.result).toEqual(true);
    expect(res.result.total).toBe(state.result.total);
    expect(res.result.ids).toBe(state.result.ids);
    expect(res.result.ids === state.result.ids).toEqual(true);
  });

  test('Not Changed part', () => {
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
    const res = extend(state, ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).toBe(state);
  });

  test('Not Changed', () => {
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
    const res = extend(state, ext);
    expect(res).toEqual({ ...state, ...ext });

    expect(res).toBe(state);
  });
});
