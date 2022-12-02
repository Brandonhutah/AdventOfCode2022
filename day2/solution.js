fs = require('fs')
fs.readFile('./day2/input.txt', 'utf8', function (err, data) {
    const rounds = data.split(/\r\n/);

    // part 1 --------------------------------------------
    // A, X = Rock
    // B, Y = Paper
    // C, Z = Scissors
    const winningCombos = ['A Y', 'B Z', 'C X'];
    const tieCombos = ['A X', 'B Y', 'C Z'];
    let score = 0;

    rounds.forEach(round => {
        let roundScore = 0;

        if (winningCombos.includes(round)) {
            roundScore += 6;
        } else if (tieCombos.includes(round)) {
            roundScore += 3;
        }

        switch (round[2]) {
            case 'X':
                roundScore += 1;
                break;
            case 'Y':
                roundScore += 2;
                break;
            case 'Z':
                roundScore += 3;
                break;
        }

        score += roundScore;
    });

    console.log(score);
    // ---------------------------------------------------

    // part 2 --------------------------------------------
    // A = Rock
    // B = Paper
    // C = Scissors
    // X = Lose
    // Y = Draw
    // Z = Win
    score = 0;
    const comboMap = {
        'A': {winPoints: 2, losePoints: 3, drawPoints: 1},
        'B': {winPoints: 3, losePoints: 1, drawPoints: 2},
        'C': {winPoints: 1, losePoints: 2, drawPoints: 3}
    };

    rounds.forEach(round => {
        let roundScore = 0;
        const [opponentsMove, outcome] = round.split(' ');

        switch (outcome) {
            case 'X':
                roundScore += comboMap[opponentsMove].losePoints;
                break;
            case 'Y':
                roundScore += 3 + comboMap[opponentsMove].drawPoints;
                break;
            case 'Z':
                roundScore += 6 + comboMap[opponentsMove].winPoints;
                break;
        }

        score += roundScore;
    });

    console.log(score);
    // ---------------------------------------------------
});