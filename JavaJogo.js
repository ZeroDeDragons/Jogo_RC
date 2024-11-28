var config = {
    type: Phaser.AUTO,
    with: 800,
    height: 600,
    pixelArt: false,  // Desativa a opção 'pixelArt' (importante para evitar pixelização)
    antialias: true,  // Habilita a suavização
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
var score = 0;
var scoreText;
var game = new Phaser.Game(config);

function preload() {
    this.load.image("PlataformaC", "Pai_natal_ataca_novamente/Moving Platfrom_C.png"); 
    this.load.image("predio", "Pai_natal_ataca_novamente/predio.png"); 
    this.load.spritesheet("parado", "Pai_natal_ataca_novamente/parado.png",{frameWidth:29, frameHeight:32}); 
    this.load.spritesheet("pularcima", "Pai_natal_ataca_novamente/pularcima.png",{frameWidth:29, frameHeight:32}); 
    this.load.spritesheet("correndo", "Pai_natal_ataca_novamente/correr.png",{frameWidth:32, frameHeight:32}); 
    this.load.spritesheet("presentes", "Pai_natal_ataca_novamente/presentes.png",{frameWidth:26, frameHeight:30}); 

    //this.load.image("Plataforma", "assets/platform.png"); 
    //this.load.image("night", "assets/star.png"); 
    //this.load.image("night", "assets/"); 

}

function create() {
    
    for(var x = 128; x <= 928; x +=250)
    {this.add.image(x, 370, "predio")}
    
    platforms = this.physics.add.staticGroup();
    var chao = 500;
    for(var x = 49; x <= 975; x +=148)
    {platforms.create(x, chao, "PlataformaC")}
    
    platforms.getChildren().forEach(function(plataforma) {
        plataforma.setScale(1.5);  // Aumenta a escala de cada plataforma
        plataforma.setSize(plataforma.width * 1.5, plataforma.height * 1.5);  // Ajusta a colisão
    });
    
    player = this.physics.add.sprite(430,400,'parado').setScale(1.5);;
    player.setCollideWorldBounds(); 
    player.setBounce(0.2);
    
    this.anims.create({
        key: 'Parado',
        frames: this.anims.generateFrameNumbers('parado', { start: 0, end: 6 }),
        frameRate: 7,  // Corrigido de "frameRete" para "frameRate"
        repeat: -1
    });

    this.anims.create({
        key: 'Pularcima',
        frames: this.anims.generateFrameNumbers('pularcima', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Correr',
        frames: this.anims.generateFrameNumbers('correndo', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    // Adicionando o grupo de presentes
    Presentes = this.physics.add.group({
        key: "presentes",
        repeat: 11,        // 12 objetos no total
        setXY: { x: 5, y: 0, stepX: 70 }
    });
    
    // Atribuindo física aos presentes (exemplo)
    Presentes.getChildren().forEach(function(child) {
        const randomFrame = Phaser.Math.Between(0, 11);  // Seleciona um frame aleatório entre 0 e 11
        child.setFrame(randomFrame);
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));  // Configura o pulo para cada presente
    });

    player.body.setGravityY(200);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(Presentes, platforms);

    teclas = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(player,Presentes,Pegar_estrela,null,true);
    
    //score
    scoreText = this.add.text(16,16,'Pontuação: '+score,{fontSize:'32px', fill: '#999'});
}

function update() {
    function Movimento(x, Anims, MA, Invert) {
        player.setVelocityX(x);  
        player.anims.play(Anims, true).setScale(1.5);;  // Corrigido: o segundo argumento sempre "true"
        player.setFlipX(Invert);
    }
    var pular = (teclas.up.isDown || teclas.space.isDown) && player.body.touching.down; 
    
    if (teclas.left.isDown && pular) {
        Movimento(-150, "Correr", true, true);
        player.setVelocityY(-200);  // Pulo
        player.anims.play("Pularcima", true);  // Animação de pulo
    } else if (teclas.right.isDown && pular) {
        Movimento(150, "Correr", true, false);
        player.setVelocityY(-200);  // Pulo
        player.anims.play("Pularcima", true);  // Animação de pulo
    } else if (teclas.left.isDown) {
        Movimento(-150, "Correr", true, true);
    } else if (teclas.right.isDown) {
        Movimento(150, "Correr", true, false);
    } else if ((teclas.up.isDown || teclas.space.isDown)&& player.body.touching.down)
    {
        player.setVelocityY(-200);  // Pulo
        player.anims.play("Pularcima", true);  // Animação de pulo
    }
     else {
        Movimento(0,"Parado", false, false);  // Animação parada
    }

}
//presente player pegando
function Pegar_estrela(player,Presentes)
{
    Presentes.disableBody(true,true);
    score+=1;
    scoreText.setText("Pontuação: "+score);

}