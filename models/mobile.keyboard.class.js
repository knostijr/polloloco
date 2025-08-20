class MobileKeyboard extends Keyboard {
    constructor() {
        super();
        this.bindTouchEvents();
    }

    bindTouchEvents() {
        document.getElementById('left-button').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('left-button').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('right-button').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('right-button').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('jump-button').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('jump-button').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('throw-button').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        document.getElementById('throw-button').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }
}