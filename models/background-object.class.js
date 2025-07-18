class BackgroundObject extends MoveAbleObject {
    height = 400;
    width = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 400 - this.height;

    }
}