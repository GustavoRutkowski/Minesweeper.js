import generateCSS from "./modules/styles/gen-css.js";
import addInputs from "./modules/inputs/add-inputs.js";
import gameInfos from "./modules/game-infos.js";

class Minesweeper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    };

    #setGameInfo(key, value) {
        gameInfos[key] = value;
    };

    #getGameInfo(key) {
        return gameInfos[key];
    };

    #validateNumberOfBombs() {
        const minimumFreeSquares = 2;
    
        const squaresQuantity = this.width * this.height;
        const bombsQuantity = this.bombs;
        const numberOfFreeSquares = squaresQuantity - bombsQuantity;
    
        if (numberOfFreeSquares < minimumFreeSquares) {
            console.error("Insufficient free squares for the game to be valid.");

            throw new Error("Game configuration is invalid.");
        };
    };

    // Generate Minesweeper HTML

    #generateSquare() {
        const square = document.createElement('div');
        square.classList.add('square');

        return square;
    };

    #generateRow() {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let i = 1; i <= this.width; i++) {
            const square = this.#generateSquare();

            row.appendChild(square);
        };

        return row;
    };

    #generateMinesweeper() {
        const minesweeper = document.createElement('div')
        minesweeper.id = 'minesweeper';

        for (let i = 1; i <= this.height; i++) {
            const row = this.#generateRow();

            minesweeper.appendChild(row);
        };

        return minesweeper;
    };

    // Generate Game-Over Screen HTML

    #generateScreen() {
        const screen = document.createElement('div');
        screen.id = 'screen';
        screen.innerHTML = '<h2>Game Over!</h2>';

        return screen;
    };

    #generateButton() {
        const button = document.createElement('button');
        button.innerText = '↻ Try Again';

        return button;
    };

    #generateGameOverScreen() {
        const gameOverScreen = document.createElement('div');
        gameOverScreen.id = 'gameover-screen';
        gameOverScreen.classList.add('hidden');

        const screen = this.#generateScreen();
        const button = this.#generateButton();

        gameOverScreen.appendChild(screen);
        gameOverScreen.appendChild(button);

        return gameOverScreen;
    };

    // Generate HTML

    #generateHTML() {
        const HTML = document.createElement('div');

        const minesweeper = this.#generateMinesweeper();
        const gameOverScreen = this.#generateGameOverScreen();

        HTML.appendChild(minesweeper);
        HTML.appendChild(gameOverScreen);

        return HTML;
    };

    // Component Part

    connectedCallback() {
        this.width = parseInt(this.getAttribute('width')) || 6;
        this.height = parseInt(this.getAttribute('height')) || 11;
        this.bombs = parseInt(this.getAttribute('bombs')) || 10;
        this.cheats = Boolean(this.getAttribute('cheats')) || false;

        this.#validateNumberOfBombs();
        this.#setGameInfo('msWidth', this.width);
        this.#setGameInfo('msHeight', this.height);
        this.#setGameInfo('msBombs', this.bombs);
        this.#setGameInfo('msCheats', this.cheats);
        this.#setGameInfo('defaultFlags', this.bombs);
        this.#setGameInfo('flagCounter', this.#getGameInfo('defaultFlags'));

        if (this.#getGameInfo('flagCounterElement'))
            this.#getGameInfo('flagCounterElement').innerHTML = this.#getGameInfo('flagCounter');

        this.#build();
    };

    #build() {
        const HTML = this.#generateHTML();
        this.shadowRoot.appendChild(HTML);

        if (!this.#getGameInfo('gameOverScreen'))
            this.#setGameInfo('gameOverScreen', this.shadowRoot.querySelector('div #gameover-screen'));

        this.#setGameInfo('minesweeperSquares', this.shadowRoot.querySelectorAll('.square'));

        const square = this.#getGameInfo('minesweeperSquares')[0];
        const squareSizeInPixels = parseFloat(window.getComputedStyle(square).width) / this.width;

        const fontSize = squareSizeInPixels * 0.43;

        const CSS = generateCSS(this.width, this.height, fontSize);
        this.shadowRoot.appendChild(CSS);
    
        addInputs();
    };

    setFlagCounter(element) {
        if (!element instanceof HTMLElement) {
            console.error('element is not a HTMLElement');

            throw new TypeError('element is not a HTMLElement');
        };

        if (!document.body.contains(element)) {
            console.error('element does not exist in HTML');

            throw new Error('element does not exist in HTML');
        };

        this.#setGameInfo('flagCounterElement', element);
        this.#getGameInfo('flagCounterElement').textContent = this.#getGameInfo('flagCounter');
    };
};

customElements.define('minesweeper-game', Minesweeper);

export default Minesweeper;
