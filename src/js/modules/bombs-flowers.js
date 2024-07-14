import gameInfos from "./game-infos.js";

/*
    getRandomOrderOfBombs() - Returns an Array with the Indexes of each Bomb in random order
    @returns {[]} bombsIndexes - Indexes of Bombs in random order
*/
const getRandomOrderOfBombs = () => {
    const bombsIndexes = [];
    
    gameInfos.minesweeperArray.forEach((square, index) => {
        if (square === '💣') bombsIndexes.push(index);
    });
    
    for (let i = bombsIndexes.length-1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // Shuffles the bombsIndexes vector
        [
            bombsIndexes[i],
            bombsIndexes[randomIndex]
        ] = [
            bombsIndexes[randomIndex],
            bombsIndexes[i]
        ];
    };

    return bombsIndexes;
};

let bombsIndexes;

let explosionIntervalID;

/*
    renderResult(index, win=true) - Renders Bombs or Flowers Depending on the "win" Value

    @param {number} index - Index of Bomb in Matrix
    @param {boolean} win - Used to Know if we Need to Display Flowers or Bombs
*/
const renderResult = (index, win=true) => {
    const flowersList = ['🌹', '🌻', '🌼', '🌷', '🥀', '🌾'];
    const randomFlowerIndex = Math.floor(Math.random() * flowersList.length);
    const flowerSelected = flowersList[randomFlowerIndex]

    const resultEmojisStates = win ? ['🌱', flowerSelected] : ['💣', '💥'];

    const squareIndex = bombsIndexes[index];
    const squareIsEmpty = gameInfos.minesweeperSquares[squareIndex].innerHTML === '';

    if (!win && !squareIsEmpty) return;

    const bombElement = gameInfos.minesweeperSquares[squareIndex];
    bombElement.innerHTML = `<span>${resultEmojisStates[0]}</span>`;
    bombElement.classList.add('bomb-exploding');

    bombElement.addEventListener('animationend', () => {
        bombElement.innerHTML = `<span>${resultEmojisStates[1]}</span>`;
        bombElement.classList.remove('bomb-exploding');
        bombElement.classList.add('explosion');
    });
};

function explodeBombs(msInterval=1500) {
    bombsIndexes = getRandomOrderOfBombs();
    let indexOfBomb = 0;
    
    explosionIntervalID = setInterval(() => {
        if (indexOfBomb >= bombsIndexes.length) {
            clearInterval(explosionIntervalID);
        } else {
            renderResult(indexOfBomb, false);

            indexOfBomb++;
        }
    }, msInterval / bombsIndexes.length);
};

let plantationsIntervalID;

function plantFlowers(msInterval=2500) {
    bombsIndexes = getRandomOrderOfBombs();
    let indexOfFlower = 0;
        
    plantationsIntervalID = setInterval(() => {
        if (indexOfFlower >= bombsIndexes.length) {
            clearInterval(plantationsIntervalID);
        } else {
            renderResult(indexOfFlower);
    
            indexOfFlower++;
        }
    }, msInterval / bombsIndexes.length);
};

export { explosionIntervalID, plantationsIntervalID, explodeBombs, plantFlowers };
