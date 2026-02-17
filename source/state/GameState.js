class GameState extends EventTarget {
    #state;

    get() { return this.clone().#state; }

    get remainingFlags() {
        return this.#state.bombs - this.#state.flags;
    }

    // Toda vez que o Estado do Jogo muda, dispara um evento.
    set(state) {
        this.#state = state;
        this.dispatchEvent(new Event('change'));
    }

    clone() {
        const state = new GameState();
    
        const original = this.#state;
        const board = original.board
            .map(row => row.map(cell => cell.clone()));

        const stateObject = { ...original, board };
        state.set(stateObject);
        return state;
    }
}

export default GameState;
