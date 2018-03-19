/* Created by Alexander Nuikin (nukisman@gmail.com). */

export default (srcArray, ...values) => {
  if (values.length === 0) return srcArray;
  else return [...srcArray, ...values];
};
