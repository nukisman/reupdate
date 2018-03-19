/* Created by Alexander Nuikin (nukisman@gmail.com). */

export default (srcArray, n = 1) => {
  if (n === 0) return srcArray;
  else return srcArray.slice(0, -n);
};
