
## Performance of React.Component.shouldComponentUpdate()

### Problem

```jsx harmony
import React, { Component } from 'react';
import deepEqual from 'lodash/isEqual';

class AddressComponent extends Component {
  state = {
    some: {
      complex: {
        value: {}
      } 
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    /** 
     * PROBLEM: We have to use deep equal to check is some nested thing was changed 
     */
    return !deepEqual(this.props, nextProps)
      || !deepEqual(this.state, nextState)
  }
  setComplexValue(value) {
    this.setState({
      some: {
        complex: { value }
      }
    })
  }
  render() {
    const {countryName, city} = this.props.address;
    const {value} = this.state.some.complex.value;
    return (
      <div>
        {countryName}
        <br/>
        {city.name}
        <br/>        
        {city.geoCenter.lat}
        <br/>        
        {city.geoCenter.lng}
        <br/>
        {value.name}
        <br/>
        {value.geoCenter.lat}
        <br/>
        <button onClick={() => this.setComplexValue(city)}>
          Click        
        </button>
      </div>
    );
  }
}
```

As it is written in the documentation of the [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) method:
```
We do not recommend doing deep equality checks 
or using JSON.stringify() in shouldComponentUpdate(). 
It is very inefficient and will harm performance.
```

### Solution

```jsx harmony
import React, { Component } from 'react';
import {setAt} from 'reupdate';

class AddressComponent extends Component {
  // state = {...}
  shouldComponentUpdate(nextProps, nextState) {
    /** 
     * With reupdate we can just compare references.
     */
    return this.props.address !== nextProps.address
      || this.state.address !== nextState.address
      || this.state.some !== nextState.some;
  }  
  setComplexValue(value) {
    /** 
     * If new value is equal to previous |=> newState === this.state  
     */
    const newState = setAt(this.state, 'some.complex.value', value);
    this.setState(newState);
  }
  // render() { ... }
}
```

#### Using React.PureComponent

Shallow-equal comparison of `props` and `state` always implemented in `React.PureComponent.shouldComponentUpdate` so we can reuse it:

```jsx harmony
import React, { PureComponent } from 'react';
import {setAt} from 'reupdate';

class AddressComponent extends PureComponent {
  // state = {...}
  setComplexValue(value) {
    /** 
     * If new value is equal to previous |=> newState === this.state  
     */
    const newState = setAt(this.state, 'some.complex.value', value);
    this.setState(newState);
  }
  // render() { ... }
}
```

See also [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)