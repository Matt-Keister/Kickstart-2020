exports.getCases = (numCases, lines) => {
    const cases = []
    let l = 1
    while (l < lines.length) {
        const firstLine = lines[l].split(" ").map(s => parseInt(s))
        const numRooms = firstLine[0]
        const numQueries =  firstLine[1]
        const doors = lines[l + 1].split(" ").map(s => parseInt(s))
        const queries = lines
            .slice(l + 2, l + 2 + numQueries)
            .map(line => line.split(" ")
            .map(s => parseInt(s)))
            .map((value, index) => ({start: value[0], numRoomsToPhoto: value[1]}))
        cases.push({ numRooms, numQueries, doors, queries })
        l = l + 2 + numQueries
    }
    return cases
}

exports.solve = function (testCase) {
    const { numRooms, numQueries, doors, queries } = testCase
    const answer = queries.map((value, index) => {
        const { start, numRoomsToPhoto } = value
        let currentRoom = start
        let doorsOpened = 0
        let door1 = start - 2, door2 = start - 1

        while (doorsOpened < numRoomsToPhoto - 1) {
            if (door1 < 0) {
                door2++
                currentRoom = door2 + 1
            } else if (door2 > doors.length - 1) {
                door1--
                currentRoom = door1 + 2
            } else if (doors[door1] < doors[door2]) {
                door1--
                currentRoom = door1 + 2
            } else {
                door2++
                currentRoom = door2 + 1
            }
            doorsOpened++
        }

        return currentRoom
    }).join(" ")
    return { ...testCase, answer }
}