class BackgroundObject extends MoveAbleObject {
    // width und height sind vertauscht, noch fixen
    height = 720;
    width = 400;
    
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.y = y;
        this.x = x;
    }
}