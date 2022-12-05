fs = require('fs')
fs.readFile('./day4/input.txt', 'utf8', function (err, data) {
    const cleaningPairs = data.split(/\r\n/).map(line => line.split(',').map(assignment => assignment.split('-').map(number => +number)));

    // part 1 --------------------------------------------
    let duplicatePairs = 0;

    cleaningPairs.forEach(pair => {
        let assignment1start = pair[0][0];
        let assignment1end = pair[0][1];

        let assignment2start = pair[1][0];
        let assignment2end = pair[1][1];

        if (assignment1start <= assignment2start && assignment1end >= assignment2end) {
            duplicatePairs++;
        } else if (assignment2start <= assignment1start && assignment2end >= assignment1end) {
            duplicatePairs++;
        }
    });

    console.log(duplicatePairs);
    // ---------------------------------------------------

    // part 2 --------------------------------------------
    Number.prototype.inRange = function (a, b) {
        return this >= a && this <= b;
    };

    let overlappingPairs = 0;

    cleaningPairs.forEach(pair => {
        let assignment1start = pair[0][0];
        let assignment1end = pair[0][1];

        let assignment2start = pair[1][0];
        let assignment2end = pair[1][1];

        if (assignment1start.inRange(assignment2start, assignment2end)) {
            overlappingPairs++;
        } else if (assignment1end.inRange(assignment2start, assignment2end)) {
            overlappingPairs++;
        } else if (assignment2start.inRange(assignment1start, assignment1end)) {
            overlappingPairs++;
        } else if (assignment2end.inRange(assignment1start, assignment1end)) {
            overlappingPairs++;
        }
    });

    console.log(overlappingPairs);
    // ---------------------------------------------------
});