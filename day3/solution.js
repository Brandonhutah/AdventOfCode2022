fs = require('fs')
fs.readFile('./day3/input.txt', 'utf8', function (err, data) {
    const ruckSacks = data.split(/\r\n/);

    // part 1 --------------------------------------------
    let priorityTotal = 0;

    ruckSacks.forEach(items => {
        const compartment1 = items.slice(0, items.length / 2);
        const compartment2 = items.slice(items.length / 2, items.length);
        let commonChar = "";

        for (let i = 0; i < compartment1.length; i++) {
            if (compartment2.indexOf(compartment1[i]) !== -1) {
                commonChar = compartment1[i];
                break;
            }
        }

        priorityTotal += getItemPriority(commonChar);
    });

    console.log(priorityTotal);
    // ---------------------------------------------------

    // part 2 --------------------------------------------
    priorityTotal = 0;
    for (let i = 0; i < ruckSacks.length; i += 3) {
        let commonChar = "";
        const elfGroup = ruckSacks.slice(i, i + 3);

        for (let j = 0; j < elfGroup[0].length; j++) {
            if (elfGroup[1].indexOf(elfGroup[0][j]) !== -1 && elfGroup[2].indexOf(elfGroup[0][j]) !== -1) {
                commonChar = elfGroup[0][j];
                break;
            }
        }

        priorityTotal += getItemPriority(commonChar);
    }

    console.log(priorityTotal);

    // ---------------------------------------------------

    function getItemPriority(item) {
        if (item.charCodeAt(0) >= 97) { // character is lowercase
            return item.charCodeAt(0) - 96;
        } else { // character is uppercase
            return item.charCodeAt(0) - 38;
        }
    }
});