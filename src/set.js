/* Created by Alexander Nuikin (nukisman@gmail.com). */

const set = (src, target) => {
  if (src === target) return src;
  else {
    const srcType = typeof src;
    const targetType = typeof target;
    if (srcType === targetType) {
      switch (srcType) {
        case 'object':
          if (Array.isArray(src) && Array.isArray(target)) {
            /** Both arrays */
            let changedCount = 0;
            const changedState = [];
            const minLen = Math.min(src.length, target.length);
            for (let i = 0; i < minLen; i++) {
              const newItem = set(src[i], target[i]);
              changedState.push(newItem);
              if (newItem !== src[i]) changedCount++;
            }
            if (src.length < target.length)
              changedState.push(...target.slice(minLen));
            if (changedCount === target.length) return target;
            else if (changedCount > 0 || src.length !== target.length)
              return changedState;
            else return src;
          } else if (!Array.isArray(src) && !Array.isArray(target)) {
            /** Both objects */
            let changedCount = 0;
            const changedState = {};
            const nextStateNames = Object.getOwnPropertyNames(target);
            for (const k of nextStateNames) {
              const newValue = set(src[k], target[k]);
              changedState[k] = newValue;
              if (src[k] !== newValue) {
                changedCount++;
              }
            }
            if (changedCount === nextStateNames.length) return target;
            else if (
              changedCount > 0 ||
              Object.getOwnPropertyNames(src).length !== nextStateNames.length
            )
              return changedState;
            else return src;
          } else return target;
        default:
          return target;
      }
    } else return target;
  }
};

export default set;
