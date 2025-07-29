class MoveAbleObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    offset = {
        top: 10,
        bottom: 0,
        left: 10,
        right: 10
    };
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
        return this.y < 165;
    }


    /* drawFrame(ctx) {
         // wird nur ausgeführt wenn eine Instanz von Character oder Chicken da ist
         if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall) {
             ctx.beginPath();
             ctx.lineWidth = '2';
             ctx.strokeStyle = 'blue';
             ctx.rect(this.x, this.y, this.width, this.height);
             ctx.stroke();
         }
     }*/
    drawFrame(ctx) {
        // wird nur ausgeführt wenn eine Instanz von Character oder Chicken da ist
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
    // 
    /*drawRedFrame(ctx) {
        // wird nur ausgeführt wenn eine Instanz von Character oder Chicken da ist
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }*/

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
        let timepassed = new Date().getTime - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in s
        console.log(timepassed);
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
}