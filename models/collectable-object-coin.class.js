class CollectableObjectCoin extends MoveAbleObject {
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
    }
}