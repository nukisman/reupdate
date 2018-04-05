/* Created by Alexander Nuikin (nukisman@gmail.com). */

import push from './push';

describe('push', () => {
  test('Empty tail', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const res = push(state);
    expect(res).toBe(state);
  });

  test('Not empty tail', () => {
    const state = [1, 2, 3, { a: 4 }, { b: 5 }];
    const nextState = [1, 2, 3, { a: 4 }, { b: 5 }, { a: 6 }, { b: 7 }];
    const res = push(state, { a: 6 }, { b: 7 });
    expect(res).toEqual(nextState);

    expect(res).not.toBe(state);
    for (let i = 0; i < state.length; i++) expect(res[i]).toBe(state[i]);
  });
});
