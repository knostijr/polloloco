class Cloud extends MoveAbleObject {
    y = 20;
    height = 200;
    width = 250;
    speed = 0.5; // Fügen Sie eine Geschwindigkeit für die Bewegung hinzu

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
    }

    /**
     * Diese Methode wird nun von der World-Klasse in einer zentralen Schleife aufgerufen.
     * Sie bewegt die Wolke einmal nach links.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}