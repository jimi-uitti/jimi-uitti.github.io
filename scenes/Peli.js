var delcount = 0;
var vaarin;
var char;
var hitbox;

var Peli = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {"key": "Peli"});
    },
    init: function() {},
    preload: function() {
        // ladataan kuvat
        this.load.image('bg', 'assets/bg/peli.png');
        this.load.image('alkuverryttely', 'assets/icon/alkuverryttely.png');
        this.load.image('voimailu', 'assets/icon/voimailu.png');
        this.load.image('taito', 'assets/icon/taito.png');
        this.load.image('notkistelut', 'assets/icon/notkistelut.png');
        this.load.image('etuchar', 'assets/char/etuperin.png');
        this.load.image('takachar', 'assets/char/takaperin.png');
        this.load.image('varpachar', 'assets/char/varpailla.png');
        this.load.image('kantachar', 'assets/char/kanta.png');
        this.load.image('elainchar', 'assets/char/elain.png');
        this.load.image('superchar', 'assets/char/super.png');
        this.load.image('kyykkychar', 'assets/char/kyykky.png');
        this.load.image('vatsachar', 'assets/char/vatsa.png');
        this.load.image('punnerchar', 'assets/char/punnerrus.png');
        this.load.image('lentochar', 'assets/char/lento.png');
        this.load.image('kiipeilychar', 'assets/char/kiipeily.png');
        this.load.image('roikkuchar', 'assets/char/roikkuminen.png');
        this.load.image('hyppaachar', 'assets/char/hyppaaminen.png');
        this.load.image('tasachar', 'assets/char/tasapaino.png');
        this.load.image('kurkochar', 'assets/char/kurkotus.png');
        this.load.image('spagachar', 'assets/char/spagaatti.png');
        this.load.image('spirachar', 'assets/char/spiraali.png');
        this.load.image('textbg', 'assets/icon/textbg.png');
        this.load.image('collision', 'assets/icon/collision.png');
        this.load.image('seuraava', 'assets/icon/seuraava.png');
        this.load.image('kuvabg', 'assets/bg/kuvabg.png');
        this.load.image('vaarin', 'assets/icon/vaarin.png');
        this.load.image('hitbox', 'assets/bg/anim_hitbox.png');
        //ladataan äänet
        this.load.audio('etuaudio', ['assets/audio/etuperin.mp3']);
        this.load.audio('takaaudio', ['assets/audio/takaperin.mp3']);
        this.load.audio('varpaaudio', ['assets/audio/varpailla.mp3']);
        this.load.audio('kantaaudio', ['assets/audio/kanta.mp3']);
        this.load.audio('elainaudio', ['assets/audio/elain.mp3']);
        this.load.audio('superaudio', ['assets/audio/super.mp3']);
        this.load.audio('kyykkyaudio', ['assets/audio/kyykky.mp3']);
        this.load.audio('vatsaaudio', ['assets/audio/vatsa.mp3']);
        this.load.audio('punneraudio', ['assets/audio/punnerrus.mp3']);
        this.load.audio('lentoaudio', ['assets/audio/lento.mp3']);
        this.load.audio('kiipeilyaudio', ['assets/audio/kiipeily.mp3']);
        this.load.audio('roikkuaudio', ['assets/audio/roikku.mp3']);
        this.load.audio('hyppaaaudio', ['assets/audio/hyppaa.mp3']);
        this.load.audio('tasaaudio', ['assets/audio/tasapaino.mp3']);
        this.load.audio('kurkoaudio', ['assets/audio/kurkotus.mp3']);
        this.load.audio('spagaaudio', ['assets/audio/spagaatti.mp3']);
        this.load.audio('spiraaudio', ['assets/audio/spiraali.mp3']);
        this.load.audio('oikeinaudio', ['assets/audio/oikein.mp3']);
        this.load.audio('vaarinaudio', ['assets/audio/vaarin.mp3']);
    },
    // koodi, joka aktivoidaan pelin aloittaessa.
    create: function () {
        hitbox = this.physics.add.staticGroup();
        hitbox.create(400, 5, 'hitbox');
        hitbox.create(400, 450, 'hitbox');
        this.add.image(400, 300, 'bg');
        var alkuimg = this.add.image(180, 140, 'alkuverryttely');
        var alku = this.add.image(180, 140, 'collision');
        this.physics.add.existing(alkuimg);
        var voimailuimg = this.add.image(180, 450, 'voimailu');
        var voimailu = this.add.image(180, 450, 'collision');
        this.physics.add.existing(voimailuimg);
        var taitoimg = this.add.image(620, 140, 'taito');
        var taito = this.add.image(620, 140, 'collision');
        this.physics.add.existing(taitoimg);
        var notkisteluimg = this.add.image(620, 450, 'notkistelut');
        var notkistelut = this.add.image(620, 450, 'collision');
        this.physics.add.existing(notkisteluimg);

        var arr = [];
        //tehdään objektit, jotka koostuvat liikkeiden tiedoista
        const etu = {liike:"e-tu-pe-rin kä-ve-ly", tyyli:'alkuverryttely', kuva:'etuchar', audio: 'etuaudio'};
        Phaser.Utils.Array.Add(arr, etu);
        const taka = {liike:"ta-ka-pe-rin kä-ve-ly", tyyli:'alkuverryttely', kuva: 'takachar', audio: 'takaaudio'};
        Phaser.Utils.Array.Add(arr, taka);
        const varpa = {liike:"var-pail-la kä-ve-ly", tyyli:'alkuverryttely', kuva: 'varpachar', audio: 'varpaaudio'};
        Phaser.Utils.Array.Add(arr, varpa);
        const kanta = {liike:"kan-ta-pä-il-lä kä-ve-ly", tyyli:'alkuverryttely', kuva: 'kantachar', audio: 'kantaaudio'};
        Phaser.Utils.Array.Add(arr, kanta);
        const elain = {liike:"Liik-ku-mi-nen e-läi-me-nä", tyyli:'alkuverryttely', kuva: 'elainchar', audio: 'elainaudio'};
        Phaser.Utils.Array.Add(arr, elain);
        const supkav = {liike:"Liik-ku-mi-nen su-per-san-ka-ri-na", tyyli:'alkuverryttely', kuva: 'superchar', audio: 'superaudio'};
        Phaser.Utils.Array.Add(arr, supkav);

        const kyykky = {liike:"kyyk-ky", tyyli:'voimailu', kuva:'kyykkychar', audio:'kyykkyaudio'};
        Phaser.Utils.Array.Add(arr, kyykky);
        const vatsa = {liike:"vat-sa-ru-tis-tus", tyyli:'voimailu', kuva:'vatsachar', audio:'vatsaaudio'};
        Phaser.Utils.Array.Add(arr, vatsa);
        const punner = {liike:"pun-ner-rus", tyyli:'voimailu', kuva:'punnerchar', audio:'punneraudio'};
        Phaser.Utils.Array.Add(arr, punner);
        const lento = {liike:"Su-per-san-ka-rin len-to-a-sen-to", tyyli:'voimailu', kuva:'lentochar', audio:'lentoaudio'};
        Phaser.Utils.Array.Add(arr, lento);

        const kiip = {liike:"kii-pei-ly", tyyli:'taito', kuva:'kiipeilychar', audio:'kiipeilyaudio'};
        Phaser.Utils.Array.Add(arr, kiip);
        const roikku = {liike:"roik-ku-mi-nen", tyyli:'taito', kuva:'roikkuchar', audio:'roikkuaudio'};
        Phaser.Utils.Array.Add(arr, roikku);
        const hyppaa = {liike:"hyp-pää-mi-nen", tyyli:'taito', kuva:'hyppaachar', audio:'hyppaaaudio'};
        Phaser.Utils.Array.Add(arr, hyppaa);
        const tasa = {liike:"ta-sa-pai-noi-lu", tyyli:'taito', kuva:'tasachar', audio:'tasaaudio'};
        Phaser.Utils.Array.Add(arr, tasa);

        const kurko = {liike:"kur-ko-tus", tyyli:'notkistelu', kuva:'kurkochar', audio:'kurkoaudio'};
        Phaser.Utils.Array.Add(arr, kurko);
        const spaga = {liike:"spa-gaat-ti", tyyli:'notkistelu', kuva:'spagachar', audio:'spagaaudio'};
        Phaser.Utils.Array.Add(arr, spaga);
        const spira = {liike:"spi-raa-li", tyyli:'notkistelu', kuva:'spirachar', audio:'spiraaudio'};
        Phaser.Utils.Array.Add(arr, spira);

        //Sekoitetaan array, jolloin liikkeet tulevat aina eri järjestyksessä
        Phaser.Utils.Array.Shuffle(arr);
        console.log(arr);
        var size = 17;
        // size on arrayn koko, kun ensimmäinen on 0
        var count = 0;
        var current = Phaser.Utils.Array.GetFirst(arr);
        this.item(alku, voimailu, taito, notkistelut, current);
            this.input.on('dragend', function(pointer, gameObject) {
                if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), alku.getBounds() )){
                    if(current.tyyli == 'alkuverryttely'){
                        count++;
                        Phaser.Utils.Array.RotateLeft(arr);
                        gameObject.destroy();
                        var prev = current;
                        current = Phaser.Utils.Array.GetFirst(arr);
                        this.ShowNext(alku, voimailu, taito, notkistelut, current, prev, count);
                    }
                    else{
                        console.log("väärin");
                        this.vaarin = this.add.image(400, 300, 'vaarin');
                        this.time.addEvent({delay: 500, callback: this.onEvent});
                        this.sound.play('vaarinaudio');
                    }
                }
                else if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), voimailu.getBounds() )){
                    if(current.tyyli == 'voimailu'){
                        count++;
                        Phaser.Utils.Array.RotateLeft(arr);
                        gameObject.destroy();
                        var prev = current;
                        current = Phaser.Utils.Array.GetFirst(arr);
                        this.ShowNext(alku, voimailu, taito, notkistelut, current, prev, count);
                    }
                    else{
                        console.log("väärin");
                        this.vaarin = this.add.image(400, 300, 'vaarin');
                        this.time.addEvent({delay: 500, callback: this.onEvent});
                        this.sound.play('vaarinaudio');
                    }
                }
                else if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), taito.getBounds() )){
                    if(current.tyyli == 'taito'){
                        count++;
                        Phaser.Utils.Array.RotateLeft(arr);
                        gameObject.destroy();
                        var prev = current;
                        current = Phaser.Utils.Array.GetFirst(arr);
                        this.ShowNext(alku, voimailu, taito, notkistelut, current, prev, count);
                    }
                    else{
                        console.log("väärin");
                        this.vaarin = this.add.image(400, 300, 'vaarin');
                        this.time.addEvent({delay: 500, callback: this.onEvent});
                        this.sound.play('vaarinaudio');
                    }
                }
                else if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), notkistelut.getBounds() )){
                    if(current.tyyli == 'notkistelu'){
                        count++;
                        Phaser.Utils.Array.RotateLeft(arr);
                        gameObject.destroy();
                        var prev = current;
                        current = Phaser.Utils.Array.GetFirst(arr);
                        this.ShowNext(alku, voimailu, taito, notkistelut, current, prev, count);
                    }
                    else{
                        console.log("väärin");
                        this.vaarin = this.add.image(400, 300, 'vaarin');
                        this.time.addEvent({delay: 500, callback: this.onEvent});
                        this.sound.play('vaarinaudio');
                    }
                }
                console.log(count);
            }, this);
    },
    // koodi, joka käydään jatkuvasti läpi.
    update: function () {
        if (delcount == 1){
            this.vaarin.destroy();
            delcount = 0;
        }
    },
    onEvent: function() {
        delcount = 1;
    },
    
    item: function(alku, voimailu, taito, notkistelut, current) {
            var text = this.add.text(0, 0, current.liike, {
                fontFamily:'arial',
            }).setFontSize(18);
            text.setOrigin(0.5);
            var textbg = this.add.image(0,0, 'textbg');
            var container = this.add.container(400, 300, [textbg, text]);
            this.physics.add.existing(text);
            container.setSize(textbg.width, textbg.height);
            container.setInteractive();
            this.input.setDraggable(container);
            container.on('pointerover', function () {
                textbg.setTint(0x333333);
            });
            container.on('pointerout', function () {
                textbg.clearTint();
            });
            this.sound.play(current.audio);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
                if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), alku.getBounds())){
                    textbg.setTint(0x2222ff);
                }
                else if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), voimailu.getBounds())){
                    textbg.setTint(0xff3311);
                }
                else if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), taito.getBounds())){
                    textbg.setTint(0xffaa11);
                }
                else if(Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), notkistelut.getBounds())){
                    textbg.setTint(0x55ff55);
                }
                else{
                    textbg.clearTint();
                }
            }, this);
    },

    ShowNext: function(alku, voimailu, taito, notkistelut, current, prev, count) {
        var imgbg = this.add.image(400, 230, 'kuvabg');
        char = this.physics.add.sprite(400, 220, prev.kuva);
        var button = this.add.image(400, 500, 'seuraava');
        this.anim(char, hitbox);
        var time = this.time.addEvent({delay: 2500, callback: this.onEvent2, loop: true});
        this.sound.play('oikeinaudio');
        button.setInteractive().on('pointerdown', () => {
            if (count == 17){
                this.scene.start("Loppu");
            }
            else {
                imgbg.destroy();
                char.destroy();
                button.destroy();
                time.destroy();
                this.item(alku, voimailu, taito, notkistelut, current);
            }
        });
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

    onEvent2: function() {
        char.setVelocityY(-170);
    }
});