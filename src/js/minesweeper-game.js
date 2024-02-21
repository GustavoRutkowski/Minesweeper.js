import generateCSS from "./modules/generate-css.js";

import { generateMatrix, addBombs, addSquares } from "./modules/generate-minesweeper.js";
import gameInfos from "./modules/game-infos.js";
import toggleFlag from "./modules/flags.js";
import checkSquareValue from "./modules/check-square.js";
import { gameOver } from "./modules/game-over.js";

class Minesweeper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    };

    connectedCallback() {
        this.width = parseInt(this.getAttribute('width'));
        gameInfos.msWidth = this.width;

        this.height = parseInt(this.getAttribute('height'));
        gameInfos.msHeight = this.height;

        this.bombs = parseInt(this.getAttribute('bombs'));
        gameInfos.flagCounter = this.bombs;

        if (gameInfos.flagCounterElement)
            gameInfos.flagCounterElement.innerHTML = gameInfos.flagCounter;

        this.build();
    };

    build() {
        const HTML = this.generateHTML();
        this.shadowRoot.appendChild(HTML);

        if (!gameInfos.gameOverScreen)
            gameInfos.gameOverScreen = this.shadowRoot.querySelector('div #gameover-screen');

        gameInfos.minesweeperSquares = this.shadowRoot.querySelectorAll('.square');

        const square = gameInfos.minesweeperSquares[0];
        const squareSizeInPixels = parseFloat(window.getComputedStyle(square).width) / this.width;

        const fontSize = squareSizeInPixels * 0.43;

        const CSS = generateCSS(this.width, this.height, fontSize);
        this.shadowRoot.appendChild(CSS);
    
        this.executeMinesweeperAction();
    };
    

    // Generate Minesweeper HTML

    generateSquare() {
        const square = document.createElement('div');
        square.classList.add('square');

        return square;
    };

    generateRow() {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let i = 1; i <= this.width; i++) {
            const square = this.generateSquare();

            row.appendChild(square);
        };

        return row;
    };

    generateMinesweeper() {
        const minesweeper = document.createElement('div')
        minesweeper.id = 'minesweeper';

        for (let i = 1; i <= this.height; i++) {
            const row = this.generateRow();

            minesweeper.appendChild(row);
        };

        return minesweeper;
    };

    // Generate Game-Over Screen HTML

    generateScreen() {
        const screen = document.createElement('div');
        screen.id = 'screen';
        screen.innerHTML = '<h2>Game Over!</h2>';

        return screen;
    };

    generateButton() {
        const button = document.createElement('button');
        button.innerText = '↻ Try Again';

        return button;
    };

    generateGameOverScreen() {
        const gameOverScreen = document.createElement('div');
        gameOverScreen.id = 'gameover-screen';
        gameOverScreen.classList.add('hidden');

        const screen = this.generateScreen();
        const button = this.generateButton();

        gameOverScreen.appendChild(screen);
        gameOverScreen.appendChild(button);

        return gameOverScreen;
    };

    // Generate HTML

    generateHTML() {
        const HTML = document.createElement('div');

        const minesweeper = this.generateMinesweeper();
        const gameOverScreen = this.generateGameOverScreen();

        HTML.appendChild(minesweeper);
        HTML.appendChild(gameOverScreen);

        return HTML;
    };

    // Flags Counter

    setFlagCounter(element) {
        if (!element instanceof HTMLElement) {
            console.error('element is not a HTMLElement');

            throw new TypeError('element is not a HTMLElement');
        } else {
            if (!document.body.contains(element)) {
                console.error('element does not exist in HTML');

                throw new Error('element does not exist in HTML');
            };
        };

        gameInfos.flagCounterElement = element;

        gameInfos.flagCounterElement.textContent = gameInfos.flagCounter;
    };

    // Set Minesweeper Actions

    protectInitialPosition(position) {
        do {
            gameInfos.minesweeperMatrix = generateMatrix(this.height, this.width);
    
            addBombs(gameInfos.minesweeperMatrix, this.height, this.width, this.bombs);
            addSquares(gameInfos.minesweeperMatrix);
    
            gameInfos.minesweeperArray = gameInfos.minesweeperMatrix.flat();
    
            console.clear();
            console.table(gameInfos.minesweeperMatrix);
        } while (gameInfos.minesweeperArray[position] === '💣');
    };

    executeMinesweeperAction() {
        gameInfos.minesweeperSquares.forEach((square, index) => {
            square.addEventListener('contextmenu', (event) => {
                event.preventDefault();
        
                toggleFlag(square);
            });
        
            square.addEventListener('click', (event) => {
                event.preventDefault();
        
                if (gameInfos.minesweeperArray === null)
                    this.protectInitialPosition(index);
        
                if (event.button === 0)
                    checkSquareValue(gameInfos.minesweeperArray[index], square, index);
            });
        });
    };
};

customElements.define('minesweeper-game', Minesweeper);
