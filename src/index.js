/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';
import setAt from './setAt';

import extend from './extend';
import extendAt from './extendAt';

import deleteAt from './deleteAt';

export { set, setAt, extend, extendAt, deleteAt };

// TODO: Handle recursive objects

// setAt(src, path, target)
// extendAt(src, path, ext)
// deleteAt(src, path) // Equal to setAt(src, path, undefined)
// TODO: updateAt(src, path, updater)

// TODO: insert(srcArray, at, ...values)
// TODO: splice(srcArray, deleteCount, ...values)
// TODO: push(srcArray, value)
// TODO: pop(srcArray)
// TODO: shift(srcArray)
// TODO: unshift(srcArray, value)

// TODO: insertAt(src, pathToArray, at, ...values)
// TODO: spliceAt(srcArray, pathToArray, deleteCount, ...values)
// TODO: pushAt(src, pathToArray, value)
// TODO: popAt(src, pathToArray, value)
// TODO: shiftAt(src, pathToArray)
// TODO: unshiftAt(src, pathToArray, value)
