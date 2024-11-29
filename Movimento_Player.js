export const createMovimentoPlayer = (game) =>
{
    const {player, keys, cameras} = game;
    var ptvelocidade = 200;
    // Corrigido para garantir que as expressões sejam avaliadas corretamente 
    var pulo = (keys.up.isDown || keys.space.isDown) && player.body.touching.down;    
    var puloalt = -200;
    if (pulo) 
        {
            player.body.velocity.y += puloalt;
            player.anims.play("pularcima", true);    
        }
        
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