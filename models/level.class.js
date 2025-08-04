class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    collectableCoin;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, collectables, collectableCoin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
        this.collectableCoin = collectableCoin;

    }
}