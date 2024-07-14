import gameInfos from "../game-infos.js";
import toggleFlag from "../flags.js";
import checkSquareValue from "../check-square.js";
import validatePosition from "../validate-position.js";

/*
    addInputs() - Add Events in All Squares
*/
function addInputs() {
    gameInfos.minesweeperSquares.forEach((square, index) => {
        square.addEventListener('contextmenu', (event) => {
            event.preventDefault();
    
            toggleFlag(square);
        });
    
        square.addEventListener('click', (event) => {
            event.preventDefault();
    
            if (gameInfos.minesweeperArray === null)
                validatePosition(index);
    
            if (event.button === 0)
                checkSquareValue(gameInfos.minesweeperArray[index], square, index);
        });
    });
};

export default addInputs;