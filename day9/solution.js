fs = require("fs");
fs.readFile('./day9/input.txt', 'utf8', function (err, data) {
    let moves = [];
    data.split(/\r\n/).forEach(inputLine => {
        moves.push(inputLine.split(" ").map(input => isNaN(+input) ? input : parseInt(input)));
    });

    // part 1 ----------------------------------------------------
    let headPos = {x: 0, y: 0};
    let tailPos = {x: 0, y: 0};
    let tailVisitedPositions = {};

    moves.forEach(move => {
        const direction = move[0];
        const distance = move[1];

        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case 'U':
                    headPos.y++;
                    break;
                case 'D':
                    headPos.y--;
                    break;
                case 'L':
                    headPos.x--;
                    break;
                case 'R':
                    headPos.x++;
                    break;
            }

            moveTail(headPos, tailPos);

            tailVisitedPositions["x" + tailPos.x + "y" + tailPos.y] = 1;
        }
    });

    console.log(Object.keys(tailVisitedPositions).length);
    // -----------------------------------------------------------

    // part 2 ----------------------------------------------------
    const numKnots = 10;
    const knots = [];
    tailVisitedPositions = {};
    for (let i = 0; i < numKnots; i++) {
        knots.push({x: 0, y: 0});
    }

    moves.forEach(move => {
        const direction = move[0];
        const distance = move[1];

        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case 'U':
                    knots[0].y++;
                    break;
                case 'D':
                    knots[0].y--;
                    break;
                case 'L':
                    knots[0].x--;
                    break;
                case 'R':
                    knots[0].x++;
                    break;
            }

            for (let i = 0; i < knots.length; i++) {
                while (calculateDistance(knots[i], knots[i + 1]) >= 2) {
                    moveTail(knots[i], knots[i + 1]);
                    tailVisitedPositions["x" + knots[numKnots - 1].x + "y" + knots[numKnots - 1].y] = 1;
                }
            }
        }
    });

    console.log(Object.keys(tailVisitedPositions).length);

    // -----------------------------------------------------------

    function moveTail(head, tail) {
        if (!tail) {
            return;
        }

        if (head.x >= tail.x + 2) {
            tail.x = head.x - 1;
            if (head.y > tail.y)
                tail.y++;
            else if (head.y < tail.y)
                tail.y--;
        } else if (head.x <= tail.x - 2) {
            tail.x = head.x + 1;
            if (head.y > tail.y)
                tail.y++;
            else if (head.y < tail.y)
                tail.y--;
        } else if (head.y >= tail.y + 2) {
            tail.y = head.y - 1;
            if (head.x > tail.x)
                tail.x++;
            else if (head.x < tail.x)
                tail.x--;
        } else if (head.y <= tail.y - 2) {
            tail.y = head.y + 1;
            if (head.x > tail.x)
                tail.x++;
            else if (head.x < tail.x)
                tail.x--;
        }
    }

    function calculateDistance(head, tail) {
        if (!tail) {
            return 0;
        }

        return Math.floor(Math.sqrt(Math.pow((tail.x - head.x), 2) + Math.pow((tail.y - head.y), 2)));
    }
});