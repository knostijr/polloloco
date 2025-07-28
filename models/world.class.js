class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach( (enemy) => {
               if( this.character.isColliding(enemy));
                console.log('Collision with Character ', enemy);
            });
        }, 1000);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); // kamera wird verschoben; translate(x,y) benötigt zwei argumente

        /*
        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)})

            // added as reference
        */
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // self = this; innerhalb der funktion wird nicht this. nicht erkannt
        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        // spiegeln der Images. save() => wird gespeichert, translate() => einfügen der bilder wird verändert, scale() => alles wird gespiegelt
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        // ursprung wieder herstellen
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
