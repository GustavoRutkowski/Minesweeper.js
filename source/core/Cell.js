import { cell } from './constants.js';

class Cell {
    constructor(value = cell.EMPTY) {
        this.revealed = false;
        this.flagged = false;
        this.adjacent = value;
    }

    clone() {
        const clone = Object.create(Cell.prototype);
        return Object.assign(clone, this);
    }

    set(value) { this.adjacent = value; }
    reveal() { this.revealed = true; }
    flag() { this.flagged = !this.flagged; }

    isSafe() { return this.adjacent !== cell.BOMB; }
    isBomb() { return !this.isSafe(); }
}

export default Cell;
