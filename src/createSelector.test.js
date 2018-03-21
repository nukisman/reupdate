/* Created by Alexander Nuikin (nukisman@gmail.com). */

import { createSelector as createReselectSelector } from 'reselect';
import filter from 'lodash.filter';
import isDeepEqual from 'lodash.isequal';
import createReupdateSelector from './createSelector';

/** Initial state */
const state = {
  taskTag: 'all',
  entities: {
    Task: {
      /**
       * Note: all tasks are completed!
       */
      1: {
        id: 1,
        name: 'Solve problem',
        completed: true
      },
      2: {
        id: 2,
        name: 'Discover new problems',
        completed: true
      },
      3: {
        id: 3,
        name: 'Review old problems',
        completed: true
      }
    }
  }
};

const createTest = (label, createSelector) => () => {
  // console.log('--- Test', label, '-'.repeat(30));

  const selectByTag = createSelector(
    state => state.entities.Task,
    state => state.taskTag,
    (tasks, taskTag) => {
      selectByTag.count = selectByTag.count ? selectByTag.count + 1 : 1;
      // console.log('selectByTag:', selectByTag.count);
      return filter(tasks, task => {
        switch (taskTag) {
          case 'all':
            return true;
          case 'todo':
            return task.completed === false;
          case 'completed':
            return task.completed === true;
        }
      });
    }
  );

  const selectNames = createSelector(
    tasks => tasks,
    tasks => {
      selectNames.count = selectNames.count ? selectNames.count + 1 : 1;
      // console.log('selectNames:', selectNames.count);
      return tasks.map(todo => todo.name);
    }
  );

  let filtered;
  filtered = selectByTag(state);
  filtered = selectByTag(state); // No recalculations
  expect(selectByTag.count).toEqual(1);
  // console.log(filtered);

  let names;
  names = selectNames(filtered);
  names = selectNames(filtered); // No recalculations
  expect(selectNames.count).toEqual(1);
  // console.log(names);

  /**
   * Changing taskTag to 'completed' should produce selectByTag recalculations.
   */
  const state2 = { ...state, taskTag: 'completed' };
  let filtered2 = selectByTag(state2); // Recalculation: it is ok, because taskTag value changed
  expect(selectByTag.count).toEqual(2);
  // console.log('filtered changed:', !isDeepEqual(filtered, filtered2));

  /**
   * Note: all tasks was completed in the initial state.
   * Filtered tasks have not actually changed so selectNames should not recalculate!
   *
   * reupdate vs reselect
   */
  expect(filtered2).toEqual(filtered); // Deep equal comparison
  let names2 = selectNames(filtered2);
  if (label === 'reselect') expect(selectNames.count).toEqual(2); // Extra recalculation
  if (label === 'reupdate') expect(selectNames.count).toEqual(1); // No extra recalculation
};

describe('createSelector', () => {
  test(
    'reselect: extra recalculations',
    createTest('reselect', createReselectSelector)
  );

  test(
    'reupdate: no extra recalculations',
    createTest('reupdate', createReupdateSelector)
  );
});
