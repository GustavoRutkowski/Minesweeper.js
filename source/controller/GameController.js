import { status } from '../core/constants.js';

class GameController {
    #state;

    constructor(game, state, view) {
        this.game = game;
        this.#state = state;
        this.view = view;
        
        // Render the next State:
        this.#state.addEventListener('change', () => {
            this.view.render(this.#state.get());
        });
    }

    resetGame() {
        this.game.reset();
        this.#state.set(this.game.serialize());
    }

    onCellLeftClick(x, y) {
        if (this.#state.get().status !== status.PLAYING) return;
        this.game.reveal(x, y);
        this.#state.set(this.game.serialize());
    }

    onCellRightClick(x, y) {
        if (this.#state.get().status !== status.PLAYING) return;
        this.game.flag(x, y);
        this.#state.set(this.game.serialize());
    }
}

export default GameController;
