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

With this basic setup, you are already provided with a number of useful ways to access and set the state of your multistate instance. As an example using the useContext hook: 

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
                    async e => {await setters.setVariable1(state.variable1 + 1)}
                }>
                    Button 1
                </button>

                <button onClick={
                    async e => {await setters.setVariable2(state.variable2 - 1)}
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

Like the standard setState pattern of vanilla React, we can define methods that use `setState` to alter the state of a variable (or variables) without changing it directly. However, we then typically have to deal with binding so as to keep the `setState` call in the correct scope. Multistate handles all the background binding for us so we can just tell it what we want our method to do. 

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

Notice that we are able to access the `this` keyword within our custom setters. `this` becomes bound to the value of our provider, so we are given access to the state itself through `this.state`. In fact, any value or method that we get when subscribing to the provider is also accessible via the `this` keyword within our custom setters.

We'll now update our subscribing component to use our new custom setters.

```
    // ExampleChildComponent.js

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

## Initialization Options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| dynamicSetters | Boolean | true | specifies if setters should be dynamically generated based on the provided state object. |
| dynamicGetters | Boolean | true | specifies if getters should be dynamically generated based on the provided state object. |
| nestedSetters | Boolean | false | Specifies if setters should be dynamically created for nested state values.
| nestedGetters | Boolean | true | Specifies if getters should be dynamically created for nested state values.
| allowSetterOverwrite | Boolean | true | If true, allows a custom defined setter to overwrite the functionality of a dynamic setter of the same name. |
| developmentWarnings | Boolean | true | if `allowSetterOverwrite` is false, developmentWarnings will warn the developer if they try to overwrite a dynamic setter with custom logic. | 
| overwriteProtectionLevel | Number (0, 1, >= 2) | 1 | if `allowSetterOverwrite` is false, sets the warning type that a developer will get when overwriting a dynamic setter. `0` will silence warnings, `1` print a console.warn message, and 2 or greater will throw an error and halt execution. |

___
## Connecting to Local Storage

You can easily connect your entire state, or selected parts of your state to the browser's local storage for persistance, or to share with child windows spawned from the parent window. 

```
// initialize a new multistate instance and call it "main"
const main = new Multistate({value1: 1, value2: 2})

// connect your multistate instance to localStorage
main.connectToLocalStorage({
    name: "main", // this is a required parameter
    providerWindow: "mainWindow",
    subscriberWindows: ["child", "grandchild"]
    removeChildrenOnUnload: true,
    clearStorageOnUnload: false,
    privateStatePaths: ["value1"]
})
```
For the second step in the above code example, we connect our multistate instance to our local storage, and set a number of parameters for how it will behave. Those parameters are explained in more detail in the table below, but one very important parameter to remember is `name`. You must provide a unique name in this field.

## Multiwindow Support Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| name | String (required) | null | A string that is unique from any other `localStorage` key name (including any other names set in other multistate instances). This will become the key name under which the state is stored in `localStorage`. | 
| initializeFromLocalStorage | Boolean | false | Specifies if the state should be loaded from the `localStorage` rather than with the default initialization values. Note that if the `localStorage` does not contain a reference to the state, default values will be loaded. Regardless of what value is set here, windows with names provided in the `subscriberWindows` parameter will initialize from localStorage. | 
| providerWindow | String | null | Specifies the `window.name` property of the parent window. If no value is given, it will default to the same string specified in the `name` option. | 
| subscriberWindows | [String] | Empty Array | An array of strings that has a comprehensive list of the names of the windows that may subscribe to the shared state through `localStorage`. These windows will automatically initialize from localStorage regardless of the value set in `initializeFromLocalStorage`| 
| removeChildrenOnUnload | Boolean | true | If true, will close all children windows spawned from the `windowManager.open` method. Note that if a child window spawns another window (grandchild), that window will also be closed if this parameter is set to true. |
| clearStorageOnUnload | Boolean | true | If true, when the `providerWindow` is closed, all associated state stored in `localStorage` will be removed. |
| privateStatePaths | [String or [String]] | Empty Array | Specifies state parameters of the provider window that will not be passed down to any spawned children or grandchildren. Elements in the array may be strings or arrays of strings. The latter options allows for you to specify a nested parameter as private while still passing parameters higher in the state structure. |

## Persisting with Local Storage

While many of the options that you set in `connectToLocalStorage` are aimed at providing functionality for sharing state between multiple windows, you can forgo many of them for clean and easy *persistance on page reload* functionality. If you set `initializeFromLocalStorage` to true, your main/provider window will load default state values from those specified in the local storage. If this is the desried functionality, make sure to also set `clearStorageOnUnload` to false, so the local storage persists if you reload the page. 

If there are some state values that you wish not to initialize from local storage, you can set them in the `privateStatePaths` parameter. Any value indicated in this parameter will not ever be saved to local storage. If you are initialize from a persisted local storage, and have private state values specified, those values will initialize to whatever you have set in your default state settings. 