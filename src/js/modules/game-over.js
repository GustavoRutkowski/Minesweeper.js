import restartGame from "./restart-game.js";
import gameInfos from "./game-infos.js";
import { explodeBombs, plantFlowers } from "./bombs-flowers.js";

const checkWin = () => {
    let foundAnUnmarkedValue = false;

    gameInfos.minesweeperSquares.forEach((square, squareIndex) => {
        const squareValue = gameInfos.minesweeperArray[squareIndex];

        const squareWasNotMarked = !square.classList.contains('marked');

        if (squareValue != '💣' && squareWasNotMarked)
            foundAnUnmarkedValue = true;
    });

    return !foundAnUnmarkedValue;
};

const removeMinesweeperFocus = () => {
    gameInfos.minesweeperSquares.forEach(square => {
        square.classList.add('dark');
    });
};

const gameOver = (win=false) => {
    if (win) plantFlowers();
    else explodeBombs();

    restartGame();
    removeMinesweeperFocus();
};

export { gameOver, checkWin };
