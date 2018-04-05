/* Created by Alexander Nuikin (nukisman@gmail.com). */

import setAt from './setAt';
describe('setAt', () => {
  describe('Root object (empty path)', () => {
    test('Same', () => {
      const state = {
        wip: true,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = setAt(state, '', state);
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
      const res = setAt(state, '', nextState);
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
      const res = setAt(state, '', nextState);
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
      const res = setAt(state, '', nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res.result).toBe(state.result);
      expect(res.result.total).toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
      expect(res.result.ids).toEqual(state.result.ids);
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
      const res = setAt(state, '', nextState);
      expect(res).toEqual(nextState);

      expect(res).not.toBe(state);
      expect(res.wip).not.toBe(state.wip);
      expect(res.result).toBe(state.result);
      expect(res.result.total).toBe(state.result.total);
      expect(res.result.ids).toBe(state.result.ids);
      expect(res.result.ids).toEqual(state.result.ids);
    });
  });

  describe('Path object', () => {
    test('Same', () => {
      const state = {
        wip: true,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = setAt(state, 'result', state.result);
      expect(res).toEqual(state);

      expect(res).toBe(state);
    });

    test('Same 2', () => {
      const state = {
        wip: true,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = setAt(state, 'result.ids', state.result.ids);
      expect(res).toEqual(state);

      expect(res).toBe(state);
    });

    test('Same 3', () => {
      const state = {
        wip: true,
        result: {
          total: 3,
          ids: ['dd2', '35', '4']
        }
      };
      const res = setAt(state, 'result.ids[1]', state.result.ids[1]);
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
      const res = setAt(state, 'result', nextState.result);
      expect(res).toEqual(nextState);

      expect(res).toBe(state);
    });

    test('Equal 2', () => {
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
      const res = setAt(state, 'result.ids', nextState.result.ids);
      expect(res).toEqual(nextState);

      expect(res).toBe(state);
    });

    test('Equal 3', () => {
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
      const res = setAt(state, 'result.ids[1]', nextState.result.ids[1]);
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
      const res = setAt(state, 'wip', nextState.wip);
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
      const res = setAt(state, 'wip', nextState.wip);
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
      const res = setAt(state, 'wip', nextState.wip);
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
