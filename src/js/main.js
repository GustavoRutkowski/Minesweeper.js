import { generateMatrix, addBombs, addSquares } from "./modules/generate-minesweeper.js";
import gameInfos from "./modules/game-infos.js";
import toggleFlag from "./modules/flags.js";
import checkSquareValue from "./modules/check-square.js";

const generateMinesweeperProtectingPosition = (position) => {
    do {
        gameInfos.minesweeperMatrix = generateMatrix();

        addBombs(gameInfos.minesweeperMatrix);
        addSquares(gameInfos.minesweeperMatrix);

        gameInfos.minesweeperArray = gameInfos.minesweeperMatrix.flat();

        console.clear();
        console.table(gameInfos.minesweeperMatrix);
    } while (gameInfos.minesweeperArray[position] === '💣');
};

gameInfos.minesweeperSquares.forEach((square, index) => {
    square.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        toggleFlag(square);
    });

    square.addEventListener('click', (event) => {
        event.preventDefault();

        if (gameInfos.minesweeperArray === null)
            generateMinesweeperProtectingPosition(index);

        if (event.button === 0)
            checkSquareValue(gameInfos.minesweeperArray[index], square, index);
    });
});