/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';
import getAt from './getAt';

const replaceAt = (src, path, target) => {
  // console.log('replaceAt', { src, path, target });
  if (path.length === 0) {
    return set(src, target);
  } else {
    const parent = getAt(src, path.slice(0, -1));
    const key = path[path.length - 1];
    const value = parent ? parent[key] : undefined;
    const newValue = set(value, target);
    // console.log({ parent, key, value, newValue });

    if (newValue === value) {
      return src;
    } else {
      const values = [src];
      let prev = src;
      for (let key of path) {
        prev = prev[key];
        values.push(prev);
      }
      // console.log({ values });

      values[values.length - 1] = newValue;
      for (let i = values.length - 1; i > 0; i--) {
        values[i - 1] = setNew(values[i - 1], path[i - 1], values[i]);
      }
      // console.log({ path, values });

      return values[0];
    }
  }
};

const setNew = (src, key, value) => {
  if (Array.isArray(src)) {
    const clone = src.slice();
    clone[key] = value;
    return clone;
  } else {
    return { ...src, [key]: value };
  }
};

export default replaceAt;
