var Skip = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Skip"});
    },
    init: function() {},
    preload: function() {
        this.load.image('skip', 'assets/bg/skip.png');
        this.load.image('kylla', 'assets/icon/kylla.png');
        this.load.image('ei', 'assets/icon/ei.png');
        this.load.audio('skipaud', ['assets/audio/skip.mp3']);
        
    },
    create: function () {
        this.add.image(400, 300, 'skip');
        var kylla = this.add.image(600, 420, 'kylla');
        var ei = this.add.image(600, 550, 'ei');
        audio = this.sound.add('skipaud');
        audio.play();

        kylla.setInteractive().on('pointerdown', () => {
            audio.stop();
            this.scene.start("Verryttely"); //vie tietokortteihin, joissa opetetaan liikkeet
        });
            
        ei.setInteractive().on('pointerdown', () => {
            audio.stop();
            this.scene.start("Ohje"); //vie suoraan peliin
        });
    },
    update: function () {

    }
});