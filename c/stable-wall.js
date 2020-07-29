exports.getCases = (numCases, lines) => {
    const cases = []
    let line = 1
    while(cases.length < numCases) {
        const firstLine = lines[line].split(" ").map(s => parseInt(s))
        const R = firstLine[0], C = firstLine[1]
        const rows = [...Array(R).keys()].map((value, index) => lines[line + value + 1].split(""))
        cases.push({
            R, C, rows
        })
        line = line + R + 1
    }
    return cases
}

const isPartOfCycle = (node, graph, visited, recStack) => {
    const children = graph.get(node)
    
    if (recStack.get(node)) {
        return true
    }

    if (visited.get(node)) {
        return false
    }

    recStack.set(node, true)
    visited.set(node, true)

    const result = children ? children.some((value, index) => isPartOfCycle(value, graph, visited, recStack)) : false
    recStack.set(node, false)

    return result
}

const isCyclicGraph = (graph) => {
    const visited = new Map(), recStack = new Map()

    const itr = graph.keys()
    let node = itr.next()
    while(!node.done) {
        if (isPartOfCycle(node.value, graph, visited, recStack)) { return true }
        node = itr.next()
    }
    return false
}

const addChildren = (node, graph, visited, result) => {
    if (visited.get(node)) {
        return
    }
    visited.set(node, true)
    const children = graph.get(node) || []
    children.forEach((value, index) => addChildren(value, graph, visited, result))
    result.push(node)
}

const getDepthOrderedChildren = (graph) => {
    const result = []
    const visited = new Map()

    const itr = graph.keys()
    let node = itr.next()
    while(!node.done) {
        addChildren(node.value, graph, visited, result)
        node = itr.next()
    }
    return result.join("")
}

exports.solve = function (testCase) {
    const { R, C, rows} = testCase
    console.log(rows)
    // create a directed graph where each node represents a polyomino and has an edge pointed at any polyomino that supports it
    // you can use a map data structure to represent this graph
    const graph = new Map()
    // bottom row is always supported
    for (let row=0; row < R - 1; row++) {
        for (let col = 0; col < C; col++) {
            const pLabel = rows[row][col]
            const suppLabel = rows[row + 1][col]
            if (pLabel != suppLabel) {
                if (graph.has(pLabel)) {
                    const nodes = graph.get(pLabel)
                    if (!nodes.includes(suppLabel)) {
                        nodes.push(suppLabel)
                    }
                } else {
                    graph.set(pLabel, [suppLabel])
                }
            }
        }
    }
    console.log(graph)

    let answer

    // check the graph for cycles
    // if cycles exist, the wall is not stable, output -1
    if (isCyclicGraph(graph)) { answer = -1 }

    // if they do not exist, the wall is stable
    // output the node labels, ordering them so that a node comes before any of the nodes to which its edges point 
    else {
        answer = getDepthOrderedChildren(graph)
    }
    
    return { ...testCase, answer}
}