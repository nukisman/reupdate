## Reference careful update

Reduce updates of your `redux` state means:

* Reduce recalculations of your `reselect`/`re-reselect` selectors
* Reduce re-rendering of your `react` components

## Motivation

Typically, the state changes less frequently than it is read.  

To avoid extra re-evaluations (and re-rendering) with `redux`, `reselect`, `react` and others we should return same reference to the (maybe nested) state when it was updated but actually not changed (some isDeepEqual(state, nextState) gives true).

## Problem

Using native JS syntax we always create new references:  
```javascript
const myReducer = (state, action) => {  
  /* Imagine current state is: */
  state = {wip: true, data: [1, 2, 3]};
  
  /* Set new state: 
   * Create new object 
   * |=> reselect will recompute, react will re-render 
   */
  return {wip: true, data: [1, 2, 3]};
  
  /* Set new state (wip only changed): 
   * Create new object 
   * |=> reselect will recompute, react will re-render 
   */
  return {wip: false, data: [1, 2, 3]};    
  
  /* Extend existing state: 
   * Create new object 
   * |=> reselect will recompute, react will re-render 
   */
  return {...state, wip: true, data: [1, 2, 3]};
  
  /* Extend existing state (wip only changed): 
   * Create new object 
   * |=> reselect will recompute, react will re-render 
   */
  return {...state, wip: false, data: [1, 2, 3]};
};
``` 

## Solution

Use `set` and `extend` functions in your reducers:

```javascript
import {set, extend} from 'reupdate';

const myReducer = (state, action) => {  
  /* Imagine current state is: */
  state = {wip: true, data: [1, 2, 3]};
  
  /* Set new state: 
   * Return same reference to the state 
   * because nothing was actually changed 
   */
  return set(state, {wip: true, data: [1, 2, 3]}); // state   
  
  /* Set new state (wip only changed): 
   * Return new object with .data references to original state.data 
   * because it was not actually changed 
   */
  return set(state, {wip: false, data: [1, 2, 3]}); // {wip: false, data: state.data}  
  
  /* Extend existing state: 
   * Return same reference to the state 
   * because nothing was actually changed 
   */
  return extend(state, {wip: true, data: [1, 2, 3]}); // state
  
  /* Extend existing state (wip only changed): 
   * Return new object with .data references to original state.data 
   * because it was not actually changed 
   */
  return extend(state, {wip: false, data: [1, 2, 3]}); // {wip: false, data: state.data}
};
``` 

## Performance of React Component.shouldComponentUpdate()

As it is written in the documentation of the [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) method:
```
We do not recommend doing deep equality checks or using JSON.stringify() in shouldComponentUpdate(). 
It is very inefficient and will harm performance.
```

```jsx harmony
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import deepEqual from 'lodash/isEqual';

class AddressComponent extends Component {
  shouldComponentUpdate(nextProps) {
    /** Without reupdate we should use deep equal */
    // return !deepEqual(this.props.address, nextProps.address);
    
    /** With reupdate we can just compare references */
    return this.props.address !== nextProps.address;
  }
  render() {
    const {country, city, street, postalCode} = this.props.address;
    return (
      <div>
        country
        <br/>
        city
        <br/>
        street
        <br/>
        postalCode
      </div>
    );
  }
}

AddressComponent = connect(
  state => ({
    address: state.user.bestFriend.address
  })
)(AddressComponent);
```

## API

### set(value, newValue)

Returns `value` if `newValue` has nothing new (is deep equal to `value`).

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
        
### extend(object, extensionObject)

Returns `object` if `extensionObject` has nothing new (has deep equal only properties).

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

## Notes

`reupdate` has no dependencies to `redux`, `reselect`, `react`, etc. so you can use it with other frameworks.