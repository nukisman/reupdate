/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';

export default (srcArray, atIndex, ...values) => {
  if (values.length === 0) return srcArray;
  else if (srcArray.length === 0) return values;
  else {
    /** Primitive implementation */
    // return set(srcArray, [
    //   ...srcArray.slice(0, at),
    //   ...values,
    //   ...srcArray.slice(at)
    // ]);

    /** Simple implementation */
    const head = srcArray.slice(0, atIndex);
    const srcTail = srcArray.slice(atIndex);
    const targetTail = [...values, ...srcTail];
    const tail = set(srcTail, targetTail);
    return [...head, ...tail];

    /** Faster implementation: reduces size of set() arguments */
    // TODO: Test is it faster or spend less memory?
    // const head = srcArray.slice(0, atIndex);
    // const srcTail = srcArray.slice(atIndex);
    // const diff = srcTail.length - values.length;
    // console.log({ diff });
    // if (diff > 0) {
    //   const srcLeft = srcTail.slice(0, values.length);
    //   const srcMiddle = srcTail.slice(values.length);
    //   //const srcRight = [];
    //
    //   const targetLeft = values;
    //   const targetMiddle = srcTail.slice(0, diff);
    //   const targetRight = srcTail.slice(diff);
    //
    //   const left = set(srcLeft, targetLeft);
    //   const middle = set(srcMiddle, targetMiddle);
    //   const right = targetRight;
    //
    //   return [...head, ...left, ...middle, ...right];
    // } else if (diff < 0) {
    //   const srcLeft = srcTail;
    //   //const srcMiddle = [];
    //   //const srcRight = [];
    //
    //   const targetLeft = values.slice(0, srcTail.length);
    //   const targetMiddle = values.slice(srcTail.length);
    //   const targetRight = srcTail;
    //
    //   const left = set(srcLeft, targetLeft);
    //   const middle = targetMiddle;
    //   const right = targetRight;
    //
    //   return [...head, ...left, ...middle, ...right];
    // } else {
    //   const left = set(srcTail, values);
    //   return [...head, ...left, ...srcTail];
    // }
  }
};
