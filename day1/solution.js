fs = require('fs')
fs.readFile('./day1/input.txt', 'utf8', function (err, data) {
    const foodItemsByElf = data.split(/\r\n\s*\r\n/).map(elf => elf.split('\r\n').map(itemCalories => parseInt(itemCalories)));

    // part 1 --------------------------------------------
    let maxCalories = 0;

    foodItemsByElf.forEach(elf => {
        let elfCalories = addArrayElements(elf);
        maxCalories = Math.max(elfCalories, maxCalories);
    })

    console.log(maxCalories);
    // ---------------------------------------------------

    // part 2 --------------------------------------------
    let topMaxCalories = [0, 0, 0];

    foodItemsByElf.forEach(elf => {
        let elfCalories = addArrayElements(elf);

        if (elfCalories > topMaxCalories[0]) {
            topMaxCalories.splice(0, 0, elfCalories);
        } else if (elfCalories > topMaxCalories[1]) {
            topMaxCalories.splice(1, 0, elfCalories);
        } else if (elfCalories > topMaxCalories[2]) {
            topMaxCalories.splice(2, 0, elfCalories);
        }

        topMaxCalories = topMaxCalories.slice(0, 3);
    });

    console.log(addArrayElements(topMaxCalories));

    // ---------------------------------------------------

    function addArrayElements(array) {
        return array.reduce((total, element) => total + element, 0);
    }
});