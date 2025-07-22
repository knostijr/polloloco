class Cloud extends MoveAbleObject {
    y = 20;
    height = 200;
    width = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png', 'img/5_background/layers/4_clouds/2.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        // x koordinate wird regelmäßig um 5 nach links verschoben mit setInterval()
        this.moveLeft();
    }

    moveLeft() {
        // x koordinate wird regelmäßig um 5 nach links verschoben mit setInterval()
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // t 
    }
}
