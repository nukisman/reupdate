/* Created by Alexander Nuikin (nukisman@gmail.com). */

import { setAt, extend, extendAt } from './index';
import objectPathImmutable from 'object-path-immutable';
import immutabilityHelper from 'immutability-helper';

const createState = () => ({
  name: 'John',
  info: {
    age: 20,
    slogan: "Let's change the world!",
    friends: [{ name: 'Jeff' }, { name: 'Bill' }]
  }
});

const setName = name => ({ type: 'SET_NAME', payload: { name } });
const setAge = age => ({ type: 'SET_AGE', payload: { age } });
const setFriends = friends => ({
  type: 'SET_FRIENDS',
  payload: { friends }
});

const defaultReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload.name };
    case 'SET_AGE':
      return { ...state, info: { ...state.info, age: action.payload.age } };
    case 'SET_FRIENDS':
      return {
        ...state,
        info: {
          ...state.info,
          friends: action.payload.friends
        }
      };
    default:
      return state;
  }
};

const reupdateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return extend(state, { name: action.payload.name });
    case 'SET_AGE':
      // return setAt(state, 'info.age', action.payload.age);
      // Or
      return extendAt(state, 'info', { age: action.payload.age });
    case 'SET_FRIENDS':
      return setAt(state, 'info.friends', action.payload.friends);
    default:
      return state;
  }
};

const objectPathImmutableReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return objectPathImmutable.assign(state, '', {
        name: action.payload.name
      });
    case 'SET_AGE':
      return objectPathImmutable.assign(state, 'info', {
        age: action.payload.age
      });
    case 'SET_FRIENDS':
      return objectPathImmutable.set(
        state,
        'info.friends',
        action.payload.friends
      );
    default:
      return state;
  }
};

const immutabilityHelperReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      /** $merge saves reference */
      // return immutabilityHelper(state, {
      //   $merge: {
      //     name: action.payload.name
      //   }
      // });
      /** $set NOT saves reference */
      return immutabilityHelper(state, {
        $set: {
          name: action.payload.name,
          info: state.info
        }
      });
    case 'SET_AGE':
      /** $merge saves reference */
      // return immutabilityHelper(state, {
      //   info: {
      //     $merge: {
      //       age: action.payload.age
      //     }
      //   }
      // });
      /** $set saves reference */
      // return immutabilityHelper(state, {
      //   info: {
      //     age: {
      //       $set: action.payload.age
      //     }
      //   }
      // });
      /** $set NOT saves reference */
      return immutabilityHelper(state, {
        info: {
          $set: {
            ...state.info,
            age: action.payload.age
          }
        }
      });
    case 'SET_FRIENDS':
      /** $set IN SOME CASES saves reference */
      // return immutabilityHelper(state, {
      //   info: {
      //     friends: {
      //       $set: action.payload.friends
      //     }
      //   }
      // });
      /** $set NOT saves reference */
      return immutabilityHelper(state, {
        info: {
          $set: {
            ...state.info,
            friends: action.payload.friends
          }
        }
      });
    default:
      return state;
  }
};

const runTestSuite = (label, reducer) => {
  describe(`redux: ${label}`, () => {
    test('setName: equal', () => {
      const state = createState();
      /* Note: name not actually changed */
      const nextState = reducer(state, setName(state.name));
      /** Always works with reupdate only! */
      expect(nextState === state).toBe(label === 'reupdate');
    });

    test('setName: changed', () => {
      const state = createState();
      const nextState = reducer(state, setName(state.name + state.name));
      expect(nextState.name !== state.name).toBe(true);
      expect(nextState.info === state.info).toBe(true);
    });

    test('setAge: equal', () => {
      const state = createState();
      /* Note: info.age not actually changed */
      const nextState = reducer(state, setAge(state.info.age));
      /** Always works with reupdate only! */
      expect(nextState === state).toBe(label === 'reupdate');
    });

    test('setAge: changed', () => {
      const state = createState();
      const nextState = reducer(state, setAge(state.info.age + 5));
      expect(nextState.info !== state.info).toBe(true);
      expect(nextState.info.age !== state.info.age).toBe(true);
      expect(nextState.info.friends === state.info.friends).toBe(true);
    });

    test('setFriends: same', () => {
      const state = createState();
      /* Note: info.friends not actually changed */
      const nextState = reducer(state, setFriends(state.info.friends));
      /** Always works with reupdate only! */
      expect(nextState === state).toBe(label === 'reupdate');
    });

    test('setFriends: equal', () => {
      const state = createState();
      /* Note: info.friends not actually changed */
      const nextState = reducer(
        state,
        setFriends([{ name: 'Jeff' }, { name: 'Bill' }])
      );
      /** Always works with reupdate only! */
      expect(nextState === state).toBe(label === 'reupdate');
    });

    test('setFriends: first changed', () => {
      const state = createState();
      /* Note: info.friends[1] not actually changed */
      const nextState = reducer(
        state,
        setFriends([{ name: 'Ragnar' }, { name: 'Bill' }])
      );
      expect(nextState.info !== state.info).toBe(true);
      expect(nextState.info.friends !== state.info.friends).toBe(true);
      expect(nextState.info.friends[0] !== state.info.friends[0]).toBe(true);
      /** Always works with reupdate only! */
      expect(nextState.info.friends[1] === state.info.friends[1]).toBe(
        label === 'reupdate'
      );
    });
  });
};

runTestSuite('default', defaultReducer);
runTestSuite('reupdate', reupdateReducer);
runTestSuite('object-path-immutable', objectPathImmutableReducer);
runTestSuite('immutability-helper', immutabilityHelperReducer);
