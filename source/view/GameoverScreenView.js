import { status } from '../core/constants.js';

class GameoverScreenView {
    constructor(status) {
        this.gameStatus = status;
    }

    get() {
        if (this.gameStatus === status.PLAYING) return null;

        // div#gameover-screen
        const gameoverScreen = document.createElement('div');
        gameoverScreen.id = 'gameover-screen';

        const screen = document.createElement('div');
        screen.id = 'screen';

        const title = this.gameStatus === status.WON ? 'Very Good!' : 'Game Over!';
        screen.innerHTML = `<h2>${title}</h2>`;

        const resetBtn = document.createElement('button'); 
        resetBtn.textContent = '↻ Try Again';
        resetBtn.addEventListener('click', this.#onReset);       

        gameoverScreen.appendChild(screen);
        gameoverScreen.appendChild(resetBtn);
        gameoverScreen.classList.add('fade-in');
        return gameoverScreen;
    }

    #onReset() {
        dispatchEvent(new CustomEvent('reset-game', {
            bubbles: true,
            composed: true,
        }));
    }
}

export default GameoverScreenView;
