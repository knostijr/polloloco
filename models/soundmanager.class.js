class SoundManager {
    static instance = null;
    sounds = {};
    isMuted = false;

    constructor() {
        if (SoundManager.instance) {
            return SoundManager.instance;
        }

        SoundManager.instance = this;
        this.loadSounds();
    }

    loadSounds() {
        this.sounds.backgroundmusic = new Audio('audio/backgroundmusic.mp3');
        this.sounds.buttonClick = new Audio('audio/buttonClick.mp3');
        this.sounds.endbossvoice = new Audio('audio/endbossvoice.mp3');
        this.sounds.gameover = new Audio('audio/gameover.mp3');
        this.sounds.pepejumping = new Audio('audio/pepejumping.mp3');
        this.sounds.pickupbottle = new Audio('audio/pickupbottle.mp3');
        this.sounds.pickupcoin = new Audio('audio/pickupcoin.mp3');
        this.sounds.sandwalk_pepe = new Audio('audio/sandwalk_pepe.mp3');
        this.sounds.youwin = new Audio('audio/youwin.mp3');

        //Loop für die Hintergrundmusik einstellen
        this.sounds.backgroundmusic.loop = true;
    }

    play(soundName, volume = 0.5) {
        if (this.isMuted) {
            return;
        }

        let sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0; // Stellt den Sound auf den Anfang zurück
            sound.volume = volume;
            sound.play().catch(e => console.error("Sound playback failed:", e));
        }
    }

    stop(soundName) {
        let sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            for (const sound in this.sounds) {
                this.sounds[sound].pause();
            }
        }
    }

    static getInstance() {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }
}