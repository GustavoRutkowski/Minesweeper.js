import Board from './Board.js';
import { status } from './constants.js';

// Trabalha a camada do jogo
// O único papel da camada de jogo fornecer os dados do jogo serialized
// Ele também tem métodos ponte de Board (reveal, flag)

class Game {
    #width;
    #height;
    #bombs;

    constructor(width, height, bombs) {
        this.board = new Board(width, height, bombs);
        this.status = status.PLAYING;
        this.#width = width;
        this.#height = height;
        this.#bombs = bombs;
    }

    reset() {
        this.board = new Board(this.#width, this.#height, this.#bombs);
        this.status = status.PLAYING;
    }

    reveal(x, y) {
        if (this.status !== status.PLAYING) return;
        const cell = this.board.reveal(x, y);

        if (cell.isBomb()) this.status = status.LOST;
        if (this.board.allSafeCellsRevealed()) this.status = status.WON;

        return cell;
    }

    flag(x, y) {
        if (this.status !== status.PLAYING) return;
        return this.board.flag(x, y);
    }

    // Retorna o jogo no formato renderizável pelo State
    serialize() {
        const flagsPlaced = this.board.get().flat()
            .reduce((acc, cell) => acc + cell.flagged, 0)

        return {
            status: this.status, // playing | won | lost
            width: this.#width,
            height: this.#height,
            bombs: this.#bombs,
            flags: flagsPlaced,
            board: this.board.get(), // Cell[][]
        };
    }
}

export default Game;
