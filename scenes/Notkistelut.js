var char;

var Notkistelut = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Notkistelut"});
    },
    init: function() {},
    preload: function() {
        //ladataan kuvat
        this.load.image('kurkobg', 'assets/bg/kurkotus.png');
        this.load.image('kurkochar', 'assets/char/kurkotus.png');
        this.load.image('spagabg', 'assets/bg/spagaatti.png');
        this.load.image('spagachar', 'assets/char/spagaatti.png');
        this.load.image('spirabg', 'assets/bg/spiraali.png');
        this.load.image('spirachar', 'assets/char/spiraali.png');
        this.load.image('seur', 'assets/icon/seuraava.png');
        this.load.image('hitbox', 'assets/bg/anim_hitbox.png');
        
        this.load.image('notkalku', 'assets/bg/notkalku.png');
        //ladataan äänet
        this.load.audio('notkaud', ['assets/audio/notkistelut.mp3']);
        this.load.audio('kurkoaud', ['assets/audio/kurkotieto.mp3']);
        this.load.audio('spagaaud', ['assets/audio/spagatieto.mp3']);
        this.load.audio('spiraaud', ['assets/audio/spiratieto.mp3']);
    },
    create: function () {
        this.add.image(400, 300, 'notkalku');
        var seur0 = this.add.image(400, 530, 'seur');
        this.sound.play('notkaud');

        seur0.setInteractive().on('pointerdown', () => {
        //ensimmäinen tietokortti ja luodaan fysiikat
        var hitbox = this.physics.add.staticGroup();
        hitbox.create(250, 460, 'hitbox');
        hitbox.create(250, 35, 'hitbox');
        this.add.image(400, 300, 'kurkobg');
        char = this.physics.add.sprite(200, 250, 'kurkochar');
        var seur1 = this.add.image(400, 530, 'seur');
        this.anim(char, hitbox);
        this.time.addEvent({delay: 2500, callback: this.onEvent, loop: true});
        var kurkoaud = this.sound.add('kurkoaud');
        kurkoaud.play();

        seur1.setInteractive().on('pointerdown', () => {
            kurkoaud.stop();
            //toinen tietokortti
            this.add.image(400, 300, 'spagabg');
            char = this.physics.add.sprite(210, 250, 'spagachar');
            var seur2 = this.add.image(400, 530, 'seur'); 
            this.anim(char, hitbox);
            var spagaaud = this.sound.add('spagaaud');
            spagaaud.play();

            seur2.setInteractive().on('pointerdown', () => {
                spagaaud.stop();
                //kolmas tietokortti
                this.add.image(400, 300, 'spirabg');
                char = this.physics.add.sprite(220, 255, 'spirachar');
                var seur3 = this.add.image(400, 530, 'seur');
                this.anim(char, hitbox);
                var spiraaud = this.sound.add('spiraaud');
                spiraaud.play();

                seur3.setInteractive().on('pointerdown', () => {
                    spiraaud.stop();
                    //seuraava kenttä
                    this.scene.start("Ohje");
                });
            });
        });
    });
    },
    update: function () {

    },

    anim: function(char, hitbox) {
        char.setBounce(0.4);
        char.setCollideWorldBounds(true);
        this.physics.add.collider(char, hitbox);
        char.body.setGravityY(250);
        char.setInteractive().on('pointerdown', () => {
            char.setVelocityY(-120);
        });
    },

    onEvent: function() {
        char.setVelocityY(-170);
    }
});