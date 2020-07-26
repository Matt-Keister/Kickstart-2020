const rb = require('./record-breaker');
const ap = require('./alien-piano')
const tb = require('./tree-beauty')

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = []

rl.on('line', (input) => {
    lines.push(input)
});

rl.on('close', () => {
    const numCases = parseInt(lines[0])
    
    const cases = tb.getCases(numCases, lines)

    const solvedCases = cases.map((value, index) => tb.solve(value))

    solvedCases.forEach((value, index) => {
        console.log(`Case #${index + 1}: ${value.answer}`)
    })
})