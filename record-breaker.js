exports.solve = function (testCase) {
    const { numElements, elements } = testCase
    let recordBreaks = 0
    let mostVisitorsToDate = 0
    for (let d = 0; d < numElements; d++) {
        const v = elements[d]
        const isFirstOrGtPrev = d === 0 || elements[d] > mostVisitorsToDate
        const isLastOrGtFollowing = d == numElements - 1 || elements[d] > elements[d+1]
        if (isFirstOrGtPrev && isLastOrGtFollowing) {
            recordBreaks++
        }
        mostVisitorsToDate = Math.max(mostVisitorsToDate, elements[d])
    }
    return { ...testCase, answer: recordBreaks }
}