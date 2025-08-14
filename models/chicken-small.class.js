class ChickenSmall extends MoveAbleObject {
    y = 290;
    height = 70;
    width = 50;
    isDead = false;
    offset = {
        top: 15,
        bottom: 5,
        left: 0,
        right: 0
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
    }

    /**
     * Bewegt das kleine Huhn einmal nach links, wenn es nicht tot ist.
     * Diese Methode wird von der World-Klasse aufgerufen.
     */
    moveLeft() {
        if (!this.isDead) {
            this.x -= this.speed;
        }
    }

    /**
     * Spielt die passende Animation ab (Laufen oder Tod).
     * Diese Methode wird von der World-Klasse aufgerufen.
     */
    animate() {
        if (this.isDead) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}