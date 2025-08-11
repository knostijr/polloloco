class ChickenSmall extends MoveAbleObject {
    y = 310;
    height = 50;
    width = 30;
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
        this.animate();
    }

    animate() {
        this.animateMovement();
        this.animateStatus();
    }

    /**
     * Kümmert sich um die Bewegung des Gegners.
     * Stoppt, wenn der Gegner tot ist.
     */
    animateMovement() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Kümmert sich um die Animation des Gegners.
     * Spielt die Todesanimation ab, wenn der Gegner tot ist.
     */
    animateStatus() {
        setInterval(() => {
            if (this.isDead) {
                // Wenn der Gegner tot ist, spiele die Todesanimation
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                // Ansonsten, spiele die Laufanimation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}