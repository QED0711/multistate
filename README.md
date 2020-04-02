## Installation:

```
npm install multistate
```
___
## Quick Start:

### Initialization:

The following example shows how to implement a no frills configuration of a Multistate state manager context and provider.

```
// myState.js

import Multistate from 'multistate'

const state = {
    variable1: 1,
    variable2: 2
}

const myState = new Multistate(state)

export const MyContext = myState.context
export const MyProvider = myState.createProvider()
```

Once you have created and exported your state context and provider, you can use them as you would any context/provider pair. 

First, wrap whichever children components you want to have access to the state context in your provider. This example wraps the entire component tree in the provider, giving all components access to the state. 

```
// index.js

import React from 'react';
import ReactDOM from 'react-dom';

import {myProvider} 
...

ReactDOM.render(
    <MyProvider>
        <App/>
    </MyProvider>,
    document.getElementById('root')
)

```

This this basic setup, you already are provided with a number of useful ways to access and set the state of