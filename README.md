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

### Wrapping components with the state provider:

Once you have created and exported your state context and provider, you can use them as you would any context/provider pair. 

First, wrap whichever children components you want to have access to the state context in your provider. This example wraps the entire component tree in the provider, giving all children access to the state. 

```
    // index.js

    import React from 'react';
    import ReactDOM from 'react-dom';

    import { myProvider } from './myState.js'
    ...

    ReactDOM.render(
        <MyProvider>
            <MyChildrenComponentsHere />
        </MyProvider>,
        document.getElementById('root')
    )

```

With this this basic setup, you are already provided with a number of useful ways to access and set the state of your multistate instance. As an example using the useContext hook: 

### Subscribing to the state context

```
    // ExampleChildComponent.js (within the tree structure inheriting from your provider component)

    import React, { useContext } from 'react'
    import { MyContext } from './myState.js'

    const ExampleChildComponent = () => {
        const { state, setters } = useContext(MyContext);
        
        // state = {variable1: 1, variable2: 2}
        // setters = {setVariable1: function(...), setVariable2: function(...)}

        return (
            <>
                <button onClick={
                    e => {setters.setVariable1(state.variable1 + 1)}
                }>
                    Button 1
                </button>

                <button onClick={
                    e => {setters.setVariable2(state.variable2 - 1)}
                }>
                    Button 2
                </button>

            </>
        )
    }
```

Using destructuring in the above example, we get access to a `state` variable containing the state of our multistate instance, and a `setters` variable, which is an object containing dynamically generated setter methods for that state. If you are familiar with the `useState` hook that provides you with an accessor variable and a setter for that variable, this is the same pattern, but placed over your entire state definition and available throughout your state tree. See [Dynamic Setters](#dynamic-setters) for more details on naming conventions and other options.

### Adding custom setters

In the above example, we have made a basic increment/decrement counter using our state and provided setters. But what if you wanted setter methods called `incrementVariable1` and `decrementVariable2` so you didn't have to hard code the functionality every time? Fortunately, this is quite easy to accomplish with custom setters. 

Like the standard setState pattern of vanilla React, we can define methods that use `setState` to alter the state of a variable (or variables) without changing it directly. However, we then typically have to deal with binding so as to keep the `setState` call in the correct scope. Multistate handles all the background binding for us so we can just tell it what we want out method to do. 

We'll adjust our `myState.js` file as follows:

```
    // myState.js

    import Multistate from 'multistate'

    const state = {
        variable1: 1,
        variable2: 2
    }

    const myState = new Multistate(state)
    
    // :::::::::::::::::::::::::::::
    // :: ADD CUSTOM SETTERS HERE ::
    // :::::::::::::::::::::::::::::

    myState.addCustomSetters({
        incrementVariable1(){
            this.setState({
                variable1: this.state.variable1 + 1
            })
        },

        decrementVariable2(){
            this.setState({
                variable2: this.state.variable2 - 1
            })
        }
    })


    export const MyContext = myState.context
    export const MyProvider = myState.createProvider()
```

Notice that we are able to access the `this` keyword within our custom setters. `this` is bound to the value of our provider, so we are given access to the state itself through `this.state`. In fact, any value or method that we get when subscribing to the provider is also accessible via the `this` keyword within our custom setters.

We'll now update our subscribing component to use our new custom setters.

```
    // ExampleChildComponent,js

    import React, { useContext } from 'react'
    import { MyContext } from './myState.js'

    const ExampleChildComponent = () => {
        const { state, setters } = useContext(MyContext);

        return (
            <>
                <button onClick={setters.incrementVariable1}>
                    Button 1
                </button>

                <button onClick={setters.decrementVariable2}>
                    Button 2
                </button>

            </>
        )
    }
```

And with that we have a quick and easy way to implement our own setter logic.

___

