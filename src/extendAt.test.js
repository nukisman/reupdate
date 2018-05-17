/* Created by Alexander Nuikin (nukisman@gmail.com). */

import extendAt from './extendAt';
import { cloneDeep, multiTest } from './test.util';

describe('extendAt', () => {
  multiTest(
    'Extend with empty at root',
    {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    {},
    [
      (state, ext) => extendAt(state, '', ext),
      (state, ext) => extendAt(state, '', state => ext)
    ],
    (state, ext) => state,
    (state, res) => expect(res).toBe(state)
  );
  multiTest(
    'Extend with empty at path',
    {
      wip: true,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    {},
    [
      (state, ext) => extendAt(state, 'result', ext),
      (state, ext) => extendAt(state, 'result', result => ext)
    ],
    (state, ext) => state,
    (state, res) => expect(res).toBe(state)
  );

  multiTest(
    'Extend with changed part at root',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    { wip: true },
    [
      (state, ext) => extendAt(state, '', ext),
      (state, ext) => extendAt(state, '', state => ext)
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
    'Extend with changed part at path',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    { total: 4 },
    [
      (state, ext) => extendAt(state, 'result', ext),
      (state, ext) => extendAt(state, 'result', result => ext)
    ],
    (state, ext) => ({
      ...state,
      ...{ result: { ...state.result, ...ext } }
    }),
    (state, res) => {
      expect(res).not.toBe(state);
      expect(res.wip).toBe(state.wip);
      expect(res.result).not.toBe(state.result);
      expect(res.result.total).not.toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
    }
  );

  multiTest(
    'Extend with changed at root',
    {
      wip: true,
      result: {
        total: 300,
        ids: ['a', 'b', 'c']
      }
    },
    state => ({ ...cloneDeep(state), wip: false }),
    [
      (state, ext) => extendAt(state, '', ext),
      (state, ext) => extendAt(state, '', state => ext)
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
    'Extend with changed at path',
    {
      wip: true,
      result: {
        total: 300,
        ids: ['a', 'b', 'c']
      }
    },
    state => ({ ...cloneDeep(state.result), total: 222 }),
    [
      (state, ext) => extendAt(state, 'result', ext),
      (state, ext) => extendAt(state, 'result', result => ext)
    ],
    (state, ext) => ({
      ...state,
      ...{ result: { ...state.result, ...ext } }
    }),
    (state, res) => {
      expect(res).not.toBe(state);
      expect(res.wip).toBe(state.wip);
      expect(res.result).not.toBe(state.result);
      expect(res.result !== state.result).toEqual(true);
      expect(res.result.total).not.toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
      expect(res.result.ids === state.result.ids).toEqual(true);
    }
  );

  multiTest(
    'Extend with same at root',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    state => cloneDeep(state),
    [
      (state, ext) => extendAt(state, '', ext),
      (state, ext) => extendAt(state, '', state => ext)
    ],
    (state, ext) => ({ ...state, ...ext }),
    (state, res) => expect(res).toBe(state)
  );
  multiTest(
    'Extend with same at path',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    state => cloneDeep(state.result),
    [
      (state, ext) => extendAt(state, 'result', ext),
      (state, ext) => extendAt(state, 'result', result => ext)
    ],
    (state, ext) => ({ ...state, result: { ...state.result, ...ext } }),
    (state, res) => expect(res).toBe(state)
  );

  multiTest(
    'Extend with same part at root',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    state => ({ result: cloneDeep(state.result) }),
    [
      (state, ext) => extendAt(state, '', ext),
      (state, ext) => extendAt(state, '', state => ext)
    ],
    (state, ext) => ({ ...state, ...ext }),
    (state, res) => expect(res).toBe(state)
  );
  multiTest(
    'Extend with same part at path',
    {
      wip: false,
      result: {
        total: 3,
        ids: ['dd2', '35', '4']
      }
    },
    state => ({ ids: cloneDeep(state.result.ids) }),
    [
      (state, ext) => extendAt(state, 'result', ext),
      (state, ext) => extendAt(state, 'result', result => ext)
    ],
    (state, ext) => ({ ...state, result: { ...state.result, ...ext } }),
    (state, res) => expect(res).toBe(state)
  );
});
