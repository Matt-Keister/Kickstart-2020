exports.getCases = (numCases, lines) => [...Array(numCases).keys()].map((value, index) => {
    const firstLine = lines[index * 2 + 1].split(" ")
    return {
        numNodes: firstLine[0],
        amadeaStep: firstLine[1],
        bilvaStep: firstLine[2],
        tree: lines[index * 2 + 2].split(" ").map(s => parseInt(s))
    }
})

exports.solve = function (testCase) {
    const { numNodes, amadeaStep, bilvaStep, tree } = testCase

    // These notes not necessarily accurate or relevant
    // Find the depth of each tree node
    // Iterate each combination of starting points
    // Color nodes, calculate beauty and add to sum
    // Divide by the number of combinations
    //
    // I could, for each combination, divide the depth of the starting nodes by the step lengths to determine the number of colored nodes, 
    // but this would double count nodes colored by both  

    // Given their starting nodes, identify number of nodes receiving both colors.  Subtract from the total
    const step = (start, step) => {
        let walk = start
        while (step > 0) {
            if (walk === 1) {
                return 0
            }
            walk = tree[walk - 2]
            step--
        }
        return walk
    }
    
    let totalBeauty = 0
    for (let aStart = 1; aStart <= numNodes; aStart++) {
        for (let bStart = 1; bStart <= numNodes; bStart++) {
            const map = new Map()
            const starts = [aStart, bStart]
            starts.forEach((value, index) => {
                const color = [index === 0 ? 'a' : 'b']
                let walk = value
                while(walk >= 1) {
                    if (map.has(walk)) {
                        map.get(walk).push(color)
                    } else {
                        map.set(walk, [color])
                    }
                    walk = Math.max(0, step(walk, index === 0 ? amadeaStep : bilvaStep))
                }
            })
            //console.log(aStart, bStart, map)
            
            // Number of colored nodes
            totalBeauty += Array.from(map.keys()).filter((value, index) => value > 0).length
        }
    }
    const expectedBeauty = totalBeauty / Math.pow(numNodes, 2)

    return { ...testCase, answer: expectedBeauty }
}