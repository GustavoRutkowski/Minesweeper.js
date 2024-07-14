const validateType = (key, keyName=key, type) => {
    if (typeof key !== type) {
        console.error(`${keyName} is not a ${type}`);

        throw TypeError(`${keyName} is not a ${type}`);
    };
};

/*
    generateMatriz(height=11, width=6) - Creates a Matrix Filled with Zeros

    @param (number) width - Squares on the X-Axis
    @param {number} height - Squares on the Y-Axis
    @returns {[][]} msMatrix - Minesweeper Empty Matrix
*/
function generateMatrix(width=6, height=11) {
    validateType(width, 'width', 'number');
    validateType(height, 'height', 'number');

    const msMatrix = [];

    for (let row = 0; row < height; row++) {
        msMatrix.push([]);
    
        for (let column = 0; column < width; column++)
            msMatrix[row].push(0);
    };

    return msMatrix;
};

const validateMatrix = (matrix) => {
    if (!matrix) {
        console.error('matrix is ​​not defined');

        throw new TypeError('matrix is ​​not defined');
    };

    if (!Array.isArray(matrix)) {
        console.error('matrix is not Array');

        throw new TypeError('matrix is not Array');
    };
};

/*
    addBombs(matrix, bombs=10) - Add Bombs to an Empty Matrix

    @param {[][]} matrix - Empty Minesweeper Matrix
    @param {number} bombs - Number os bombs in game
    @returns {[][]} matrix - Minesweeper Matrix with bombs
*/
function addBombs(matrix, bombs=10) {
    validateMatrix(matrix);

    const height = matrix.length;
    const width = matrix[0].length;
    const numberOfCells = height * width;
    const minNumberOfFreeCells = 2;

    if (bombs > numberOfCells - minNumberOfFreeCells) {
        console.error('the number of bombs exceeds the expected limit');

        throw new RangeError('the number of bombs exceeds the expected limit');
    };

    let bombCounter = 0;

    while (bombCounter < bombs) {
        let randomHeight = Math.floor(Math.random() * height);
        let randomWidth = Math.floor(Math.random() * width);

        if (matrix[randomHeight][randomWidth] !== '💣') {
            matrix[randomHeight][randomWidth] = '💣';

            bombCounter++;
        };
    };

    return matrix;
};

/*
    calculateBombsAround(matrix, cell, x, y) - Calculates the Number of Bombs Around a Square

    @param {[][]} matrix - Minesweeper Matrix with Bombs
    @param {number} x - Matrix X-Point to be Calculed
    @param {number} y - Matrix Y-Point to be Calculed
*/
const calculateBombsAround = (matrix, x, y) => {
    validateMatrix(matrix);
    validateType(x, 'x', 'number');
    validateType(y, 'y', 'number');

    const cell = matrix[x][y];

    if (cell === '💣') return;

    // Calculate the Values ​​of Neighboring Squares
    const adjacentCells = {
        '↑': matrix?.[x-1]?.[y],
        '↓': matrix?.[x+1]?.[y],
        '→': matrix?.[x]?.[y+1],
        '←': matrix?.[x]?.[y-1],
        '↗': matrix?.[x-1]?.[y+1],
        '↘': matrix?.[x+1]?.[y+1],
        '↖': matrix?.[x-1]?.[y-1],
        '↙': matrix?.[x+1]?.[y-1],
    };

    const neighbors = Object.values(adjacentCells);

    let numberOfBombsAround = 0;

    neighbors.forEach(neighbor => {
        if (neighbor === '💣')
            numberOfBombsAround++;
    });

    matrix[x][y] = numberOfBombsAround;
};

/*
    addCellsValues(matrix) - Runs through the Matrix Calculating the Number of Bombs in each Square

    @param {[][]} matrix - Minesweeper Matrix with Bombs
    @returns {[][]} matrix - Minesweeper Complete Matrix
*/
function addCellsValues(matrix) {
    validateMatrix(matrix);

    matrix.forEach((row, x) => {
        row.forEach((square, y) => {
            calculateBombsAround(matrix, x, y);
        }, matrix);
    });

    return matrix;
};

export { generateMatrix, addBombs, addCellsValues };
