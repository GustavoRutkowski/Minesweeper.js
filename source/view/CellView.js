import randint from '../utils/randint.js';

const FLOWERS = ['🌹', '🌻', '🌼', '🌷', '🥀', '🌾'];
const choice = list => list[randint(0, list.length-1)];

class CellView {
    #cell;
    #element;

    constructor(cell, position) {
        this.#cell = cell;
        this.position = position;
    }

    get cell() { return this.#cell; }

    get() {
        const square = document.createElement('div');
        square.classList.add('square');

        // Flagged
        if (!this.cell.revealed && this.cell.flagged) square.textContent = '🚩';

        // Hidden
        if (!this.cell.revealed) {
            square.addEventListener('click', this.#leftClick);
            square.addEventListener('contextmenu', this.#rightClick);

            this.#element = square;
            return square;
        }
        // Revealed
        square.classList.add('marked');
        const value = this.cell.adjacent;
        if (value > 0) square.textContent = value;

        if (this.cell.adjacent > 0) {
            const colorClass = `a${this.cell.adjacent}`;
            square.classList.add(colorClass);
        }

        this.#element = square;
        return this.#element;
    }

    showBomb() {
        return new Promise(resolve => {
            this.#element.textContent = '💣';

            const onAnimationEnd = () => {
                this.#element.removeEventListener('animationend', onAnimationEnd);
                // Troca para explosão:
                this.#element.textContent = '💥';
                this.#element.classList.add('explosion');

                resolve();
            };

            this.#element.addEventListener('animationend', onAnimationEnd, { once: true });
            this.#element.classList.add('bomb-exploding'); // Inicia animação
        });
    }

    showFlower() {
        return new Promise(resolve => {
            this.#element.textContent = '🌱';

            const onAnimationEnd = () => {
                this.#element.removeEventListener('animationend', onAnimationEnd);
                // Troca para flor:
                this.#element.textContent = choice(FLOWERS); // Escolhe uma flor aleatória
                this.#element.classList.add('flower-growing');

                resolve();
            };

            this.#element.addEventListener('animationend', onAnimationEnd, { once: true });
            this.#element.classList.add('seed-growing'); // Inicia animação
        });
    }

    // Events:

    #leftClick = () => {
        const [x,y] = this.position;

        dispatchEvent(new CustomEvent('cell-left-click', {
            bubbles: true,
            composed: true,
            detail: { x, y }
        }));
    }

    #rightClick = e => {
        e.preventDefault();
        const [x,y] = this.position;

        dispatchEvent(new CustomEvent('cell-right-click', {
            bubbles: true,
            composed: true,
            detail: { x, y }
        }));
    }
}

export default CellView;
