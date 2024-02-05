import gameInfos from "./game-infos.js";

const getRandomOrderOfBombs = () => {
    let indicesBombas = [];
    
    gameInfos.minesweeperArray.forEach((e, i) => {
        if (e === '💣')
            indicesBombas.push(i);
    });
    
    for (let indiceAtual = indicesBombas.length - 1; indiceAtual > 0; indiceAtual--) {
        const indiceAleatorio = Math.floor(Math.random() * (indiceAtual + 1));
    
        [
            indicesBombas[indiceAtual],
            indicesBombas[indiceAleatorio],
        ] = [
            indicesBombas[indiceAleatorio],
            indicesBombas[indiceAtual],
        ];
    };

    return indicesBombas;
};

let explosionIntervalID;

const explodeInTimeInterval = (msInterval) => {
    let bombsIndexes = getRandomOrderOfBombs();

    let indexOfBomb = 0;
    
    explosionIntervalID = setInterval(() => {
        if (indexOfBomb >= bombsIndexes.length)
            clearInterval(explosionIntervalID);

        else {
            if (gameInfos.minesweeperSquares[bombsIndexes[indexOfBomb]].innerHTML === '') {
                const bombElement = gameInfos.minesweeperSquares[bombsIndexes[indexOfBomb]];
                bombElement.innerHTML = '💣';
                bombElement.classList.add('bomb-exploding');

                bombElement.addEventListener('animationend', () => {
                    bombElement.innerHTML = '💥';
                    bombElement.classList.remove('bomb-exploding');
                    bombElement.classList.add('explosion');
                });
            };

            indexOfBomb++;
        }
    }, msInterval);
};

const explodeBombs = () => explodeInTimeInterval(300);

let plantationsIntervalID;

const plantInTimeInterval = (msInterval) => {
    let bombsIndexes = getRandomOrderOfBombs();
    
    let indexOfFlower = 0;
        
    plantationsIntervalID = setInterval(() => {
        if (indexOfFlower >= bombsIndexes.length)
            clearInterval(plantationsIntervalID);
    
        else {
            const bombElement = gameInfos.minesweeperSquares[bombsIndexes[indexOfFlower]];
            bombElement.innerHTML = '🌱';
            bombElement.classList.add('seed-growing');
    
            const flowersList = ['🌹', '🌻', '🌼', '🌷', '🥀', '🌾'];
            const flowerSelected = Math.floor(Math.random() * flowersList.length);

            bombElement.addEventListener('animationend', () => {
                bombElement.innerHTML = flowersList[flowerSelected];
                bombElement.classList.remove('seed-growing');
                bombElement.classList.add('flower-growing');
            });
    
            indexOfFlower++;
        }
    }, msInterval);
};
    
const plantFlowers = () => plantInTimeInterval(300);

export { explosionIntervalID, plantationsIntervalID, explodeBombs, plantFlowers };
