class DrawableObject {
    img;
    imageCache = {};
    curentImage = 0;
    x = 120;
    y = 220;
    height = 150;
    width = 100;
    offset = {
        top: 10,
        bottom: 0,
        left: 10,
        right: 10
    };


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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof ThrowableObject) {
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

}