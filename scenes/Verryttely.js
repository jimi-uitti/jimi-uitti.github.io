var char;

var Verryttely = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Verryttely"});
    },
    init: function() {},
    preload: function() {
        //lataa kuvat
        this.load.image('veralku', 'assets/bg/veralku.png');
        this.load.image('etubg', 'assets/bg/etuperin.png');
        this.load.image('etuchar', 'assets/char/etuperin.png');
        this.load.image('takabg', 'assets/bg/takaperin.png');
        this.load.image('takachar', 'assets/char/takaperin.png');
        this.load.image('varpabg', 'assets/bg/varpailla.png');
        this.load.image('varpachar', 'assets/char/varpailla.png');
        this.load.image('kantabg', 'assets/bg/kanta.png');
        this.load.image('kantachar', 'assets/char/kanta.png');
        this.load.image('elainbg', 'assets/bg/elain.png');
        this.load.image('elainchar', 'assets/char/elain.png');
        this.load.image('superbg', 'assets/bg/super.png');
        this.load.image('superchar', 'assets/char/super.png');
        this.load.image('seur', 'assets/icon/seuraava.png');
        this.load.image('hitbox', 'assets/bg/anim_hitbox.png');
        //lataa äänet
        this.load.audio('veraud', ['assets/audio/alkuverryttely.mp3']);
        this.load.audio('etuaud', ['assets/audio/etupertieto.mp3']);
        this.load.audio('takaaud', ['assets/audio/takapertieto.mp3']);
        this.load.audio('varpaaud', ['assets/audio/varpailtieto.mp3']);
        this.load.audio('kantaaud', ['assets/audio/kantatieto.mp3']);
        this.load.audio('elainaud', ['assets/audio/elaintieto.mp3']);
        this.load.audio('superaud', ['assets/audio/supertieto.mp3']);
    },
    create: function () {
        
        this.add.image(400,300, 'veralku');
        var seur0 = this.add.image(400, 530, 'seur');
        this.sound.play('veraud');

        seur0.setInteractive().on('pointerdown', () => {
            //ensimmäinen tietokortti ja luodaan fysiikat
            var hitbox = this.physics.add.staticGroup();
            hitbox.create(250, 460, 'hitbox');
            hitbox.create(250, 35, 'hitbox');
            this.add.image(400, 300, 'etubg'); //lataa taustan, jossa on tekstit mukana
            char = this.physics.add.sprite(200, 250, 'etuchar'); //lataa hahmon, jota voi animoida
            var seur1 = this.add.image(400, 530, 'seur'); //lataa painikkeen, josta pääsee seuraavaan
            this.anim(char, hitbox); //animoi hahmon siten, että se reagoi hitboxien kanssa
            this.time.addEvent({delay: 2500, callback: this.onEvent, loop: true}); //tekee ajoitetun animoinnin
            var etuaud = this.sound.add('etuaud'); //lisää äänen
            etuaud.play(); //pelaa äänen

            seur1.setInteractive().on('pointerdown', () => {
                etuaud.stop(); //lopettaa äänen, jos ei vielä ole loppunut
                //toinen tietokortti (muut tietokortit toimivat samoin kuin tämän ensimmäinen,
                // ekasta eteenpäin ei animointitapahtumaa uudelleen aktivoida)
                this.add.image(400, 300, 'takabg');
                char = this.physics.add.sprite(200, 250, 'takachar');
                var seur2 = this.add.image(400, 530, 'seur');
                this.anim(char, hitbox);
                var takaaud = this.sound.add('takaaud');
                takaaud.play();
    
                seur2.setInteractive().on('pointerdown', () => {
                    takaaud.stop();
                    //kolmas tietokortti
                    this.add.image(400, 300, 'varpabg');
                    char = this.physics.add.sprite(200, 250, 'varpachar');
                    var seur3 = this.add.image(400, 530, 'seur');
                    this.anim(char, hitbox);
                    var varpaaud = this.sound.add('varpaaud');
                    varpaaud.play();
    
                    seur3.setInteractive().on('pointerdown', () => {
                        varpaaud.stop();
                        //neljäs tietokortti
                        this.add.image(400, 300, 'kantabg');
                        char = this.physics.add.sprite(200, 250, 'kantachar');
                        var seur4 = this.add.image(400, 530, 'seur');
                        this.anim(char, hitbox);
                        var kantaaud = this.sound.add('kantaaud');
                        kantaaud.play();
    
                        seur4.setInteractive().on('pointerdown', () => {
                            kantaaud.stop();
                            //viides tietokortti
                            this.add.image(400, 300, 'elainbg');
                            char = this.physics.add.sprite(240, 250, 'elainchar');
                            var seur5 = this.add.image(400, 530, 'seur');
                            this.anim(char, hitbox);
                            var elainaud = this.sound.add('elainaud');
                            elainaud.play();
    
                            seur5.setInteractive().on('pointerdown', () => {
                                elainaud.stop();
                                //kuudes tietokortti
                                this.add.image(400, 300, 'superbg');
                                char = this.physics.add.sprite(230, 270, 'superchar');
                                var seur6 = this.add.image(400, 530, 'seur');
                                this.anim(char, hitbox);
                                var superaud = this.sound.add('superaud');
                                superaud.play();
    
                                seur6.setInteractive().on('pointerdown', () => {
                                    superaud.stop();
                                    //seuraava kenttä
                                    this.scene.start("Voimailu");
                                });
                            });
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

    