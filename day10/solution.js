fs = require("fs");
fs.readFile('./day10/input.txt', 'utf8', function (err, data) {
    let instructions = [];
    data.split(/\r\n/).forEach(inputLine => {
        instructions.push(inputLine.split(" ").map(input => isNaN(+input) ? input : parseInt(input)));
    });

    // part 1 ----------------------------------------------------
    let currentCycle = 1;
    let registerValue = 1;
    let registerSums = 0;
    let registersToGrab = [20, 60, 100, 140, 180, 220];

    instructions.forEach(instruction => {
        let instructionCycles = 0;

        switch (instruction[0]) {
            case "noop":
                instructionCycles = 1;
                break;
            case "addx":
                instructionCycles = 2;
                break;
        }

        while (instructionCycles > 0) {
            instructionCycles--;

            if (registersToGrab.includes(currentCycle)) {
                registerSums += registerValue * currentCycle;
            }

            if (instructionCycles === 0 && instruction[1]) {
                registerValue += instruction[1];
            }

            currentCycle++;
        }
    });

    console.log(registerSums);
    // -----------------------------------------------------------

    // part 2 ----------------------------------------------------
    currentCycle = 1;
    registerValue = 1;
    let currentRowOutput = "";

    console.log(instructions.length);

    instructions.forEach(instruction => {
        let instructionCycles = 0;

        switch (instruction[0]) {
            case "noop":
                instructionCycles = 1;
                break;
            case "addx":
                instructionCycles = 2;
                break;
        }

        while (instructionCycles > 0) {
            instructionCycles--;

            const pixelBeingDrawn = (currentCycle % 40) - 1;

            if (pixelBeingDrawn >= registerValue - 1 && pixelBeingDrawn <= registerValue + 1) {
                currentRowOutput += "#";
            } else {
                currentRowOutput += ".";
            }

            if (currentRowOutput.length === 40) {
                console.log(currentRowOutput);
                currentRowOutput = "";
            }

            if (instructionCycles === 0 && instruction[1]) {
                registerValue += instruction[1];
            }

            currentCycle++;
        }
    });
    // -----------------------------------------------------------
});