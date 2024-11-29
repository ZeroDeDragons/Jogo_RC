
import {  createNivels } from "./Nivel_1.js";
import { createAnimations } from "./Animacao.js";
import { createInimigos  } from "./inimigo.js";
import { createMovimentoPlayer  } from "./Movimento_Player.js";
var X = 800, Y = 400, ptvelocidade = 200;
// Variável de joystick declarada globalmente para ser usada nas funções
var joyStick, print;

const config = {
    type: Phaser.AUTO,
    physics:{
        default:"arcade",
        arcade:{gravity: {y: 300}},
        debug: false
    },
    width: X,
    height: Y,
    backgroundColor: '#fff',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    scene: {
        preload,
        create,
        update
    }
};

new Phaser.Game(config);

//////////////////////////////////////////////////////////////////////
//  Funções personalizadas                                          //
//////////////////////////////////////////////////////////////////////

function checkJoystickDirection(joystick, player) {
    

    var centerX = 300; // Posição inicial de X do joystick
    var centerY = 300; // Posição inicial de Y do joystick
    var deltaX = joyStick.thumb.x - centerX;
    var deltaY = joyStick.thumb.y - centerY;
    var puloalt = -200;

    // Imprimir as coordenadas para depuração
    console.log(`Joystick X: ${joystick.x}, Y: ${joystick.y}`);
    console.log(`Delta X: ${deltaX}, Delta Y: ${deltaY}, center Y: ${centerX}`);

    // Verifique a direção com base na posição
    if (deltaX > 0) {  // Para a direita
        player.body.velocity.x = ptvelocidade;
        player.flipX = false; 
        if (player.body.touching.down) {
            player.anims.play("Correr", true);
        }
    } else if (deltaX < 0) {  // Para a esquerda
        player.body.velocity.x = -ptvelocidade;
        player.flipX = true; 
        if (player.body.touching.down) {
            player.anims.play("Correr", true);
        }
    } else {  // Se o joystick não se mover horizontalmente
        player.body.velocity.x = 0; // Parar o movimento horizontal
        if (player.body.touching.down) {
            player.anims.play("parado", true);  // Animação de parado
        }
    }

    if (deltaY < 0 && player.body.touching.down) {  // Para cima (pular)
        player.body.velocity.y = puloalt;  // Ajuste o pulo
        player.anims.play("pularcima", true);
    }
}



//  Criação das plataformas  //

function preload() {
    var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);

    this.load.spritesheet("plataformaC", "Jogo_1/plataformaC.png", { frameWidth: 33, frameHeight: 14 });
    this.load.image("Poste", "Jogo_1/00.png");
    this.load.image("CoisaPoste", "Jogo_1/11.png");
    this.load.image("PePoste", "Jogo_1/04.png");
    this.load.image("Arvores1", "Jogo_1/Land_1.png");
    this.load.image("Arvores2", "Jogo_1/Land_2.png");
    this.load.image("Arvores3", "Jogo_1/Trees.png");
    this.load.image("sky", "Jogo_1/Sky.png");
    this.load.image("stars", "Jogo_1/Stars.png");
    this.load.image("Canhao1", "Jogo_1/CanhaoC1.png");
    this.load.image("CanhaoB", "Jogo_1/CanhaoB1.png");
    
    this.load.spritesheet("parado", "Jogo_1/parado.png", { frameWidth: 29, frameHeight: 32 });
    this.load.spritesheet("correndo", "Jogo_1/correr.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("pularCima", "Jogo_1/pularcima.png", { frameWidth: 32, frameHeight: 32 });
}

function create() {
    var tm = 1.5, ultPisoPosition
    //ceu
    createNivels(this);
    //criar player
    this.player = this.physics.add.sprite(100, 304, "parado").setScale(tm).setCollideWorldBounds(true);
    //
    //          Inimigo
    //
    var inimigoCanhao = this.add.container(400, 300); // O contêiner está inicialmente na posição (400, 300)
    this.inimigoC = this.physics.add.sprite(590, 274, "Canhao1").setScale(tm).setCollideWorldBounds(true);
    this.inimigoB = this.physics.add.sprite(600, 304, "CanhaoB").setScale(tm).setCollideWorldBounds(true);
    
    //criar pisos
    this.physics.world.setBounds(0,0,2000,1600);

    this.cameras.main.setBounds(0,0,2000,1600);
    this.cameras.main.startFollow(this.player, true, 0.1, 1, 0,121);

    this.keys = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player,this.piso); 
    this.physics.add.collider(this.player,this.inimigoC); 
    this.physics.add.collider(this.inimigoC, this.piso); 
    this.physics.add.collider(this.inimigoB, this.piso);
    this.physics.add.collider(this.inimigoB, this.inimigoC);
    this.inimigoC.setImmovable(true);
    createAnimations(this);
    // this.scoreText = this.add.text(400, 350, 'Distância: 0', {
    //     font: '30px Arial', 
    //     fill: '#000000', 
    //     fontStyle: 'bold'
    // });
    ///////////////////////////////////////
    //            joystick               //
    ///////////////////////////////////////
    // Certifique-se de adicionar o joystick corretamente
    joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100,  // Posição inicial do joystick
        y: 0,
        radius: 100,
        enable: true
    });
    joyStick.on('move', function (pointer, x, y, dragX, dragY) {
        console.log(`Joystick moved: x=${x}, y=${y}`);
    });
    // Verifique se o joystick foi criado corretamente
    console.log(joyStick);  // Verifique no console se o joystick foi criado

}

function update() {
    createInimigos(this);

    createMovimentoPlayer(this);
    if (joyStick) {
        // Verifique se o joystick está se movendo
        console.log(`Joystick Thumb X: ${joyStick.thumb.x}, Y: ${joyStick.thumb.y}`);
        checkJoystickDirection(joyStick, this.player);
    }
}
