var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Menu"});
    },
    init: function() {},
    preload: function() {
        // aloitusruudun kuvat
        this.load.image('logo', 'assets/logo/ssklogo.png');
        this.load.image('logobg', 'assets/bg/logobg.png');
        this.load.image('play', 'assets/icon/play.png');
        
    },
    // koodi, joka aktivoidaan pelin aloittaessa, esim. pelikenttä.
    create: function () {
        this.add.image(400, 300, 'logobg');
        this.add.image(375, 100, 'logo');
        var aloita = this.add.image(400, 400, 'play');

        aloita.setInteractive().on('pointerdown', () => {
            this.scene.start("Skip");
        });
    },
    // koodi, joka käydään jatkuvasti läpi, esim. input.
    update: function () {

    }
});

    