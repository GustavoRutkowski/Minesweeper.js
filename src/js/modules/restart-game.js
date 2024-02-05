import gameInfos from "./game-infos.js";
import { explosionIntervalID, plantationsIntervalID } from "./bombs-flowers.js";

const revealScreen = () => {
    gameInfos.gameOverScreen.classList.remove('hidden');
    gameInfos.gameOverScreen.classList.add('fade-in');
};

const hideScreen = () => {
    gameInfos.gameOverScreen.classList.add('hidden');
    gameInfos.gameOverScreen.classList.remove('fade-in');
};

const resetSquares = () => {
    gameInfos.minesweeperSquares.forEach(e => {
        e.classList.remove(...e.classList);

        e.classList.add('square');
        e.innerHTML = '';
    });
};

const resetMinesweeperArray = () => {
    gameInfos.minesweeperMatrix = null;
    gameInfos.minesweeperArray = null;
};

const resetInfos = () => {
    clearInterval(explosionIntervalID);
    clearInterval(plantationsIntervalID);

    resetSquares();
    resetMinesweeperArray();

    console.clear();
    console.table(gameInfos.minesweeperMatrix);

    gameInfos.flagCounter = 10;
    gameInfos.flagCounterElement.innerHTML = gameInfos.flagCounter;

    hideScreen();
};

const restartGame = () => {
    revealScreen();

    const restartButton = gameInfos.gameOverScreen.querySelector('button');

    restartButton.addEventListener('click', resetInfos);
};

export default restartGame;
