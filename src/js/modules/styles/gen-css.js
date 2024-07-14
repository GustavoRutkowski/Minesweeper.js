const calcPercent = (percent, value) => (percent / 100) * value;

/*
    generateCSS(width, height, fontSize))

    @param {number} width - Squares on the X-Axis
    @param {number} height - Squares on the Y-Axis
    @param (number) fontSize - Default fontSize to Scale-Resizing
    @returns {HTMLStyleElement} - Style-Tag with custom CSS to component
*/
const generateCSS = (width, height, fontSize) => {
    const styles = document.createElement('style');

    styles.innerText = `
        @keyframes bomb-exploding {
            from { font-size: ${fontSize}px; }
            to { font-size: ${calcPercent(130, fontSize)}px; }
        }

        @keyframes explosion {
            0% { font-size: ${calcPercent(5, fontSize)}px; }
            95% { font-size: ${calcPercent(160, fontSize)}px; }
            100% { font-size: ${calcPercent(130, fontSize)}px; }
        }

        @keyframes seed-growing {
            from { font-size: ${calcPercent(5, fontSize)}px; }
            to { font-size: ${calcPercent(55, fontSize)}px; }
        }

        @keyframes flower-growing {
            from { font-size: ${calcPercent(60, fontSize)}px; }
            to { font-size: ${fontSize}px; }
        }

        #minesweeper {
            width: 100%;
            height: 0;
            padding-bottom: 20%;
            position: relative;
            display: grid;
            grid-template-columns: repeat(${width}, 1fr);
            grid-template-rows: repeat(${height}, 1fr);
        }

        #minesweeper .row { display: contents; }

        #minesweeper .row .square {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            position: relative;
            font-weight: bold;
            font-size: ${fontSize}px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        #minesweeper .row .square.dark { filter: brightness(0.75); }

        #minesweeper .row .square:hover { background-color: #bfe17d !important; }
        #minesweeper .row .square.marked:hover { background-color: #e8d2bc !important; }

        #minesweeper .row .square.bomb-exploding { animation: bomb-exploding 1s linear; }
        #minesweeper .row .square.explosion { animation: explosion 0.2s ease-in-out; }

        #minesweeper .row .square.seed-growing { animation: seed-growing 1s linear; }
        #minesweeper .row .square.flower-growing { animation: flower-growing 0.6s ease; }

        #minesweeper .row .square span {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #minesweeper .row:nth-child(odd) > .square:nth-child(odd),
        #minesweeper .row:nth-child(even) > .square:nth-child(even) {
            background-color: #aad751;
        }

        #minesweeper .row:nth-child(odd) > .square:nth-child(odd).marked,
        #minesweeper .row:nth-child(even) > .square:nth-child(even).marked {
            background-color: #e5c29f;
        }

        #minesweeper .row:nth-child(odd) > .square:nth-child(even),
        #minesweeper .row:nth-child(even) > .square:nth-child(odd) {
            background-color: #a2d149;
        }

        #minesweeper .row:nth-child(odd) > .square:nth-child(even).marked,
        #minesweeper .row:nth-child(even) > .square:nth-child(odd).marked {
            background-color: #d7b899;
        }

        /* Game-Over Screen */

        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        div:has(#gameover-screen) {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #gameover-screen {
            width: 80%;
            height: 100%;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: all 0.4ms;
        }

        #gameover-screen.hidden { display: none; }
        #gameover-screen.fade-in { animation: fade-in 0.5s ease-in-out; }

        #gameover-screen #screen,
        #gameover-screen button {
            width: 100%;
            border-radius: 5px;
            font-family: Arial, Helvetica, sans-serif;
            color: white;
            text-align: center;
        }

        #gameover-screen #screen {
            background-color: #4ac0fd;
            margin-bottom: 15px;
            font-size: 20pt;
        }

        #gameover-screen button {
            background-color: #4a752c;
            padding: 10px;
            border: none;
            box-sizing: border-box;
            font-size: 15pt;
            cursor: pointer;
        }
    `;

    return styles;
};

export default generateCSS;