import { status } from '../core/constants.js';
import GameState from '../state/GameState.js';

class GameController {
    #game;
    #state;
    #view;

    constructor(game, view) {
        this.#game = game || null;
        this.#state = new GameState();
        this.#view = view;
        // Render the next State:
        this.#state.addEventListener('change', () => {
            this.#view.render(this.#state.get());
        });
    }

    get remainingFlags() {
        return this.#state.remainingFlags;
    }

    set game(game) {
        this.#game = game;
        this.render();
    }

    render() {
        this.#state.set(this.#game.serialize());
    }

    resetGame() {
        this.#game.reset();
        this.render();
    }

    onCellLeftClick(x, y) {
        if (this.#state.get().status !== status.PLAYING) return;
        this.#game.reveal(x, y);
        this.render();
    }

    onCellRightClick(x, y) {
        if (this.#state.get().status !== status.PLAYING) return;
        this.#game.flag(x, y);
        this.render();
    }
}

export default GameController;
