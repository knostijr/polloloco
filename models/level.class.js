class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enmies, clouds, backgroundObjects) {
        this.enemies = enmies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;

    }
}