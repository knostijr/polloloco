class Chicken extends MoveAbleObject {
    y = 300;
    height = 70;
    width = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    animate() {

        this.moveLeft();

        setInterval(() => {
            let i = this.curentImage % this.IMAGES_WALKING.length; // let i = 0 % 6, => 0, Rest 0
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.curentImage++;
        }, 200);
    }


}