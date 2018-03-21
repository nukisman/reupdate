## Selectors & React.PureComponent friendly immutable update

`reupdate` can help you to:
  * Reduce recalculations in existing `reselect` selectors used redux state: just create reducers with `reupdate`
  * Even more reduce recalculations with `reupdate` selectors (with same [API](#createselectorinputselectors--inputselectors-resultfunc) as `reselect`)
  * Reduce re-rendering of your `react` components

### Examples

* [reupdate vs reselect: avoid extra recalculations (working test!)](https://github.com/nukisman/reupdate/blob/master/src/createSelector.test.js)  
* [redux + reupdate: avoid extra state changes (working test!)](https://github.com/nukisman/reupdate/blob/master/src/redux.test.js)

  Also comparation tests for:
  * [object-path-immutable](https://www.npmjs.com/package/object-path-immutable)
  * [immutability-helper](https://www.npmjs.com/package/immutability-helper)
* [react + reupdate: avoid extra re-rendering](https://github.com/nukisman/reupdate/blob/master/doc/react.md)

### Note

`reupdate` has no dependencies to `redux` and `react`, etc. so you can use it with other frameworks.

## Contents

* [Motivation](#motivation)
* [Design Rule](#design-rule)
* [Difference from `object-path-immutable` and `immutability-helper`](#difference-from-object-path-immutable-and-immutability-helper) 
* [Install](#install)
* [Quick usage](#quick-usage)
* [Imports](#imports)
* [API](#api)
* [Credits](#credits)

## Motivation

Typically, the state changes less frequently than it is read.  

To avoid extra re-evaluations (and re-rendering) with `redux`, `reselect`, `react` and others we should return same reference to the (maybe nested) state when it was updated but actually not changed (some isDeepEqual(state, nextState) gives true). 

## Design rule

If your update of `src` value do not change it (in sense of deep equality) then `result === src` must give `true`:   

`isDeepEqual(src, value) |=> result === src`

This rule also must work for nested not changed values as is:

`isDeepEqual(src.a.b.c, value.a.b.c) |=> result.a.b.c === src.a.b.c`  

### Difference from `object-path-immutable` and `immutability-helper`

`object-path-immutable` and `immutability-helper` usually expect that you know what is the difference from `src` and `value` and some times returns reference for `value` despite it is deep equal to `src`. As a result we have extra recalculations of selectors and/or re-rendering of components.

In such cases `reupdate` returns reference to `src`, so it prevents extra recalculations and re-rendering. Profit! See [examples](#examples)!

## Install

```
yarn add reupdate
``` 
or 
```
npm i reupdate
```

## Quick usage

```js
import {set, setAt, extend} from 'reupdate';
import cloneDeep from 'lodash/cloneDeep';

const src = {
  a: {
    b: {
      c: 'c',
      d: 'd'
    },
    e: 'e',
    f: [
      {f0: 'f0'},
      {f1: 'f1'},
      {f2: 'f2'}
    ]
  },
  info: {
    name: 'smth',
    coord: {x: 1, y: 2}
  }
}

let res;
res = set(src, src); // res === src
res = set(src, cloneDeep(src)); // res === src

res = setAt(src, 'a.f[1].f1', 123);
// res.a !== src.a
// res.a.f !== src.a.f
// res.a.f[1].f1 !== src.a.f[1].f1
/** But following references were saved!: */
// res.a.b === src.a.b
// res.a.e === src.a.e
// res.a.f[0] === src.a.f[0]
// res.a.f[2] === src.a.f[2]

res = extend(src, { 
  info: {
    name: 'New Name', 
    coord: {x: 1, y: 2} // coord not actually changed 
  }
});
// res.info !== src.info
// res.info.name !== src.info.name
/** But following references were saved!: */
// res.a === src.a
// res.info.coord === src.info.coord 
```

## Imports

You can import functions like this:
```js
import {set, insert, createSelector} from 'reupdate';
```
Or like this (to reduce bundle size with webpack or other bundlers):
```js
import set from 'reupdate/set';
import insert from 'reupdate/insert';
import createSelector from 'reupdate/createSelector';
```

## API

* Generic functions
  * [set(value, newValue)](#setvalue-newvalue)
  * [setAt(value, path, newValue)](#setatvalue-path-newvalue)
  * [updateAt(value, path, updater)](#updateatvalue-path-updater)
  * [deleteAt(value, path)](#deleteatvalue-path)
* Object spcific functions  
  * [extend(object, extensionObject)](#extendobject-extensionobject)
  * [extendAt(value, pathToObject, extensionObject)](#extendatvalue-path-extensionobject)
* Array specific functions
  * [push(srcArray, ...values)](#pushsrcarray-values)
  * [pop(srcArray, n = 1)](#popsrcarray-n--1)
  * [insert(srcArray, atIndex, ...values)](#insertsrcarray-atindex-values)
  * [splice(srcArray, atIndex, deleteCount, ...values)](#splicesrcarray-atindex-deletecount-values)
  * [shift(srcArray, n = 1)](#shiftsrcarray-n--1)
  * [unshift(srcArray, ...values)](#unshiftsrcarray-values)
* Selectors related
  * [createSelector(...inputSelectors | [inputSelectors], resultFunc)](#createselectorinputselectors--inputselectors-resultfunc)  

### set(value, newValue)

Returns `value` if `newValue` has nothing new (is deep equal to `value`).

Returns new object/array with: 
  * Same references to not changed properties/items 
  * New references to changed properties/items

Example:
```javascript
import set from 'reupdate/set'

const src = {
  name: 'Alex',
  info: {
    greeting: 'Hello',
    description: 'I am developer'
  },
  address: {
    country: 'Russia',
    city: 'Moscow'
  },
  friends: [
    { name: 'Vasya', age: 25 }, 
    { name: 'Fedor', age: 33 }
  ]
};
const replacement = {
  name: 'Alex',
  info: {
    greeting: 'Hello',
    description: 'I am developer'
  },
  address: {
    country: 'Russia',
    city: 'Moscow'
  },
  friends: [
    { name: 'Vasya', age: 3 }, // The ONLY actual change!  
    { name: 'Fedor', age: 33 }
  ]
};

const res = set(src, replacement);

expect(res).toEqual(replacement); // Correct result

expect(res === src).toBe(false);
expect(res.info === src.info).toBe(true); // Same reference!
expect(res.address === src.address).toBe(true); // Same reference!
expect(res.friends === src.friends).toBe(false);
expect(res.friends[0] === src.friends[0]).toBe(false);
expect(res.friends[1] === src.friends[1]).toBe(true); // Same reference!
```  

### setAt(value, path, newValue)

`set` nested part of value

### updateAt(value, path, updater)

Example: 
```js
updateAt(state, 'a.b[1].c', c => c + 1)
```

### deleteAt(value, path)

Equal to `setAt(value, path, undefined)`

Important edge case: delete undefined value saves reference: 
```js
import deleteAt from 'reupdate/deleteAt';

const value = {x: 1};
const res = deleteAt(value, 'y');
// value === res
```
        
### extend(object, extensionObject)

Returns `object` if `extensionObject` has nothing new (has deep equal only properties).

Returns new object with: 
  * Same references to not changed properties 
  * New references to changed properties
  
Important edge case: `extend` with empty `extensionObject` saves reference: `object === extend(object, {})`  
  
```javascript
import extend from 'reupdate/extend';

const src = {
  name: 'Alex',
  info: {
    greeting: 'Hello',
    description: 'I am developer'
  },
  address: {
    country: 'Russia',
    city: 'Moscow'
  },
  friends: [
    { name: 'Vasya', age: 25 }, 
    { name: 'Fedor', age: 33 }
  ]
};
const extension = {
  friends: [
    { name: 'Vasya', age: 3 }, // The ONLY actual change! 
    { name: 'Fedor', age: 33 }
  ]
};

const res = extend(src, extension);

expect(res).toEqual({...src, ...extension}); // Correct result

expect(res === src).toBe(false);
expect(res.info === src.info).toBe(true); // Same reference!
expect(res.address === src.address).toBe(true); // Same reference! 
expect(res.friends === src.friends).toBe(false);
expect(res.friends[0] === src.friends[0]).toBe(false);
expect(res.friends[1] === src.friends[1]).toBe(true); // Same reference!
```  

### extendAt(value, pathToObject, extensionObject)

`extend` nested object of value

### push(srcArray, ...values)

Important edge case: push empty `values` saves reference: `srcArray === push(srcArray)`

### pop(srcArray, n = 1)

Important edge case: pop 0 items saves reference: `srcArray === pop(srcArray, 0)`

### insert(srcArray, atIndex, ...values)

Important edge case: insert empty `values` at any index saves reference: `srcArray === insert(srcArray, i)`

### splice(srcArray, atIndex, deleteCount, ...values)

Important edge cases: 
  * Delete 0 and insert empty `values` saves reference: `srcArray === splice(srcArray, i, 0)`
  * Delete and insert the same `values` saves reference: 
    ```js
    import splice from 'reupdate/splice';
    const srcArray = [a, b, c, d];
    const atIndex = 1;
    const res = splice(srcArray, atIndex, 2, b, c);
    // srcArray === res;
    ```
### shift(srcArray, n = 1)

Important edge case: shift 0 items saves reference: `srcArray === shift(srcArray, 0)`

### unshift(srcArray, ...values)

Important edge case: unshift empty `values` saves reference: `srcArray === unshift(srcArray)`

### createSelector(...inputSelectors | [inputSelectors], resultFunc)

Wrapper for [reselect.createSelector](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc) 

## Credits

* [Alexander Nuikin](https://github.com/nukisman) - Author