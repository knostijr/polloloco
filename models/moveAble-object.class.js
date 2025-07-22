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


    loadImage(path) {
        this.img = new Image(); // == this.img = document.getElementById('image') <img id="image">
        this.img.src = path;

    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }


    moveRight() {
        console.log('Moving-right');
    }

    moveLeft() {
        // x koordinate wird regelmäßig um 5 nach links verschoben mit setInterval()
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // t 
    }
}