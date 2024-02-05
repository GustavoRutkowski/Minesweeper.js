const generateMatrix = (height=11, width=6) => {
    const bombsCoords = [];

    for (let row = 0; row < height; row++) {
        bombsCoords.push([]);
    
        for (let column = 0; column < width; column++)
            bombsCoords[row].push(0);
    };

    return bombsCoords;
};

const addBombs = (matrix, height=11, width=6, bombs=10) => {
    for (let bomb = 0; bomb < bombs; bomb++) {
        let randomHeight;
        let randomWidth;

        do {
            randomHeight = Math.floor(Math.random() * height);

            randomWidth = Math.floor(Math.random() * width);
        } while (matrix?.[randomHeight]?.[randomWidth] === '💣');

        if (!matrix[randomHeight])
        matrix[randomHeight] = [];

        matrix[randomHeight][randomWidth] = '💣';
    };
};

const calculateBombsAround = (matrix, square, x, y) => {
    if (square !== '💣') {
        const adjacentSquares = {
            '↑': matrix?.[x-1]?.[y],
            '↓': matrix?.[x+1]?.[y],
            '→': matrix?.[x]?.[y+1],
            '←': matrix?.[x]?.[y-1],
            '↗': matrix?.[x-1]?.[y+1],
            '↘': matrix?.[x+1]?.[y+1],
            '↖': matrix?.[x-1]?.[y-1],
            '↙': matrix?.[x+1]?.[y-1],
        };

        const adjacentSquaresValues = Object.values(adjacentSquares);

        let numberOfBombsAround = 0;

        adjacentSquaresValues.forEach(e => {
            if (e === '💣')
                numberOfBombsAround++;
        });

        matrix[x][y] = numberOfBombsAround;
    };
};

const addSquares = (matrix) => {
    matrix.forEach((row, x) => {
        row.forEach((square, y) => {
            calculateBombsAround(matrix, square, x, y);
        }, matrix);
    });
};

export { generateMatrix, addBombs, addSquares };
