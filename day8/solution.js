fs = require("fs");
fs.readFile('./day8/input.txt', 'utf8', function (err, data) {
    let grid = [];
    data.split(/\r\n/).forEach(inputLine => {
        grid.push(inputLine.split(""));
    });

    // part 1 ----------------------------------------------------
    let visibleTrees = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let visibleUp = true;
            let visibleDown = true;
            let visibleLeft = true;
            let visibleRight = true;
            // check up
            for (let up = i - 1; up >= 0; up--) {
                if (grid[up][j] >= grid[i][j]) {
                    visibleUp = false;
                    break;
                }
            }
            // check down
            if (!visibleUp) {
                for (let down = i + 1; down < grid.length; down++) {
                    if (grid[down][j] >= grid[i][j]) {
                        visibleDown = false;
                        break;
                    }
                }
            }
            // check left
            if (!visibleUp && !visibleDown) {
                for (let left = j - 1; left >= 0; left--) {
                    if (grid[i][left] >= grid[i][j]) {
                        visibleLeft = false;
                        break;
                    }
                }
            }
            // check right
            if (!visibleUp && !visibleDown && !visibleLeft) {
                for (let right = j + 1; right < grid[i].length; right++) {
                    if (grid[i][right] >= grid[i][j]) {
                        visibleRight = false;
                        break;
                    }
                }
            }

            if (visibleUp || visibleDown || visibleLeft || visibleRight) {
                visibleTrees++;
            }
        }
    }

    console.log(visibleTrees);
    // -----------------------------------------------------------

    // part 2 ----------------------------------------------------
    let bestScenicScore = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let visibleUp = 0;
            let visibleDown = 0;
            let visibleLeft = 0;
            let visibleRight = 0;
            // check up
            for (let up = i - 1; up >= 0; up--) {
                visibleUp++;
                if (grid[up][j] >= grid[i][j]) {
                    break;
                }
            }
            // check down
            for (let down = i + 1; down < grid.length; down++) {
                visibleDown++;
                if (grid[down][j] >= grid[i][j]) {
                    break;
                }
            }
            // check left
            for (let left = j - 1; left >= 0; left--) {
                visibleLeft++;
                if (grid[i][left] >= grid[i][j]) {
                    break;
                }
            }
            // check right
            for (let right = j + 1; right < grid[i].length; right++) {
                visibleRight++;
                if (grid[i][right] >= grid[i][j]) {
                    break;
                }
            }

            const treeScore = visibleUp * visibleDown * visibleLeft * visibleRight;

            bestScenicScore = Math.max(bestScenicScore, treeScore);
        }
    }

    console.log(bestScenicScore);
    // -----------------------------------------------------------
});