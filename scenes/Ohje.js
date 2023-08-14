var Ohje = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Ohje"});
    },
    init: function() {},
    preload: function() {
        // ladataan kuvat
        this.load.image('ohjebg', 'assets/bg/ohje.png');
        this.load.image('play', 'assets/icon/play.png');
        // ladataan äänet
        this.load.audio('ohjeaud', ['assets/audio/ohje.mp3']);
        
    },
    // koodi, joka aktivoidaan pelin aloittaessa, esim. pelikenttä.
    create: function () {
        this.add.image(400, 300, 'ohjebg');
        var aloita = this.add.image(400, 500, 'play');
        ohjeaud = this.sound.add('ohjeaud');
        ohjeaud.play();

        aloita.setInteractive().on('pointerdown', () => {
            ohjeaud.stop();
            this.scene.start("Peli");
        });
    },
    // koodi, joka käydään jatkuvasti läpi, esim. input.
    update: function () {

    }
});
