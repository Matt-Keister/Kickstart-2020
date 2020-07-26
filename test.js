const readline = require('readline');
const rb = require('./record-breaker');
const ap = require('./alien-piano')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numCases
let thisCase = {}
const cases = []

rl.on('line', (input) => {
    if (!numCases) {
        numCases = parseInt(input)
    } else {
        if (!thisCase.numElements) {
            thisCase.numElements = parseInt(input)
        } else {
            thisCase.elements = input.split(" ").map(s => parseInt(s))
            cases.push(thisCase)
            thisCase = {}
        }
    }
});

rl.on('close', () => {
    const solvedCases = cases.map((value, index) => ap.solve(value))

    solvedCases.forEach((value, index) => {
        console.log(`Case #${index + 1}: ${value.answer}`)
    })
})