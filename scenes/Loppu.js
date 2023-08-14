var Loppu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Loppu"});
    },
    init: function() {},
    preload: function() {
        //ladataan kuvat
        this.load.image('loppubg', 'assets/bg/loppu.png');
        this.load.image('alku', 'assets/icon/alku.png');
        //ladataan äänet
        this.load.audio('loppuaudio', ['assets/audio/loppu.mp3']);
    },
    create: function () {
        this.add.image(400, 300, 'loppubg');
        var alku = this.add.image(600, 500, 'alku');
        loppuaudio = this.sound.add('loppuaudio');
        loppuaudio.play();

        alku.setInteractive().on('pointerdown', () => {
            loppuaudio.stop();
            this.scene.start("Menu");
        });
    },

    update: function () {

    }
});