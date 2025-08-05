class MoveAbleObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 165;
        }

    }

    // character.isColliding(chicken);
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in s

        return timepassed < 1.5;
    }

    isDead() {
        return this.energy == 0;
    }



    moveRight() {
        this.x += this.speed;


    }

    moveLeft() {
        this.x -= this.speed;


    }

    playAnimation(images) {
        let i = this.curentImage % images.length; // let i = 0 % 6, => 0, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.curentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    isStandingOnEnemy(enemy) {
        // Prüfe, ob die Unterseite des Charakters über der Oberseite des Gegners liegt
        const characterBottom = this.y + this.height;
        const enemyTop = enemy.y;

        // Wir geben dem Ganzen einen kleinen Toleranzbereich, um Kollisionen nicht zu verpassen
        const collisionThreshold = 10;

        // Prüfe, ob der Charakter auf den Gegner springt und sich noch in der Aufwärtsbewegung befindet
        // Das ist entscheidend, damit der Charakter den Gegner nicht tötet, wenn er vom Boden aus versucht, ihn zu töten
        const isAbove = characterBottom > enemyTop && characterBottom < enemyTop + collisionThreshold;

        // Prüfe, ob die x-Koordinaten ebenfalls überlappen
        const isOverlappingX = (this.x + this.width > enemy.x) && (this.x < enemy.x + enemy.width);

        return isAbove && isOverlappingX;
    }
}