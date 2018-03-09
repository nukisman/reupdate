### Reference careful update

Reduce updates of your `redux` state means:
* Reduce recalculations of your `reselect`/`re-reselect` selectors
* Reduce re-rendering of your `react` components

### Motivation

To avoid extra re-evaluations (and re-rendering) with `redux`, `reselect`, `react` and others we should return same reference to the (maybe nested) state when it was updated but actually not changed (some isDeepEqual(state, nextState) gives true).

### Problem

Using native JS syntax we always create new references:  
```javascript
const myReducer = (state, action) => {
  
  /* Imagine current state is: */
  state = {wip: true, data: [1, 2, 3]};
  
  /* Set new state: 
   * Create new object |=> reselect will recompute, react will re-render 
   */
  return {wip: true, data: [1, 2, 3]};
  
  /* Set new state (wip only changed): 
   * Create new object |=> reselect will recompute, react will re-render 
   */
  return {wip: false, data: [1, 2, 3]};    
  
  /* Extend existing state: 
   * Create new object |=> reselect will recompute, react will re-render 
   */
  return {...state, wip: true, data: [1, 2, 3]};
  
  /* Extend existing state (wip only changed): 
   * Create new object |=> reselect will recompute, react will re-render 
   */
  return {...state, wip: false, data: [1, 2, 3]};
};
``` 

### Solution

Use `set` and `extend` functions in your reducers:

```javascript
import {set, extend} from 'reupdate';

const myReducer = (state, action) => {
  
  /* Imagine current state is: */
  state = {wip: true, data: [1, 2, 3]};
  
  /* Set new state: 
   * Return same reference to state because nothing was actually changed 
   */
  return set(state, {wip: true, data: [1, 2, 3]}); // state   
  
  /* Set new state (wip only changed): 
   * Return new object but .data references to original state.data because it not actually changed 
   */
  return set(state, {wip: false, data: [1, 2, 3]}); // {wip: false, data: state.data}  
  
  /* Extend existing state: 
   * Return same reference to state because nothing was actually changed 
   */
  return extend(state, {wip: true, data: [1, 2, 3]}); // state
  
  /* Extend existing state (wip only changed): 
   * Return new object but .data references to original state.data because it not actually changed 
   */
  return extend(state, {wip: false, data: [1, 2, 3]}); // {wip: false, data: state.data}
};
``` 

### API

#### set(value, newValue)

Returns `value` if `newValue` is deep equal to `value`.
Returns new object/array with: 
  * Same references to not changed properties/items 
  * New references to changed properties/items

Example:
```javascript
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
  friends: [{ name: 'Vasya', age: 25 }, { name: 'Fedor', age: 33 }]
};
const replacement = {
  name: 'Alex',
  info: {
    greeting: 'Hello',
    description: 'I am developer'
  },
  address: {
    country: 'Russia',
    city: 'St. Petersburg'
  },
  friends: [{ name: 'Vasya', age: 3 }, { name: 'Fedor', age: 33 }]
};

const res = set(src, replacement);

expect(res === src).toBe(false);
expect(res.info === src.info).toBe(true); // Same reference!
expect(res.address === src.address).toBe(false);
expect(res.friends === src.friends).toBe(false);
expect(res.friends[0] === src.friends[0]).toBe(false);
expect(res.friends[1] === src.friends[1]).toBe(true); // Same reference!
```  
        
#### extend(object, extensionObject)

Returns `object` if `extensionObject` has deep equal only properties.
Returns new object with: 
  * Same references to not changed properties 
  * New references to changed properties
  
```javascript
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
  friends: [{ name: 'Vasya', age: 25 }, { name: 'Fedor', age: 33 }]
};
const extension = {
  info: {
    greeting: 'Hello',
    description: 'I am developer'
  },
  address: {
    country: 'Russia',
    city: 'St. Petersburg'
  },
  friends: [{ name: 'Vasya', age: 3 }, { name: 'Fedor', age: 33 }]
};

const res = extend(src, extension);

expect(res === src).toBe(false);
expect(res.info === src.info).toBe(true); // Same reference!
expect(res.address === src.address).toBe(false);
expect(res.friends === src.friends).toBe(false);
expect(res.friends[0] === src.friends[0]).toBe(false);
expect(res.friends[1] === src.friends[1]).toBe(true); // Same reference!
```  

### Note

`reupdate` has no dependencies on `redux`, `reselect`, etc. so you can use it with other frameworks.