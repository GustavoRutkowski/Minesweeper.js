import Game from './core/Game.js';
import BoardView from './view/BoardView.js';
import GameController from './controller/GameController.js';

const sheet = new CSSStyleSheet();
fetch(new URL('./MinesweeperGame.css', import.meta.url))
  .then(res => res.text())
  .then(css => sheet.replace(css));

class MinesweeperGame extends HTMLElement {
    #view;
    #controller;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];

        this.#view = new BoardView(this.shadowRoot);
        this.#controller = new GameController(null, this.#view); // starts a controller with no game defined
    }

    // Getters

    get width() {
        const width = this.getAttribute('width');
        return width ? parseInt(width) : null;
    }

    get height() {
        const height = this.getAttribute('height');
        return height ? parseInt(height) : null;
    }
    
    get bombs() {
        const bombs = this.getAttribute('bombs');
        return bombs ? parseInt(bombs) : null;
    }

    get remainingFlags() {
        return this.#controller.remainingFlags || this.bombs;
    }

    // Setters

    set width(width) {
        if (!width) throw new Error('width must be a number');
        this.setAttribute('width', width);
        this.#validateAttributes();
        this.#sync();
    }

    set height(height) {
        if (!height) throw new Error('height must be a number');
        this.setAttribute('height', height);
        this.#validateAttributes();
        this.#sync();
    }

    set bombs(bombs) {
        if (!bombs) throw new Error('bombs must be a number');
        this.setAttribute('bombs', bombs);
        this.#validateAttributes();
        this.#sync();
    }

    // LIFE CYCLE:

    /** @inherited */
    connectedCallback() {
        this.#controller.render();
        this.#listenEvents();
        this.#setupCSSVars(this.width, this.height);
    }

    /** It sync the component, making adjustments after any attribute is changed. */
    #sync() {
        if (!this.width || !this.height || !this.bombs) return;
        this.#controller.game = new Game(this.width, this.height, this.bombs);
        this.#setupCSSVars(this.width, this.height);
    }

    // ATTRIBUTE MANAGERS:

    /** @inherited */
    static observedAttributes = ['width', 'height', 'bombs']; // * Add flag-counter & time-counter after...

    /** When an attribute is changed, it validates those attributes and sync them with the component.
     * @inherited
     */
    attributeChangedCallback(_, oldValue, newValue) {
        if (oldValue === newValue) return;
        this.#validateAttributes();
        this.#sync();
    }

    /** Validates the observed attributes, ensuring the consistency of the component. */
    #validateAttributes() {
        MinesweeperGame.observedAttributes.forEach(attrName => {
            const attr = Number(this.getAttribute(attrName)) || null;
            if (Number.isNaN(attr)) throw new TypeError(`${attrName} must be a number.`);
            if (attr <= 0) throw new RangeError(`${attrName} must be greater than 0.`);

            if (attrName !== 'bombs') return;
            if (attr < (this.width * this.height)) return;
            throw new RangeError('bombs cannot exceed the size of the game board.');
        });
    }

    // EVENT BRIDGE & CSS VARS:

    /** Add event-listeners for: cell-left-click, cell-right-click, and reset-game events. */
    #listenEvents() {
        addEventListener('cell-left-click', e => {
            this.#controller.onCellLeftClick(e.detail.x, e.detail.y);
        });

        addEventListener('cell-right-click', e => {
            this.#controller.onCellRightClick(e.detail.x, e.detail.y);
        });

        addEventListener('reset-game', () => this.#controller.resetGame());
    }

    /** Set important CSS style variables for proper component rendering.
     * Define the width and height of the board in the stylesheets (essential for grid-layout consistency).
     * Defines the cell's font size based on the number of pixels in the cells.
     */
    #setupCSSVars(width, height) {
        const square = this.shadowRoot.querySelectorAll('.square')[0];
        const squareSize = parseFloat(getComputedStyle(square).width) / width;

        const fontSize = squareSize * 0.43; // Font-size is 43% of the cell square.

        this.style.setProperty('--board-width', width);
        this.style.setProperty('--board-height', height);
        this.style.setProperty('--cell-font-size', `${fontSize}px`);
    }
}

customElements.define('minesweeper-game', MinesweeperGame);
export default MinesweeperGame;
