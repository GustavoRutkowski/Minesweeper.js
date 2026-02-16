import randint from '../utils/randint.js';
import { status } from '../core/constants.js';
import CellView from './CellView.js';
import GameoverScreenView from './GameoverScreenView.js';
import wait from '../utils/wait.js';

class BoardView {
    constructor(root) {
        this.root = root;
    }

    // Render State in UI
    render(state) {
        this.root.innerHTML = '';

        const minesweeperView = document.createElement('div');
        minesweeperView.id = 'minesweeper';
        if (state.status !== status.PLAYING) minesweeperView.classList.add('dark');

        // Board
        const cells = this.#renderBoard(minesweeperView, state.board);
        this.root.appendChild(minesweeperView);

        if (state.status === status.LOST) this.#displayBombs(cells); // Bombs
        if (state.status === status.WON) this.#displayFlowers(cells); // Flowers

        // Game-over Screen
        const gameoverScreen = new GameoverScreenView(state.status).get();
        if (gameoverScreen) this.root.appendChild(gameoverScreen);
    }

    #renderBoard(view, board) {
        const cellViews = new Map();
        const key = (x,y) => `${x}:${y}`;

        board.forEach((row, x) => {
            const rowView = document.createElement('div');
            rowView.classList.add('row');
            
            row.forEach((cell, y) => {
                const cellView = new CellView(cell, [x,y]);
                cellViews.set(key(x,y), cellView);
                rowView.appendChild(cellView.get());
            });

            view.appendChild(rowView);
        });

        return cellViews;
    }

    async #displayBombs(cellViews) {
        const bombs = this.#getBombCells(cellViews);

        const [first, ...remaining] = bombs;
        this.#shuffle(remaining)
        
        const shuffled = [first, ...remaining];

        const TOTAL_TIME = 2500; // 2.5 segundos
        const EXPLOSION_TIME = TOTAL_TIME / bombs.length;

        for (const view of shuffled) {
            view.showBomb();
            await wait(EXPLOSION_TIME);
        }
    }

    async #displayFlowers(cellViews) {
        const bombs = this.#getBombCells(cellViews);
        this.#shuffle(bombs);

        const TOTAL_TIME = 2500; // 2.5 segundos
        const EXPLOSION_TIME = TOTAL_TIME / bombs.length;

        for (const view of bombs) {
            view.showFlower();
            await wait(EXPLOSION_TIME);
        }
    }

    // Embaralha o array utilizando o algoritmo Fisher–Yates
    #shuffle(list) {
        for (let i = list.length - 1; i > 0; i--) {
            const randomIndex = randint(0, i);

            let temp = list[randomIndex];
            list[randomIndex] = list[i];
            list[i] = temp;
        }
    }

    #getBombCells(cellViews) {
        const bombs = [];
        cellViews.forEach(view => {
            if (view.cell.isBomb()) bombs.push(view);
        });
        return bombs;
    }
}

export default BoardView;
