/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';

const replaceAt = (src, path, target) => {
  // todo: Loop-based implementation
  // console.log('replaceAt', { src, path, target });
  if (path.length === 0) {
    return set(src, target);
  } else {
    const key = path[0];
    if (Array.isArray(src)) {
      const newValue = replaceAt(src[key], path.slice(1), target);
      if (newValue === src[key]) return src;
      else {
        const clone = src.slice();
        clone[key] = newValue;
        return clone;
      }
    } else {
      const newValue = replaceAt(src[key], path.slice(1), target);
      if (newValue === src[key]) return src;
      else return { ...src, [key]: newValue };
    }
  }
};

export default replaceAt;
