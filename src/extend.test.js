/* Created by Alexander Nuikin (nukisman@gmail.com). */

import extend from './extend';
import { cloneDeep, multiTest } from './test.util';

describe('extend', () => {
  multiTest(
    'Extend with empty',
    {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    {},
    [
      (state, ext) => extend(state, ext),
      (state, ext) => extend(state, state => ext)
    ],
    (state, param) => state,
    (state, res, param) => expect(res).toBe(state)
  );

  multiTest(
    'Extend with changed part',
    {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    { wip: false },
    [
      (state, ext) => extend(state, ext),
      (state, ext) => extend(state, state => ext)
    ],
    (state, ext) => ({ ...state, ...ext }),
    (state, res) => {
      expect(res).not.toBe(state);
      expect(res.wip).not.toBe(state.wip);
      expect(res.result).toBe(state.result);
      expect(res.result.total).toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
    }
  );

  multiTest(
    'Extend with changed',
    {
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
    },
    state => ({ ...cloneDeep(state), wip: false }),
    [
      (state, ext) => extend(state, ext),
      (state, ext) => extend(state, state => ext)
    ],
    (state, ext) => ({ ...state, ...ext }),
    (state, res) => {
      expect(res).not.toBe(state);
      expect(res.wip).not.toBe(state.wip);
      expect(res.result).toBe(state.result);
      expect(res.result === state.result).toEqual(true);
      expect(res.result.total).toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
      expect(res.result.ids === state.result.ids).toEqual(true);
    }
  );

  multiTest(
    'Extend with same part',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    state => ({ result: cloneDeep(state.result) }),
    [
      (state, ext) => extend(state, ext),
      (state, ext) => extend(state, state => ext)
    ],
    (state, ext) => ({ ...state, ...ext }),
    (state, res) => expect(res).toBe(state)
  );

  multiTest(
    'Extend with same',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    state => cloneDeep(state),
    [
      (state, ext) => extend(state, state),
      (state, ext) => extend(state, state => state)
    ],
    (state, ext) => ({ ...state, ...ext }),
    (state, res) => expect(res).toBe(state)
  );
});
