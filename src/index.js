/* Created by Alexander Nuikin (nukisman@gmail.com). */

import set from './set';
import setAt from './setAt';

import updateAt from './updateAt';
import deleteAt from './deleteAt';

import extend from './extend';
import extendAt from './extendAt';

export { set, setAt, updateAt, deleteAt, extend, extendAt };

// TODO: Handle recursive objects

// setAt(src, path, target)
// deleteAt(src, path) // Equal to setAt(src, path, undefined)
// updateAt(src, path, updater)
// extendAt(src, path, ext)

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
