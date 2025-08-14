class Character extends MoveAbleObject {
    y = 80;
    height = 190;
    width = 150;
    speed = 10;
    offset = {
        top: 80,
        bottom: 10,
        left: 30,
        right: 30
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_STAYING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'

    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/i-1.png',
        'img/2_character_pepe/1_idle/idle/i-2.png',
        'img/2_character_pepe/1_idle/idle/i-3.png',
        'img/2_character_pepe/1_idle/idle/i-4.png',
        'img/2_character_pepe/1_idle/idle/i-5.png',
        'img/2_character_pepe/1_idle/idle/i-6.png',
        'img/2_character_pepe/1_idle/idle/i-7.png',
        'img/2_character_pepe/1_idle/idle/i-8.png',
        'img/2_character_pepe/1_idle/idle/i-9.png',
        'img/2_character_pepe/1_idle/idle/i-10.png'

    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',

    ];

    world;
    soundManager;

    lastMovementTime = new Date().getTime();
    longIdleTimeout = null;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_STAYING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.soundManager = SoundManager.getInstance();
        this.applyGravity();
        this.animate();

    }

    animate() {
        this.animateMovement();
        this.animateAnimations();
    }

    /**
    * Hauptmethode für alle Bewegungslogiken.
    * Läuft mit 60 FPS für eine flüssige Steuerung.
    */
    animateMovement() {
        setInterval(() => {
            this.handleWalking();
            this.handleJumping();
            this.updateLastMovementTime();
            this.updateCameraPosition();
        }, 1000 / 60);
    }

    /**
     * Kümmert sich um die Laufbewegung und den Sound.
     */
    handleWalking() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.soundManager.play('sandwalk_pepe');
            
        
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.soundManager.play('sandwalk_pepe');
        
        }
    }

    /**
     * Kümmert sich um die Sprungbewegung.
     */
    handleJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.soundManager.play('pepejumping');
        }
    }

    /**
     * Aktualisiert den Zeitstempel der letzten Bewegung.
     */
    updateLastMovementTime() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE) {
            this.lastMovementTime = new Date().getTime();
        }
    }

    /**
     * Aktualisiert die Position der Spielkamera.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
    * Hauptmethode für alle Animationslogiken.
    * Läuft mit 10 FPS für die Animationen.
    */
    animateAnimations() {
        setInterval(() => {
            let timePassed = new Date().getTime() - this.lastMovementTime;
            let isLongIdle = timePassed > 5000;
            this.setAnimation(isLongIdle);
        }, 100);
    }

    /**
     * Wählt und spielt die passende Animation ab.
     */
    setAnimation(isLongIdle) {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DYING);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURTING);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (isLongIdle) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    jump() {
        this.speedY = 20;
    }

    isStompingOn(enemy) {

        return this.isColliding(enemy) && this.speedY < 0 && (this.y + this.height - 20) < (enemy.y + enemy.height - 20);
    }
}
