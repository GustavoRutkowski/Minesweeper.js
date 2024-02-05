import gameInfos from "./game-infos.js";
import { gameOver, checkWin } from "./game-over.js";

const getNeighboringSquaresIndexes = (index) => {
    const offsets = [-1, 0, 1];
    const neighbors = [];

    offsets.forEach((offsetRow) => {
        offsets.forEach((offsetCol) => {
            if (offsetRow === 0 && offsetCol === 0) return;

            const neighborRow = Math.floor(index / 6) + offsetRow;
            const neighborCol = index % 6 + offsetCol;

            if (neighborRow >= 0 && neighborRow < 11 && neighborCol >= 0 && neighborCol < 6)
                neighbors.push(neighborRow * 6 + neighborCol);
        });
    });

    return neighbors;
};

const checkSquareValue = (value, square, index) => {
    if (square.innerText === '🚩') {
        square.innerText = '';
        
        gameInfos.flagCounter++
        gameInfos.flagCounterElement.innerHTML = gameInfos.flagCounter;
    } else if (value === '💣')
        gameOver(false);

    else {
        const valueColors = {
            '1': '#1976d2',
            '2': '#3c8f3f',
            '3': '#d32f2f',
            '4': '#7b1fa2',
            '5': '#ff8f00',
            '6': '#0097a7',
            '7': '#424242',
            '8': '#a39c92',
        };

        const valorSquare = String(value);

        square.classList.add('marked');
    
        if (valorSquare != '0') {
            square.innerText = valorSquare;

            square.style.color = valueColors[valorSquare];
        } else {
            const neighborsSquaresIndexes = getNeighboringSquaresIndexes(index);

            neighborsSquaresIndexes.forEach(neighbor => {
                const neighborSquare = gameInfos.minesweeperSquares[neighbor];
                const neighborValue = gameInfos.minesweeperArray[neighbor];

                if (!neighborSquare.classList.contains('marked'))
                    checkSquareValue(neighborValue, neighborSquare, neighbor);
            });
        };

        if (checkWin())
            gameOver(true);
    };
};

export default checkSquareValue;
