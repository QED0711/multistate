const fs = require("fs");

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Get Arguments 
const argString = process.argv.slice(2).join(" ")

// const nameSearch = /\s?\w+\s?/g
const nameSearch = /--name=\w+/
const chainSearch = /\-[scmr]+/g
const keywordSearch = /(state|setters|constants|methods|reducers)=\w+/g

/* 
::::::::::::::::
:: ARG PARSER ::
::::::::::::::::
*/
const argParser = () => {

    const FILES = {
        state: null,
        setters: null,
        methods: null,
        reducers: null,
        constants: null,
    }

    const FLAG_MAP = {
        s: "state",
        c: "setters",
        m: "methods",
        r: "reducers",
        k: "constants"
    }

    // 1. Search for flags
    let foundFlags = argString.match(chainSearch)

    foundFlags = foundFlags ? 
        foundFlags    
            .map(f => f.replace(/-/g, ""))
            .join("")
            .split("")
            .map(f => FLAG_MAP[f])
        :
        null;

    // 2. search for keyword arguments
    const keywords = argString.match(keywordSearch)

    const foundKeywords = []
    const foundKeywordValues = {}

    keywords.forEach(kwAssignment => {
        const [kw, val] = kwAssignment.split('=')
        foundKeywords.push(kw)
        foundKeywordValues[kw] = val
    })

    // 3. combine flags and keyword arguments
    const allFlags = Array.from(new Set([...foundFlags, ...foundKeywords]))

    // 4. apply filenames (user specified from keyword arguments or default from flags)
    allFlags.forEach(f => FILES[f] = f ? foundKeywordValues[f] || f : null)

    // 5. return results
    // return the FILES object if any of the files are non-nulls
    for (let key of Object.keys(FILES)) {
        if (FILES[key]) return FILES
    }

    // return null if no arguments passed
    return null

}

/* 
::::::::::::
:: PROMPT ::
::::::::::::
*/
const prompt = (question, cb) => {
    return new Promise(resolve => {
        rl.question(question, (input) => {
            resolve(cb(input))
            rl.close()
        })
    })
}


/* 
:::::::::::::::::::::
:: SCRIPT EXECUTOR ::
:::::::::::::::::::::
*/
const run = async () => {
    
    // 1. get the name of the state resource from the user (either from the --name flag or from prompt)
    let name = argString.match(nameSearch)

    name = name ? name[0].split("=")[1] : await prompt("What would you like to name this state resource: ", name => name)

    console.log("NAME:", name)

    // 2. find any flags or keyword arguments in the argument string
    let filesToMake = argParser()
    console.log(filesToMake)

    console.log("END")

    rl.close()
}

run()


// console.log("after readline")