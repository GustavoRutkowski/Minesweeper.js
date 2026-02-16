class GameState extends EventTarget {
    #state;

    get() { return this.clone().#state; }

    clone() {
        const state = new GameState();
    
        const original = this.#state;
        const board = original.board
            .map(row => row.map(cell => cell.clone()));

        const stateObject = { ...original, board };
        state.set(stateObject);
        return state;
    }

    // Toda vez que o Estado do Jogo muda, dispara um evento.
    set(state) {
        this.#state = state;
        this.dispatchEvent(new Event('change'));
    }
}

export default GameState;
