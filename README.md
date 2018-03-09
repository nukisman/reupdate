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