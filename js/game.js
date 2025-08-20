let canvas;
let world;
let keyboard; // keyboard wird jetzt dynamisch instanziiert
let soundManager;

document.addEventListener('DOMContentLoaded', init);


/**
 * Initialisiert das Spiel.
 * Unterscheidet zwischen mobilen Geräten und Desktop-PCs.
 */
function init() {
    soundManager = SoundManager.getInstance();
    canvas = document.getElementById('canvas');

    // Bedingte Instanziierung der Keyboard-Klasse
    if (isMobileDevice()) {
        keyboard = new MobileKeyboard();
        // Zeigt das mobile Touch-Keyboard an (falls vorhanden)
        document.getElementById('touch-controls').style.display = 'flex';
    } else {
        keyboard = new Keyboard();
        // Versteckt das mobile Touch-Keyboard auf Desktops
        let touchControls = document.getElementById('touch-controls');
        if (touchControls) {
            touchControls.style.display = 'none';
        }
    }

    // Event-Listener für Mute und Pause
    document.getElementById('mute-button').addEventListener('click', toggleMuteSound);
    document.getElementById('pause-button').addEventListener('click', togglePauseGame);
}


/**
 * Überprüft, ob das Gerät ein mobiles Gerät ist.
 * @returns {boolean}
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


function toggleMuteSound() {
    let soundManager = SoundManager.getInstance();
    soundManager.toggleMute();

    let muteButton = document.getElementById('mute-button');
    if (soundManager.isMuted) {
        muteButton.src = 'img/unmute.png';
    } else {
        muteButton.src = 'img/mute.png';
    }
}


function togglePauseGame() {
    if (world) {
        if (world.isPaused) {
            world.resumeGame();
            document.getElementById('pause-button').src = 'img/pause.png';
        } else {
            world.pauseGame();
            document.getElementById('pause-button').src = 'img/play.png';
        }
    }
}


function startGame() {
    let soundManager = SoundManager.getInstance();
    soundManager.play('buttonClick', 1, 2);

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';

    // Buttons für Mute und Pause einblenden
    document.getElementById('mute-button').style.display = 'block';
    document.getElementById('pause-button').style.display = 'block';

    world = new World(canvas, keyboard);
}


function restartGame() {
    let soundManager = SoundManager.getInstance();
    soundManager.play('buttonClick', 1, 2);

    // Blende alle End-Screens aus
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('lose-screen').style.display = 'none';

    // Zeige das Canvas wieder an
    document.getElementById('canvas').style.display = 'block';

    // Buttons für Mute und Pause einblenden
    document.getElementById('mute-button').style.display = 'block';
    document.getElementById('pause-button').style.display = 'block';

    // Eine komplett neue World-Instanz erstellen, um das Spiel komplett zurückzusetzen
    world = new World(canvas, keyboard);
}


window.addEventListener('keydown', (e) => {
    if (world?.gameIsOver && (e.key === 'r' || e.key === 'Enter')) {
        restartGame();
    }
});

// Tastatureingaben für die Desktop-Steuerung
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