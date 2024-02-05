import gameInfos from "./game-infos.js";

const toggleFlag = (square) => {
    if (!square.classList.contains('marked')) {
        if (square.innerText === '🚩') {
            square.innerText = '';
            square.classList.remove('flag');
    
            gameInfos.flagCounter++;
            gameInfos.flagCounterElement.innerHTML = gameInfos.flagCounter;
        } else if (square.innerText === '' && gameInfos.flagCounter > 0) {
            square.innerText = '🚩';
            square.classList.add('flag');
    
            gameInfos.flagCounter--;
            gameInfos.flagCounterElement.innerHTML = gameInfos.flagCounter;
        };
    };
};

export default toggleFlag;