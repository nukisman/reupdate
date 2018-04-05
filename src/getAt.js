/* Created by Alexander Nuikin (nukisman@gmail.com). */

const getAt = (src, path) => {
  let result = src;
  for (let k of path) {
    if (!result) return undefined;
    result = result[k];
  }
  return result;
};

export default getAt;
