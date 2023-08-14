var char;

var Taito = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Taito"});
    },
    init: function() {},
    preload: function() {
        //ladataan kuvat
        this.load.image('kiipeilybg', 'assets/bg/kiipeily.png');
        this.load.image('kiipeilychar', 'assets/char/kiipeily.png');
        this.load.image('roikkubg', 'assets/bg/roikkuminen.png');
        this.load.image('roikkuchar', 'assets/char/roikkuminen.png');
        this.load.image('hyppaabg', 'assets/bg/hyppaaminen.png');
        this.load.image('hyppaachar', 'assets/char/hyppaaminen.png');
        this.load.image('tasabg', 'assets/bg/tasapaino.png');
        this.load.image('tasachar', 'assets/char/tasapaino.png');
        this.load.image('seur', 'assets/icon/seuraava.png');
        this.load.image('hitbox', 'assets/bg/anim_hitbox.png');
        this.load.image('taitoalku', 'assets/bg/taialku.png');
        //ladataan äänet
        this.load.audio('taitoaud', ['assets/audio/taito.mp3']);
        this.load.audio('kiipaud', ['assets/audio/kiipeilytieto.mp3']);
        this.load.audio('roikkuaud', ['assets/audio/roikkutieto.mp3']);
        this.load.audio('hypaud', ['assets/audio/hyppaatieto.mp3']);
        this.load.audio('tasaaud', ['assets/audio/tasatieto.mp3']);
    },
    create: function () {
        this.add.image(400, 300, 'taitoalku');
        var seur0 = this.add.image(400, 530, 'seur');
        this.sound.play('taitoaud');

        seur0.setInteractive().on('pointerdown', () => {
        //ensimmäinen tietokortti ja luodaan fysiikat
        var hitbox = this.physics.add.staticGroup();
        hitbox.create(250, 460, 'hitbox');
        hitbox.create(250, 35, 'hitbox');
        this.add.image(400, 300, 'kiipeilybg');
        char = this.physics.add.sprite(210, 260, 'kiipeilychar');
        var seur1 = this.add.image(400, 530, 'seur');
        this.anim(char, hitbox);
        this.time.addEvent({delay: 2500, callback: this.onEvent, loop: true});
        var kiipaud = this.sound.add('kiipaud');
        kiipaud.play();

        seur1.setInteractive().on('pointerdown', () => {
            kiipaud.stop();
            //toinen tietokortti
            this.add.image(400, 300, 'roikkubg');
            char = this.physics.add.sprite(210, 260, 'roikkuchar');
            var seur2 = this.add.image(400, 530, 'seur'); 
            this.anim(char, hitbox);
            var roikaud = this.sound.add('roikkuaud');
            roikaud.play();

            seur2.setInteractive().on('pointerdown', () => {
                roikaud.stop();
                //kolmas tietokortti
                this.add.image(400, 300, 'hyppaabg');
                char = this.physics.add.sprite(210, 260, 'hyppaachar');
                var seur3 = this.add.image(400, 530, 'seur');
                this.anim(char, hitbox);
                var hypaud = this.sound.add('hypaud');
                hypaud.play();

                seur3.setInteractive().on('pointerdown', () => {
                    hypaud.stop();
                    //neljäs tietokortti
                    this.add.image(400, 300, 'tasabg');
                    char = this.physics.add.sprite(210, 260, 'tasachar');
                    var seur4 = this.add.image(400, 530, 'seur');
                    this.anim(char, hitbox);
                    var tasaaud = this.sound.add('tasaaud');
                    tasaaud.play();

                    seur4.setInteractive().on('pointerdown', () => {
                        tasaaud.stop();
                        //seuraava kenttä
                        this.scene.start("Notkistelut");
                    });
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