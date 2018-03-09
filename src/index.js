/* Created by Alexander Nuikin (nukisman@gmail.com). */

export const set = (state, nextState) => {
  if (state === nextState) return state;
  else {
    const stateType = typeof state;
    const nextStateType = typeof nextState;
    if (stateType === nextStateType) {
      switch (stateType) {
        case 'object':
          if (Array.isArray(state) && Array.isArray(nextState)) {
            /** Both arrays */
            let changedCount = 0;
            const changedState = [];
            for (let i = 0; i < nextState.length; i++) {
              const newItem = set(state[i], nextState[i]);
              changedState.push(newItem);
              if (newItem !== state[i]) {
                changedCount++;
              }
            }
            if (changedCount === nextState.length) return nextState;
            else if (changedCount > 0 || state.length !== nextState.length)
              return changedState;
            else return state;
          } else if (!Array.isArray(state) && !Array.isArray(nextState)) {
            /** Both objects */
            let changedCount = 0;
            const changedState = {};
            const nextStateNames = Object.getOwnPropertyNames(nextState);
            for (const k of nextStateNames) {
              const newValue = set(state[k], nextState[k]);
              changedState[k] = newValue;
              if (state[k] !== newValue) {
                changedCount++;
              }
            }
            if (changedCount === nextStateNames.length) return nextState;
            else if (
              changedCount > 0 ||
              Object.getOwnPropertyNames(state).length !== nextStateNames.length
            )
              return changedState;
            else return state;
          } else return nextState;
        default:
          return nextState;
      }
    } else return nextState;
  }
};

export const extend = (state, ext) => {
  if (typeof state === 'object' && typeof ext === 'object') {
    if (Array.isArray(state))
      throw new TypeError('State is not an object but an array');
    if (Array.isArray(ext))
      throw new TypeError('Extension is not an object but an array');

    /** Both objects */
    const extNames = Object.getOwnPropertyNames(ext);
    if (extNames.length === 0) return state;
    else {
      let changedCount = 0;
      const changed = {};
      for (const k of extNames) {
        const newValue = set(state[k], ext[k]);
        if (state[k] !== newValue) {
          // console.log(k, state[k], newValue);
          changed[k] = newValue;
          changedCount++;
        }
      }
      // console.log(changedCount, { changed });
      if (changedCount > 0) return { ...state, ...changed };
      else return state;
    }
  }
};
