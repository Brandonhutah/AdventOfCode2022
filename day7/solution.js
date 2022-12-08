fs = require("fs");
fs.readFile('./day7/input.txt', 'utf8', function (err, data) {
    const directory = {};

    // build directory --------------------------------------------------------------------
    let currentDir = directory;
    data.split(/\r\n/).forEach(inputLine => {
        const inputParts = inputLine.split(" ");
        if (inputParts[0] === "$") { // line is a command
            switch (inputParts[1]) {
                case "cd":
                    switch (inputParts[2]) {
                        case "..":
                            currentDir = currentDir["parentDirectory"]
                            break;
                        default:
                            if (!currentDir["directories"]) {
                                currentDir["directories"] = {};
                            }
                            if (!currentDir["directories"][inputParts[2]]) {
                                currentDir["directories"][inputParts[2]] = {
                                    parentDirectory: currentDir
                                };
                            }

                            currentDir = currentDir["directories"][inputParts[2]];
                            break;
                    }
                    break;
                case "ls":
                    break;
            }
        } else { // line is console output

        }
    });
    // -------------------------------------------------------------------------------------
});