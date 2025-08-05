class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    bottles = 5;
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectables = [];
    collectableCoin = [];
    coinsCollected = 0;
    gameOverImage = new Image();
    gameIsOver = false;
    youWon = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.collectables = this.level.collectables;
        this.collectableCoin = this.level.collectableCoin;
        this.gameOverImage.src = 'img/You won, you lost/gameover.png';
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossStatus();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottles--;

            // Prozentsatz berechnen (jede Flasche = 20%)
            let percentage = (this.bottles / 5) * 100;
            this.statusBarBottle.setPercentage(percentage);
        }
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCollectableCollisions();
        this.checkCoinCollisions();
        this.checkThrowableCollisions();
        this.checkCharacterDeath();
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            // Prüfe zuerst die präzise Draufspringen-Kollision
            if (this.character.isStompingOn(enemy)) {
                // Wenn die Kollision von oben erfolgt, den Gegner eliminieren
                this.level.enemies.splice(index, 1);
                this.character.jump(); // Optionaler Rücksprung für den Charakter
            } else if (this.character.isColliding(enemy)) {
                // Wenn es eine Kollision von der Seite ist, nimmt der Charakter Schaden
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollectableCollisions() {
        this.collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                if (this.bottles < 5) {
                    this.bottles++;
                    let percentage = (this.bottles / 5) * 100;
                    this.statusBarBottle.setPercentage(percentage);
                }
                this.collectables.splice(index, 1);
            }
        });
    }

    checkCoinCollisions() {
        this.collectableCoin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectableCoin.splice(index, 1);
                this.coinsCollected++;
                let percentage = Math.min(this.coinsCollected * 20, 100);
                this.statusBarCoin.setPercentage(percentage);
            }
        });
    }

    checkThrowableCollisions() {
        this.throwableObjects.forEach((bottle, index) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                    enemy.hit();
                    this.throwableObjects.splice(index, 1);
                    this.statusBarEndboss.setPercentage(enemy.energy);
                }
            });
        });
    }

    checkCharacterDeath() {
        if (this.character.isDead() && !this.gameIsOver) {
            this.endGame();
        }
    }


    showWinScreen() {
        const winImage = new Image();
        winImage.src = 'img/You won, you lost/youwin.png';
        winImage.onload = () => {
            this.ctx.drawImage(winImage, 0, 0, this.canvas.width, this.canvas.height);
        };
        // Wenn das Bild bereits geladen ist, sofort zeichnen
        if (winImage.complete) {
            this.ctx.drawImage(winImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    showGameOverScreen() {
        // Annahme: gameOverImage wurde bereits geladen
        this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    checkEndbossStatus() {
        const endboss = this.level.enemies.find(e => e instanceof Endboss);

        if (endboss && endboss.isDead() && endboss.isDeadAnimationDone && !this.youWon) {
            this.gameIsOver = true;
            this.youWon = true;
            this.stopGame();
            setTimeout(() => this.showWinScreen(), 500); // Verzögerung, damit die Todesanimation noch kurz zu sehen ist
        }
    }

    setWorld() {
        this.character.world = this;

        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.setCharacter(this.character);
            }
        });
    }

    stopGame() {
        clearInterval(this.gameInterval); // dein Game Loop Intervall
        // ggf. Musik stoppen, Tasteneingaben blockieren, usw.
    }

    endGame() {
        this.gameIsOver = true;

        // Stoppe alle Intervalle (z. B. `setInterval`s) – optional
        clearInterval(this.character.walkInterval);
        clearInterval(this.throwBottleInterval); // falls du einen separaten hast

        // Warte kurz und zeige dann das Game Over Bild
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);

            // Button einblenden
            document.getElementById('restart-btn').style.display = 'block';
        }, 500);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameIsOver) {
            // Spiel ist vorbei, nur den Endscreen zeichnen
            if (this.youWon) {
                this.showWinScreen();
            } else {
                this.showGameOverScreen();
            }
            return;
        }

        // Normaler Spiel-Loop
        this.ctx.translate(this.camera_x, 0); // Kamera wird verschoben
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.collectables);
        this.addObjectsToMap(this.collectableCoin);

        this.ctx.translate(-this.camera_x, 0);

        // Statusbars werden immer an der gleichen Position gezeichnet
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEndboss);

        // Der nächste Frame wird angefordert
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
