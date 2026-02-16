import Game from './core/Game.js';
import GameState from './state/GameState.js';
import BoardView from './view/BoardView.js';
import GameController from './controller/GameController.js';

const sheet = new CSSStyleSheet();
fetch(new URL('./MinesweeperGame.css', import.meta.url))
  .then(res => res.text())
  .then(css => sheet.replace(css));

class MinesweeperGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    connectedCallback() { this.build(); }

    build() {
        const width  = Number(this.getAttribute('width'));
        const height = Number(this.getAttribute('height'));
        const bombs  = Number(this.getAttribute('bombs'));

        const game = new Game(width, height, bombs);
        const state = new GameState();
        const view = new BoardView(this.shadowRoot);
        const controller = new GameController(game, state, view);
        
        state.set(game.serialize());
        // view.render(state.get());

        this.#addListeners(controller);
        this.#setupCSSVars(width, height);
    }

    #addListeners(controller) {
        addEventListener('cell-left-click', e => {
            controller.onCellLeftClick(e.detail.x, e.detail.y);
        });

        addEventListener('cell-right-click', e => {
            controller.onCellRightClick(e.detail.x, e.detail.y);
        });

        addEventListener('reset-game', () => {
            controller.resetGame()
        });
    }

    #setupCSSVars(width, height) {
        const square = this.shadowRoot.querySelectorAll('.square')[0];
        const squareSize = parseFloat(getComputedStyle(square).width) / width;

        const fontSize = squareSize * 0.43;

        this.style.setProperty('--board-width', width);
        this.style.setProperty('--board-height', height);
        this.style.setProperty('--cell-font-size', `${fontSize}px`);
    }
}

customElements.define('minesweeper-game', MinesweeperGame);
export default MinesweeperGame;
