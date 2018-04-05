/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';
describe('set', () => {
  describe('Array', () => {
    test('Contains object', () => {
      const state = [
        true,
        {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      ];
      const nextState = [
        false,
        {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      ];
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res[0]).not.toBe(state[0]);
      expect(res[1]).toBe(state[1]);
      expect(res[1].total).toBe(state[1].total);
      expect(res[1].ids).toBe(state[1].ids);
      expect(res[1].ids).toEqual(state[1].ids);
    });

    test('Same', () => {
      const state = ['dd2', '35', '4', 111];
      const res = set(state, state);
      expect(res).toEqual(state);

      expect(res).toBe(state);
    });

    test('Equal', () => {
      const state = ['dd2', '35', '4', 111];
      const nextState = ['dd2', '35', '4', 111];
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).toBe(state);
    });

    test('Changed', () => {
      const state = ['dd2', '35', 3, '4', 111];
      const nextState = ['dd2', '35', 0, '4', 111];
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res[0]).toBe(state[0]);
      expect(res[1]).toBe(state[1]);
      expect(res[2]).toBe(nextState[2]);
      expect(res[3]).toBe(state[3]);
      expect(res[4]).toBe(state[4]);
    });

    test('Smaller', () => {
      const state = ['dd2', '35', 3, '4', 111];
      const nextState = ['dd2', '35', 3];
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res[0]).toBe(state[0]);
      expect(res[1]).toBe(state[1]);
      expect(res[2]).toBe(state[2]);
    });

    test('Bigger', () => {
      const state = ['dd2', '35', 3];
      const nextState = ['dd2', '35', 3, '4', true];
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res[0]).toBe(state[0]);
      expect(res[1]).toBe(state[1]);
      expect(res[2]).toBe(state[2]);
      expect(res[3]).toBe(nextState[3]);
      expect(res[4]).toBe(nextState[4]);
    });
  });

  describe('Object', () => {
    test('Same', () => {
      const state = {
        wip: true,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = set(state, state);
      expect(res).toEqual(state);

      expect(res).toBe(state);
    });
    test('Equal', () => {
      const state = {
        wip: false,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const nextState = {
        wip: false,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).toBe(state);
    });
    test('Changed', () => {
      const state = {
        wip: true,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const nextState = {
        wip: false,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res.wip).not.toBe(state.wip);
      expect(res.result).toBe(state.result);
      expect(res.result.total).toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
      expect(res.result.ids).toEqual(state.result.ids);
    });

    test('Smaller', () => {
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
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res.result).toBe(state.result);
      expect(res.result.total).toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
      expect(res.result.ids).toEqual(state.result.ids);
      expect(res).toEqual(nextState);
    });

    test('Bigger', () => {
      const state = {
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const nextState = {
        wip: false,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = set(state, nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res.wip).not.toBe(state.wip);
      expect(res.result).toBe(state.result);
      expect(res.result.total).toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
      expect(res.result.ids).toEqual(state.result.ids);
      expect(res).toEqual(nextState);
    });
  });
});
