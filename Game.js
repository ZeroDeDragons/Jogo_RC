
import {  createNivels } from "./Nivel_1.js";
import { createAnimations } from "./Animacao.js";
import { createInimigos  } from "./inimigo.js";
var X = 800, Y = 400, pvelocidade = 200,ptvelocidade = pvelocidade;
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



//  Criação das plataformas  //

function preload() {
    this.load.spritesheet("plataformaC", "jogo_1/plataformaC.png", { frameWidth: 33, frameHeight: 14 });
    this.load.image("Poste", "jogo_1/00.png");
    this.load.image("CoisaPoste", "jogo_1/11.png");
    this.load.image("PePoste", "jogo_1/04.png");
    this.load.image("Arvores1", "jogo_1/Land_1.png");
    this.load.image("Arvores2", "jogo_1/Land_2.png");
    this.load.image("Arvores3", "jogo_1/Trees.png");
    this.load.image("sky", "jogo_1/sky.png");
    this.load.image("stars", "jogo_1/stars.png");
    this.load.image("Canhao1", "jogo_1/CanhaoC1.png");
    this.load.image("CanhaoB", "jogo_1/CanhaoB1.png");
    
    this.load.spritesheet("parado", "jogo_1/parado.png", { frameWidth: 29, frameHeight: 32 });
    this.load.spritesheet("correndo", "jogo_1/correr.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("pularcima", "jogo_1/pularCima.png", { frameWidth: 32, frameHeight: 32 });
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
        // Inicializando o texto para pontuação
    // this.scoreText = this.add.text(1300, 350, 'Pontuação: 0', {
    //     font: '30px Arial', 
    //     fill: '#000000', 
    //     fontStyle: 'bold'
    //     });
    //this.scoreText.setScrollFactor(1);  // O texto não se moverá com a câmera
    
}

function update() {
    const {player, keys, cameras} = this;
    // Corrigido para garantir que as expressões sejam avaliadas corretamente

    var pulo = (keys.up.isDown || keys.space.isDown) && player.body.touching.down;    
    var puloalt = -200;
    
    if (pulo) 
    {
        player.body.velocity.y += puloalt;
        player.anims.play("pularcima", true);    
    }
    if (player.body.touching.down) ptvelocidade = pvelocidade; 
    
    if (keys.right.isDown) 
    {   
        player.body.touching.down && player.anims.play("Correr", true);
        player.body.velocity.x = ptvelocidade;
        player.flipX = false; 
    }
    else if (keys.left.isDown)
    {   
        player.body.touching.down && player.anims.play("Correr", true);
        player.body.velocity.x = -ptvelocidade;
        player.flipX = true; 
    }
    else 
    {
        player.body.velocity.x = 0.01; 
        player.body.touching.down && player.anims.play("parado", true);
    } 

}