fs = require('fs')
fs.readFile('./day5/input.txt', 'utf8', function (err, data) {
    const stacks = [[], [], [], [], [], [], [], [], []];
    const operations = []; // will contain sub arrays each containing 3 numbers, the quantity of crates to move, the stack to take from, and the stack to add to
    let operationLines = false;

    // parse input file -------------------------------------------------------------------------
    data.split(/\r\n/).forEach(inputLine => {
        if (inputLine.trim() === "") {
            operationLines = true;
        } else if (!operationLines) { // line is from the initial crate setup
            if (!/^\d+$/.test(inputLine.replaceAll(" ", ""))) { // line is not the stack ids
                for (let i = 0; i < inputLine.length; i += 4) {
                    const crate = inputLine.substring(i, i + 3).replace(/[^a-zA-Z]/g, "");
                    if (crate) {
                        stacks[Math.floor(i / 4)].push(crate);
                    }
                }
            }
        } else { // line is a crane operation
            const operationNums = inputLine.replace(/[a-zA-Z]/g, "").trim().split("  ");
            operations.push([parseInt(operationNums[0]), parseInt(operationNums[1]) - 1, parseInt(operationNums[2]) - 1]);
        }
    });

    // after parsing, stacks of crates need to be reversed
    stacks.forEach(stack => stack.reverse());
    // ---------------------------------------------------------------------------------------------

    // part 1 --------------------------------------------
    // *** uncomment to run part 1 properly *** //
    // operations.forEach(operation => {
    //     for (let i = 0; i < operation[0]; i++) {
    //         stacks[operation[2]].push(stacks[operation[1]].pop());
    //     }
    // });
    //
    // let part1Solution = stacks.reduce((crates, stack) => crates += stack[stack.length - 1], "");
    //
    // console.log(part1Solution);
    // ---------------------------------------------------

    // part 2 --------------------------------------------
    operations.forEach(operation => {
        stacks[operation[2]] = [...stacks[operation[2]], ...stacks[operation[1]].slice(-1 * operation[0])];
        stacks[operation[1]].splice(stacks[operation[1]].length - operation[0], operation[0]);
    });

    let part2Solution = stacks.reduce((crates, stack) => crates += stack[stack.length - 1], "");

    console.log(part2Solution);
    // ---------------------------------------------------
});