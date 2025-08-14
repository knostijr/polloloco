class Endboss extends MoveAbleObject {
    width = 200;
    height = 400;
    y = 0;
    energy = 100;
    isHurt = false;
    isDeadFlag = false;
    isDeadAnimationDone = false;
    speed = 2;
    lastAnimationTime = 0;
    character = null;
    currentAction = 'alert';
    isActivated = false;

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
        this.soundManager = SoundManager.getInstance();
    }
    
    checkState() {
        if (this.isDead()) {
            this.currentAction = 'dead';
        } else if (this.isHurt) {
            this.currentAction = 'hurt';
        } else if (this.isCharacterInAttackRange()) {
            this.currentAction = 'attack';
        } else if (this.isCharacterInWalkRange()) {
            this.currentAction = 'walk';
        } else {
            this.currentAction = 'alert';
        }
    }

    animate() {
        this.checkState();
        if (this.currentAction === 'dead' && this.isDeadAnimationDone) {
            return;
        }
        
        let now = new Date().getTime();
        let timePassed = now - this.lastAnimationTime;
        let animationInterval = 250; 

        if (this.currentAction === 'hurt' || this.currentAction === 'attack') {
            animationInterval = 100;
        }

        if (timePassed > animationInterval) {
            switch(this.currentAction) {
                case 'dead':
                    this.playAnimation(this.IMAGES_DEAD);
                    if (this.currentImage >= this.IMAGES_DEAD.length - 1) {
                        this.isDeadAnimationDone = true;
                    }
                    break;
                case 'hurt':
                    this.playAnimation(this.IMAGES_HURT);
                    this.isHurt = false;
                    break;
                case 'attack':
                    this.playAnimation(this.IMAGES_ATTACK);
                    this.soundManager.play('endbossvoice', 0.1);
                    break;
                case 'walk':
                    this.playAnimation(this.IMAGES_WALKING);
                    break;
                case 'alert':
                    this.playAnimation(this.IMAGES_ALERT);
                    break;
            }
            this.lastAnimationTime = now;
        }
    }

    handleMovement() {
        // Zuerst die Aktivierung prüfen
        if (!this.isActivated) {
            if (this.isCharacterInActivationRange()) {
                this.isActivated = true;
            }
        }
        
        // Führe Bewegungen nur aus, wenn der Endboss aktiviert ist
        if (this.isActivated) {
            this.checkState();
            if (this.currentAction === 'walk') {
                this.moveTowardsCharacter();
            }
        } else {
            // Bleibt im Alert-Zustand, wenn nicht aktiviert
            this.currentAction = 'alert';
        }
    }

  moveTowardsCharacter() {
    if (this.character) {
        // Stoppt die Bewegung, wenn der Charakter in Angriffsreichweite ist
        if (this.isCharacterInAttackRange()) {
            return;
        }
        // Bewegt sich auf den Charakter zu
        if (this.x > this.character.x) {
            this.x -= this.speed;
            this.otherDirection = false;
        } else if (this.x < this.character.x) {
            this.x += this.speed;
            this.otherDirection = true;
        }
    }
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

    isCharacterInActivationRange() {
        return this.character && Math.abs(this.x - this.character.x) < 700;
    }

    isCharacterInAttackRange() {
        return this.character && Math.abs(this.x - this.character.x) < 120;
    }

    isCharacterInWalkRange() {
        return this.character && Math.abs(this.x - this.character.x) < 500;
    }

    setCharacter(character) {
        this.character = character;
    }
}