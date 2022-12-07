fs = require("fs");
fs.readFile('./day6/input.txt', 'utf8', function (err, data) {

    // part 1 ------------------------------------------
    console.log(findCharactersUntilFirstXUniqueCharacters(data, 4));
    // -------------------------------------------------

    // part 2 ------------------------------------------
    console.log(findCharactersUntilFirstXUniqueCharacters(data, 14));
    // -------------------------------------------------

    function findCharactersUntilFirstXUniqueCharacters(data, length) {
        for (let i = length; i < data.length; i++) {
            const markerMap = {};
            data.substring(i - length, i).split("").map(char => markerMap[char] = 1);

            if (Object.keys(markerMap).length === length) {
                return i;
            }
        }
    }
});