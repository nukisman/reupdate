/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';

export default (srcArray, ...values) => {
  if (values.length === 0) return srcArray;
  else {
    /** Simple implementation */
    return set(srcArray, [...values, ...srcArray]);
    /** Faster implementation: reduces size of set() arguments */
    // // TODO: Test is it faster or spend less memory?
    // const diff = srcArray.length - values.length;
    // // console.log({ diff });
    // if (diff > 0) {
    //   const srcLeft = srcArray.slice(0, values.length);
    //   const srcMiddle = srcArray.slice(values.length);
    //   // const srcRight = [];
    //
    //   const targetLeft = values;
    //   const targetMiddle = srcArray.slice(0, diff);
    //   const targetRight = srcArray.slice(diff);
    //
    //   const left = set(srcLeft, targetLeft);
    //   const middle = set(srcMiddle, targetMiddle);
    //   const right = targetRight;
    //
    //   return [...left, ...middle, ...right];
    // } else if (diff < 0) {
    //   const srcLeft = srcArray;
    //   //const srcMiddle = [];
    //   //const srcRight = [];
    //
    //   const targetLeft = values.slice(0, srcArray.length);
    //   const targetMiddle = values.slice(srcArray.length);
    //   const targetRight = srcArray;
    //
    //   const left = set(srcLeft, targetLeft);
    //   const middle = targetMiddle;
    //   const right = targetRight;
    //
    //   return [...left, ...middle, ...right];
    // } else {
    //   const head = set(srcArray, values);
    //   return [...head, ...srcArray];
    // }
    /** Some old implementation */
    // const srcHead = srcArray.slice(0, values.length);
    // const targetHead = values;
    //
    // const srcMiddle = srcArray.slice(values.length);
    // const targetMiddle = srcArray.slice(0, srcArray.length - values.length);
    //
    // // srcTail = []
    // const targetTail = srcArray.slice(srcArray.length - values.length);
    //
    // const head = set(srcHead, targetHead);
    // const middle = set(srcMiddle, targetMiddle);
    //
    // // console.log({ srcHead, targetHead, head });
    // // console.log({ srcMiddle, targetMiddle, middle });
    // return [...head, ...middle, ...targetTail];
  }
};
