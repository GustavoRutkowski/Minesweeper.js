import gameInfos from "./game-infos.js";
import { generateMatrix, addBombs, addCellsValues } from "./logical/gen-ms.js";

function validatePosition(position) {
    do {
        gameInfos.minesweeperMatrix = generateMatrix(gameInfos.msWidth, gameInfos.msHeight);

        addBombs(gameInfos.minesweeperMatrix, gameInfos.msBombs);
        addCellsValues(gameInfos.minesweeperMatrix);

        gameInfos.minesweeperArray = gameInfos.minesweeperMatrix.flat();

        if (gameInfos.msCheats) {
            console.clear();
            console.table(gameInfos.minesweeperMatrix);
        };
    } while (gameInfos.minesweeperArray[position] !== 0);
};

export default validatePosition;