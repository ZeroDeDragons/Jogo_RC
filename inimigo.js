export const createInimigos = (game) =>
{
    const {inimigoC, player} = game;
    if ( inimigoC.x - player.x > 0 && inimigoC.x - player.x >= 150)
    {
        inimigoC.flipX = false;
    }
    if ( inimigoC.x - player.x >= 0 && inimigoC.x - player.x <= -150)
    {
        inimigoC.flipX = true;
    }
}