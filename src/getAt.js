/* Created by Alexander Nuikin (nukisman@gmail.com). */

const getAt = (src, path) => {
  // todo: Loop-based implementation
  if (path.length === 0) {
    return src;
  } else {
    const key = path[0];
    return getAt(src[key], path.slice(1));
  }
};

export default getAt;
