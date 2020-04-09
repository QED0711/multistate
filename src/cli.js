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
::::::::::::::::::
:: FILE WRITERS ::
::::::::::::::::::
*/

const writeProvider = (name, supportFiles) => {
    let supportImports = ""
    let sf;
    for(let sfKey of Object.keys(supportFiles)){
        sf = supportFiles[sfKey]
        if(sf) supportImports += `const ${sf} = require('./${sf}')\n`
    }
    
    // console.log(supportImports)

    const fileContents = `
const Multistate = require('multistate')

${supportImports}

${supportFiles.state ? `const ${name} = new Multistate(state)` : `const ${name} = new Multistate({})`}

${supportFiles.setters ? `${name}.addCustomSetters(${supportFiles.setters})`: ""}
${supportFiles.methods ? `${name}.addMethods(${supportFiles.methods})`: ""}
${supportFiles.reducers ? `${name}.addReducers(${supportFiles.reducers})`: ""}
${supportFiles.constants ? `${name}.addConstants(${supportFiles.constants})`: ""}

module.exports = {
    ${name}Context: ${name}.context,
    ${capName(name)}Provider: ${name}.createProvider()
}
    `
    // create state directory if it doesn't exist
    !fs.existsSync("./src/state/") && fs.mkdirSync("./src/state")

    // create/overwrite previous directory of named resource
    fs.mkdirSync(`./src/state/${name}`)

    // create provider file
    fs.writeFileSync(`./src/state/${name}/${name}Provider.js`, fileContents)
    console.log(`created ./src/state/${name}/${name}Provider.js`)
}


const writeSupportFiles = (name, files) => {
    
    
    let sf,
        fileContents

    for (let sfKey of Object.keys(files)){
        sf = files[sfKey]
        if(sf){
            fileContents = genSupportFileTemplate(sf, sfKey)
            fs.writeFileSync(`./src/state/${name}/${sf}.js`, fileContents)
            console.log(`created ./src/state/${name}/${sf}.js`)
        }
    }
}






/* 
:::::::::::::
:: HELPERS ::
:::::::::::::
*/
const prompt = (question, cb) => {
    return new Promise(resolve => {
        rl.question(question, (input) => {
            resolve(cb(input))
            rl.close()
        })
    })
}

const genSupportFileTemplate = (supportFile, fileType) => {
    return `
const ${supportFile} = {

    // your ${fileType} here...

}

module.exports = ${supportFile}
    `
}

const capName = (name) => {
    let newName =  name.split("")
    newName[0] = newName[0].toUpperCase()
    return newName.join("")
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
    rl.close()

    console.log("State Resource: ", name)

    // 2. find any flags or keyword arguments in the argument string
    let filesToMake = argParser()
    // console.log(filesToMake)

    // 3. write the main provider file
    writeProvider(name, filesToMake)

    // 4. write support files
    writeSupportFiles(name, filesToMake)

}

run()
