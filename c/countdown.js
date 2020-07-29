exports.getCases = (numCases, lines) => [...Array(numCases).keys()].map((value, index) => {
    const firstLine = lines[index * 2 + 1].split(" ").map(s => parseInt(s))
    return {
        n: firstLine[0],
        k: firstLine[1],
        A: lines[index * 2 + 2].split(" ").map(s => parseInt(s))
    }
})

exports.solve = function (testCase) {
    const { n, k, A } = testCase
    let numKCountdowns = 0
    console.log(n, k, A)

    const kCountdown = [...Array(k).keys()].map((value, index) => k - value)
    console.log(kCountdown)

    // check each element for k countdown starting points
    for (let i = 0; i < n; i++) {
        if (A[i] == k) {
            const isKCountdown = kCountdown.every((value, index) => {
                const result = A[i + index] == value 
                if (!result) {
                    i = i + index - 1
                }
                return result
            })
            numKCountdowns += isKCountdown ? 1 : 0
        }
    }

    return { ...testCase, answer: numKCountdowns }
}