/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';
import setAt from './setAt';

import updateAt from './updateAt';
import deleteAt from './deleteAt';

import extend from './extend';
import extendAt from './extendAt';

import push from './push';
import pushAt from './pushAt';

import pop from './pop';
import popAt from './popAt';

import insert from './insert';
import splice from './splice';
import shift from './shift';

import unshift from './unshift';
import unshiftAt from './unshiftAt';

import createSelector from './createSelector';
import createStructuredSelector from './createStructuredSelector';

export {
  set,
  setAt,
  updateAt,
  deleteAt,
  extend,
  extendAt,
  push,
  pushAt,
  pop,
  popAt,
  insert,
  splice,
  shift,
  unshift,
  unshiftAt,
  createSelector,
  createStructuredSelector
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
// pushAt(src, pathToArray, ...values)
// TODO: popAt(src, pathToArray, n = 1)
// TODO: shiftAt(src, pathToArray, n = 1)
// TODO: unshiftAt(src, pathToArray, ...values)

// todo: createPathSelector(...path) |=> createSelector(value => value, value => getAt(value, path))
