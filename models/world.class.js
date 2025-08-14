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
    soundManager = SoundManager.getInstance();
    gameIsOver = false;
    youWon = false;
    spawningIntervalId;
    gameIntervals = [];
    endbossIsAdded = false;
    isPaused = false;
    lastAnimationUpdate = 0;
    animationUpdateInterval = 1000 / 10;
    endboss;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
        this.addCollectables();
        this.startSpawningChickens();
        this.setGameInterval(() => {
            this.updateMovement();
        }, 1000 / 60);
        this.setGameInterval(() => {
            this.updateAnimations();
        }, 100);
        this.gameOverImage.src = 'img/You won, you lost/gameover.png';
        this.soundManager.play('backgroundmusic', 0.01);
        this.draw();
    }

    setGameInterval(fn, time) {
        let id = setInterval(fn, time);
        this.gameIntervals.push(id);
    }

    run() {
        this.setGameInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossAppearance();
            this.checkEndbossStatus();
        }, 200);
    }

    pauseGame() {
        if (!this.isPaused) {
            this.isPaused = true;
            this.stopAllGameIntervals();
            this.soundManager.stop('backgroundmusic');
        }
    }

    updateMovement() {
        this.character.handleMovement();
        this.character.updateCameraPosition();

        this.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Endboss)) {
                enemy.moveLeft();
            }
        });

        this.level.clouds.forEach(cloud => cloud.moveLeft());

        let endbossInstance = this.level.enemies.find(e => e instanceof Endboss);
        if (endbossInstance) {
            endbossInstance.handleMovement();
        }
    }

    updateAnimations() {
        this.character.animate();
        this.level.enemies.forEach(enemy => enemy.animate());
        
        let endbossInstance = this.level.enemies.find(e => e instanceof Endboss);
        if (endbossInstance) {
            endbossInstance.animate();
        }
    }

    resumeGame() {
        if (this.isPaused) {
            this.isPaused = false;
            this.run();
            this.addCollectables();
            this.startSpawningChickens();
            this.soundManager.play('backgroundmusic', 0.01);
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottles--;

            let percentage = (this.bottles / 5) * 100;
            this.statusBarBottle.setPercentage(percentage);
        }
    }

    dropBottle(enemy) {
        let droppedBottle = new CollectableObject(enemy.x, enemy.y);
        this.collectables.push(droppedBottle);
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
            if (enemy instanceof Endboss) {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            } else {
                if (this.character.isStompingOn(enemy) && !enemy.isDead) {
                    enemy.isDead = true;
                    this.character.jump();
                    this.dropBottle(enemy);
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 500);
                } else if (this.character.isColliding(enemy) && !enemy.isDead) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCollectableCollisions() {
        this.collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                this.soundManager.play('pickupbottle', 0.09);
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
                this.soundManager.play('pickupcoin', 0.09);
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
            this.showGameOverScreenWithButtons(false);
        }
    }

    checkEndbossAppearance() {
        if (this.character.x > this.level.level_end_x - 700 && !this.endbossIsAdded) {
            this.endboss = new Endboss();
            this.endboss.setCharacter(this.character);
            this.level.enemies.push(this.endboss);
            this.endbossIsAdded = true;
        }
    }

    checkEndbossStatus() {
        let endboss = this.level.enemies.find(e => e instanceof Endboss);

        if (endboss && endboss.isDead() && !this.youWon) {
            this.youWon = true;
            setTimeout(() => {
                this.showGameOverScreenWithButtons(true);
            }, 500);
        }
    }

    showGameOverScreenWithButtons(youWon) {
        this.gameIsOver = true;
        this.stopAllGameIntervals();
        this.soundManager.stop('backgroundmusic');

        if (youWon) {
            this.soundManager.play('youwin');
            document.getElementById('canvas').style.display = 'none';
            document.getElementById('win-screen').style.display = 'flex';
        } else {
            this.soundManager.play('gameover');
            document.getElementById('canvas').style.display = 'none';
            document.getElementById('lose-screen').style.display = 'flex';
        }
    }

    stopAllGameIntervals() {
        this.gameIntervals.forEach(interval => clearInterval(interval));
        this.gameIntervals = [];
    }

    setWorld() {
        this.character.world = this;
    }

    addCollectables() {
        let bottleSpawnInterval = setInterval(() => {
            if (!this.endbossIsAdded && this.character.x < this.level.level_end_x - 500) {
                let newBottle = new CollectableObject(this.character.x + 500 + Math.random() * 500, 250);
                this.collectables.push(newBottle);

                let newCoin = new CollectableObjectCoin(this.character.x + 500 + Math.random() * 500, 250);
                this.collectableCoin.push(newCoin);
            }
        }, 2300);
        this.gameIntervals.push(bottleSpawnInterval);
    }

    startSpawningChickens() {
        let spawningInterval = setInterval(() => {
            if (!this.endbossIsAdded && this.character.x < this.level.level_end_x - 500) {
                let isSmallChicken = Math.random() < 0.5;
                let newEnemy;
                if (isSmallChicken) {
                    newEnemy = new ChickenSmall();
                } else {
                    newEnemy = new Chicken();
                }
                newEnemy.x = this.character.x + 500 + Math.random() * 500;
                this.level.enemies.push(newEnemy);
            }
        }, 2000);
        this.gameIntervals.push(spawningInterval);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameIsOver) {
            if (!this.youWon) {
                this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
            }
            return;
        }

        if (this.isPaused) {

        } else {
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);

            this.addToMap(this.character);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.collectableCoin);
            this.addObjectsToMap(this.collectables);

            this.ctx.translate(-this.camera_x, 0);

            this.addToMap(this.statusBarCoin);
            this.addToMap(this.statusBarBottle);
            this.addToMap(this.statusBar);
            this.addToMap(this.statusBarEndboss);
        }
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
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

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