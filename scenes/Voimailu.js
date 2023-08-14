var char;

var Voimailu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Voimailu"});
    },
    init: function() {},
    preload: function() {
        //lataa kuvat
        this.load.image('kyykkybg', 'assets/bg/kyykky.png');
        this.load.image('kyykkychar', 'assets/char/kyykky.png');
        this.load.image('vatsabg', 'assets/bg/vatsa.png');
        this.load.image('vatsachar', 'assets/char/vatsa.png');
        this.load.image('punnerbg', 'assets/bg/punnerrus.png');
        this.load.image('punnerchar', 'assets/char/punnerrus.png');
        this.load.image('lentobg', 'assets/bg/lento.png');
        this.load.image('lentochar', 'assets/char/lento.png');
        this.load.image('seur', 'assets/icon/seuraava.png');
        this.load.image('hitbox', 'assets/bg/anim_hitbox.png');
        this.load.image('voimalku', 'assets/bg/voimalku.png');
        //lataa äänet
        this.load.audio('voimaud', ['assets/audio/voimailu.mp3']);
        this.load.audio('kyykaud', ['assets/audio/kyykkytieto.mp3']);
        this.load.audio('vatsaaud', ['assets/audio/vatsatieto.mp3']);
        this.load.audio('punneraud', ['assets/audio/punnertieto.mp3']);
        this.load.audio('lentoaud', ['assets/audio/lentotieto.mp3']);
    },
    create: function () {
        this.add.image(400, 300, 'voimalku');
        var seur0 = this.add.image(400, 530, 'seur');
        this.sound.play('voimaud');

        seur0.setInteractive().on('pointerdown', () => {
        //ensimmäinen tietokortti ja luodaan fysiikat
        var hitbox = this.physics.add.staticGroup();
        hitbox.create(250, 460, 'hitbox');
        hitbox.create(250, 35, 'hitbox');
        this.add.image(400, 300, 'kyykkybg');
        char = this.physics.add.sprite(200, 260, 'kyykkychar');
        var seur1 = this.add.image(400, 530, 'seur');
        this.anim(char, hitbox);
        this.time.addEvent({delay: 2500, callback: this.onEvent, loop: true});
        var kyykaud = this.sound.add('kyykaud');
        kyykaud.play();

        seur1.setInteractive().on('pointerdown', () => {
            kyykaud.stop();
            //toinen tietokortti
            this.add.image(400, 300, 'vatsabg');
            char = this.physics.add.sprite(230, 250, 'vatsachar');
            var seur2 = this.add.image(400, 530, 'seur'); 
            this.anim(char, hitbox);
            var vatsaaud = this.sound.add('vatsaaud');
            vatsaaud.play();

            seur2.setInteractive().on('pointerdown', () => {
                vatsaaud.stop();
                //kolmas tietokortti
                this.add.image(400, 300, 'punnerbg');
                char = this.physics.add.sprite(230, 250, 'punnerchar');
                var seur3 = this.add.image(400, 530, 'seur');
                this.anim(char, hitbox);
                var punneraud = this.sound.add('punneraud');
                punneraud.play();

                seur3.setInteractive().on('pointerdown', () => {
                    punneraud.stop();
                    //neljäs tietokortti
                    this.add.image(400, 300, 'lentobg');
                    char = this.physics.add.sprite(235, 250, 'lentochar');
                    var seur4 = this.add.image(400, 530, 'seur');
                    this.anim(char, hitbox);
                    var lentoaud = this.sound.add('lentoaud');
                    lentoaud.play();

                    seur4.setInteractive().on('pointerdown', () => {
                        lentoaud.stop();
                        //seuraava kenttä
                        this.scene.start("Taito");
                    });
                });
            });
        });
        })

        
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