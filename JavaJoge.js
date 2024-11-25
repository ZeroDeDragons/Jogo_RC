const Phaser = require('phaser')
var config = {
    type: Phaser.AUTO,
    with: 800,
    heigth: 500,
    scene:{
        preload: preload,
        create: create,
        update:update
    }
};
var game = new Phaser.game(config);

function preload()
{
    this.load.spritesheet('parado','Pai_natal_ataca_novamente',{frameWidth:29,frameHeigth:32})
}
function create()
{
    this.add.spritesheet(200,200,'parado');
}
function update()
{

}