/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';
import setAt from './setAt';

import updateAt from './updateAt';
import deleteAt from './deleteAt';

import extend from './extend';
import extendAt from './extendAt';

import push from './push';
import pop from './pop';
import insert from './insert';
import splice from './splice';
import shift from './shift';
import unshift from './unshift';

import createSelector from './createSelector';

export {
  set,
  setAt,
  updateAt,
  deleteAt,
  extend,
  extendAt,
  push,
  pop,
  insert,
  splice,
  shift,
  unshift,
  createSelector
};

// TODO: Handle recursive objects

// setAt(src, path, target)
// deleteAt(src, path) // Equal to setAt(src, path, undefined)
// updateAt(src, path, updater)
// extendAt(src, path, ext)

// push(srcArray, ...values) - [...srcArray, ...values]
// pop(srcArray, n) - srcArray.slice(0, -n)
// insert(srcArray, at, ...values)
// splice(srcArray, start, deleteCount, ...values)
// shift(srcArray, n=1)
// unshift(srcArray, ...values)

// TODO: Create intermediate objects/arrays if necessary
// TODO: insertAt(src, pathToArray, at, ...values)
// TODO: spliceAt(srcArray, pathToArray, deleteCount, ...values)
// TODO: pushAt(src, pathToArray, value)
// TODO: popAt(src, pathToArray, value)
// TODO: shiftAt(src, pathToArray)
// TODO: unshiftAt(src, pathToArray, value)
