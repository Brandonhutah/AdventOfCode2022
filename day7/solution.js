fs = require("fs");
fs.readFile('./input.txt', 'utf8', function (err, data) {
    const directory = {};

    // build directory --------------------------------------------------------------------
    let currentDir = directory;
    data.split(/\r\n/).forEach(inputLine => {
        if (!inputLine) {
            return;
        }

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
                                    parentDirectory: currentDir,
                                    name: inputParts[2]
                                };
                            }

                            currentDir = currentDir["directories"][inputParts[2]];
                            break;
                    }
                    break;
            }
        } else { // line is console output
            switch (inputParts[0]) {
                case "dir":
                    if (!currentDir["directories"]) {
                        currentDir["directories"] = {};
                    }
                    if (!currentDir["directories"][inputParts[1]]) {
                        currentDir["directories"][inputParts[1]] = {
                            parentDirectory: currentDir,
                            name: inputParts[1]
                        };
                    }

                    break;
                default:
                    if (!currentDir["files"]) {
                        currentDir["files"] = {};
                    }

                    currentDir["files"][inputParts[1]] = parseInt(inputParts[0]);
            }
        }
    });
    // -------------------------------------------------------------------------------------

    // part 1 ------------------------------------------------------------------------------
    const directoriesInSizeLimit = [];

    getDirectorySize(directory);

    console.log(directoriesInSizeLimit.reduce((curr, next) => curr += next, 0));
    // -------------------------------------------------------------------------------------

    // part 2 ------------------------------------------------------------------------------
    const totalDeviceSpace = 70000000;
    const usedDeviceSpace = directory.directories["/"].size;
    const neededDeviceSpace = 30000000 - (totalDeviceSpace - usedDeviceSpace)

    console.log(findSmallestDirectoryGreaterThanSize(directory, neededDeviceSpace, directory).size);

    // -------------------------------------------------------------------------------------

    function getDirectorySize(directory) {
        let directorySize = 0;

        if (directory.directories) {
            Object.values(directory.directories).forEach(subDir => directorySize += getDirectorySize(subDir));
        }

        if (directory.files) {
            Object.values(directory.files).forEach(val => directorySize += val);
        }

        if (directorySize <= 100000) {
            directoriesInSizeLimit.push(directorySize);
        }

        directory["size"] = directorySize;
        return directorySize;
    }

    function findSmallestDirectoryGreaterThanSize(directory, minimumSize, smallestDir) {
        if (directory.directories) {
            Object.values(directory.directories).forEach(subDir => smallestDir = findSmallestDirectoryGreaterThanSize(subDir, minimumSize, smallestDir));
        }

        if (directory.size > minimumSize && directory.size < smallestDir.size) {
            return directory;
        }

        return smallestDir;
    }
});