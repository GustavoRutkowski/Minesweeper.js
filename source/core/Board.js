import randint from '../utils/randint.js';
import Cell from './Cell.js';
import { cell as CELL } from './constants.js';

class Board {
    #board;
    #initalized;

    #createBoard(width, height) {
        return Array.from({ length: height }, () =>
            Array.from({ length: width }, () => new Cell())
        );;
    }

    #initalize(safeX, safeY) {
        const point = (x,y) => `${x}:${y}`;
        // Garante que pelo menos uma área de 3x3 vai estar protegida
        const createdPoints = [
            point(safeX-1, safeY-1),
            point(safeX-1, safeY),
            point(safeX-1, safeY+1),
            point(safeX, safeY-1),
            point(safeX, safeY),
            point(safeX, safeY+1),
            point(safeX+1, safeY-1),
            point(safeX+1, safeY),
            point(safeX+1, safeY+1)
        ];

        // Add bombs:
        for (let i = 0; i < this.bombs; i++) {
            let x = null;
            let y = null;

            do {
                x = randint(0, this.height - 1); // random row
                y = randint(0, this.width - 1); // random column
            } while (createdPoints.includes(point(x,y)));

            // Replace with bomb:
            this.#board[x][y].set(CELL.BOMB);
            createdPoints.push(point(x,y));
        }

        this.#initalized = true;
        return this.#board;
    }

    constructor(width, height, bombs) {
        this.width = width;
        this.height = height;
        this.bombs = bombs;
        this.#board = this.#createBoard(width, height);
        this.#initalized = false;
    }

    // Getters:

    get() { return this.#board; }
    cell(x, y) { return this.#board[x][y]; }

    // Actions:

    reveal(x, y) {
        if (!this.#initalized) this.#initalize(x, y);

        // If is bomb, return.
        const cell = this.cell(x, y);
        const hitBomb = cell.isBomb();
        if (hitBomb) return cell;

        const nodes = [{ cell, position: [x,y] }];
        while (nodes.length > 0) {
            const node = nodes.pop();
            // Revela cada célula em profundidade:
            node.cell.reveal();
            node.cell.set(this.adjacentBombs(...node.position));

            if (node.cell.adjacent === 0) {
                const neighbors = this.neighbors(...node.position)
                    .filter(nb => !nb.cell.revealed && !nb.cell.isBomb());
                nodes.push(...neighbors)
            }
        }

        return cell;
    }

    flag(x, y) {
        const cell = this.cell(x, y);
        cell.flag(); // Inverte o sinal de flagged
        return cell;
    }

    // Neighbors:

    neighbors(x, y) {
        const increments = [-1, 0, +1]
        const neighbors = [];

        increments.forEach(incX => {
            if (x + incX < 0) return;
            if (x + incX > this.height - 1) return;

            increments.forEach(incY => {
                if (incX === 0 && incY === 0) return;
                if (y + incY < 0) return;
                if (y + incY > this.width - 1) return;

                const position = [x + incX, y + incY];
                neighbors.push({ cell: this.cell(...position), position });
            });
        });

        return neighbors;
    }

    adjacentBombs(x, y) {
        return this.neighbors(x, y).filter(({cell}) => cell.isBomb()).length;
    }

    allSafeCellsRevealed() {
        const safe = cell => cell.isSafe();
        const revealed = cell => cell.revealed;
        return this.#board.every(row => row.filter(safe).every(revealed));
    }
}


export default Board;
