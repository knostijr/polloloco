class MoveAbleObject {
    x = 120;
    y = 200;
    img;
    height = 100;
    width = 150;


    loadImage(path) {
        this.img = new Image(); // == this.img = document.getElementById('image') <img id="image">
        this.img.src = path;

    }


    moveRight() {
        console.log('Moving-right');
    }
}