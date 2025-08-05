class Endboss extends MoveAbleObject {
    width = 200;
    height = 400;
    y = 0;
    energy = 100;
    isHurt = false;
    isDeadFlag = false;
    isDeadAnimationDone = false;
    animationInterval;
    speed = 2;

    offset = {
        top: 50,
        left: 60,
        right: 60,
        bottom: 20
    };

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2000;
        this.animate();
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 20;
            this.isHurt = true;
            if (this.energy <= 0) {
                this.energy = 0;
                this.isDeadFlag = true;
            }
        }
    }

    isDead() {
        return this.isDeadFlag;
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead() && !this.isDeadAnimationDone) {
                this.handleDeathAnimation();
            } else if (this.isHurt) {
                this.handleHurt();
            } else {
                this.handleActiveState();
            }
        }, 150);
    }

    /**
     * Verwaltet die Todesanimation.
     * Stoppt die Animation, wenn sie abgeschlossen ist.
     */
    handleDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage >= this.IMAGES_DEAD.length - 1) {
            this.isDeadAnimationDone = true;
            clearInterval(this.animationInterval); // Stoppe die Animation nach dem Tod
        }
    }

    /**
     * Verwaltet den Zustand bei Schaden.
     */
    handleHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.isHurt = false; // Setzt den Hurt-Status zurück
    }

    /**
     * Verwaltet die aktiven Zustände (Attacke, Laufen, Alert).
     */
    handleActiveState() {
        if (this.isCharacterInAttackRange()) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.isCharacterInWalkRange()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveTowardsCharacter();
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }


    /**
     * Bewegung in Richtung Charakter, wenn in Walk-Reichweite.
     */
    moveTowardsCharacter() {
        if (this.character && this.x > this.character.x) {
            this.x -= this.speed;
        }
    }

    /**
     * Prüft, ob der Charakter in Angriffsreichweite ist.
     */
    isCharacterInAttackRange() {
        return this.character && Math.abs(this.x - this.character.x) < 120;
    }

    /**
     * Prüft, ob der Charakter in Laufreichweite ist.
     */
    isCharacterInWalkRange() {
        return this.character && Math.abs(this.x - this.character.x) < 500;
    }

    /**
     * Referenz auf Charakter setzen (von World aus).
     */
    setCharacter(character) {
        this.character = character;
    }

    isDeadAnimationOver() {
        return this.currentImage >= this.IMAGES_DEAD.length - 1;
    }
}