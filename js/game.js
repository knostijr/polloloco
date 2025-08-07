let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    //world = new World(canvas, keyboard);

}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';

    let canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/*function restartGame() {
    location.reload(); // lädt die Seite neu → zurück zum Startscreen
}*/

function restartGame() {
    // Blende alle End-Screens aus
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('lose-screen').style.display = 'none';

    // Zeige das Canvas wieder an
    document.getElementById('canvas').style.display = 'block';

    // Initialisiere das Spiel neu
    init(); // Stellt sicher, dass alle Variablen zurückgesetzt sind
    startGame(); // Startet das Spiel
}

window.addEventListener('keydown', (e) => {
    if (world?.gameIsOver && (e.key === 'r' || e.key === 'Enter')) {
        restartGame();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

