class MoveAbleObject {
    x = 120;
    y = 220;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    curentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    offset = {
        top: 10,
        bottom: 0,
        left: 20,
        right: 20
    };


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



    loadImage(path) {
        this.img = new Image(); // == this.img = document.getElementById('image') <img id="image">
        this.img.src = path;

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        // wird nur ausgeführt wenn eine Instanz von Character oder Chicken da ist
        if(this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }

    // character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > this.moveLeft.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;

    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight() {
        this.x += this.speed;


    }

    moveLeft() {
        this.x -= this.speed;


    }

    playAnimation(images) {
        let i = this.curentImage % this.IMAGES_WALKING.length; // let i = 0 % 6, => 0, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.curentImage++;
    }

    jump() {
        this.speedY = 30;
    }
}