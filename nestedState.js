

const getRoutes = (obj) => {
    
    const paths = []

    const traverse = (element, currentPath=[]) => {
        // base cases
        if(typeof element !== "object" || Array.isArray(element) || !element){
            paths.push(currentPath);
            return;
        }

        for(let key of Object.keys(element)){
            // traverse(element[key], key, [...currentPath, {key:key, value: element[key]}])
            traverse(element[key], [...currentPath, key])
        }


    }

    traverse(obj)
    return paths;
}


const reassignValue = (obj, path, newValue) => {
    
    let copy = {...obj}; 
    let currentPath = copy;   
    let key;
    for(let i = 0; i < path.length; i++){
        key = path[i];

        if(i < path.length - 1){ // if not on the last key in the provided path
            currentPath[key] = {...currentPath[key]}
        } else { // if on last key, reassign value to the new value
            currentPath[key] = newValue
        }

        currentPath = currentPath[key]
    }

    return copy
}


const cleanState = (state, privatePaths) => {

    /* 
    takes a state object and list of private paths as inputs, and returns the state with the private paths removed. 
    */

    const cleaned = {...state} // make a copy of state
    let np, nestedPath;
    for (let path of privatePaths){
        if(Array.isArray(path)){ // if provided with a nested path, traverse down and delete final entry
            nestedPath = cleaned;
            for (let i = 0; i < path.length; i++){
                np = path[i];    
                try{
                    if(i === path.length - 1){  
                        delete nestedPath[np]
                    } else {
                        nestedPath = nestedPath[np]
                    }
                } catch(err){ // if a provided key along the path does not exist, inform user
                    console.error(`Provided key, ["${np}"] does not exist\n\nFull error message reads:\n\n`, err)
                    break;
                }
            }
        } else {
            delete cleaned[path];
        }
    }

    return cleaned;

}



// =======================================================================================

const test = {
    layer1_a: {
        layer2_aa:{
            layer3_aaa: "some value",
            layer3_aab: {
                layer4_aaba: [1,2,3]
            }
        },
        layer2_ab: [1,2,3]
    },
    layer1_b: {
        layer1_ba: "some value"
    }
}

const test2 = {
    user: {
        id: null,
        username: "something here",
        phone: 1234567890,
        email: "user@test.com"
    },
    comment: {
        id: 1,
        content: {
            time: "some time here",
            text: "this is the comment"
        }
    }
}

console.time("cleanState")
console.log(cleanState(test2, [
    ["comment", "blah", "content", "text"],
    ["user", "username"]
]))
console.timeEnd("cleanState")


// getRoutes(test2).forEach((path, i) => {
//     console.log(`${i}. ${path}`)
// })

// console.log("\n\n", test2, "\n\n")

// console.log(
//     reassignValue(test2, getRoutes(test2)[5], "NEW TIME")
// )