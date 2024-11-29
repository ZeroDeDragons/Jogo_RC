export const createNivels= (game) =>
{
    var tm =1.5, ultPisoPosition;
    ////////////////////////////////////////////////////////////////
    //                   Plataforma e decoracoes                  //
    ////////////////////////////////////////////////////////////////
    game.ceu = game.add.image(0,0,"sky").setOrigin(0,0)
    game.ceu.displayWidth = 2000;
    game.ceu.displayHeight = 380;
    for (var x = 0; x <= 1600; x += 400) 
    {
        game.arvoresDeFundo = game.add.image(x,129,"Arvores3").setOrigin(0,0);
        game.arvoresDeFundo.displayWidth = 400;
        game.arvoresDeFundo.displayHeight = 250;
    }
    for (var x = 0; x <= 1600; x += 400) 
    {
        game.arvoresDeFundo = game.add.image(x,129,"Arvores1").setOrigin(0,0);
        game.arvoresDeFundo.displayWidth = 400;
        game.arvoresDeFundo.displayHeight = 250;
    }
    for (var x = 0; x <= 1600; x += 400) 
        {
            game.arvoresDeFundo = game.add.image(x,129,"Arvores2").setOrigin(0,0);
            game.arvoresDeFundo.displayWidth = 400;
            game.arvoresDeFundo.displayHeight = 250;
        }
    //decorasao
    game.poste = game.physics.add.staticGroup();
    game.poste.create(92, 363, "PePoste").setOrigin(0.5, 0.5);
    game.poste.create(100, 299, "Poste").setOrigin(0.5, 0.5);

    game.piso = game.physics.add.staticGroup();
    ultPisoPosition = plataformas(game.piso,"plataformaC",0,400,389,48,false,0);
    ultPisoPosition = plataformas(game.piso,"plataformaC",0,400,405,48,true,3);
    ultPisoPosition = plataformas(game.piso,"plataformaC",0,400,426,48,true,3) + 16*10;

    ultPisoPosition = plataformas(game.piso,"plataformaC",ultPisoPosition,15,389,48,false,0) + 16*15;
    ultPisoPosition = plataformas(game.piso,"plataformaC",ultPisoPosition,15,389,48,false,0) + 16*15;
    ultPisoPosition = plataformas(game.piso,"plataformaC",ultPisoPosition,15,389,48,false,0) + 16*15;
    ultPisoPosition = plataformas(game.piso,"plataformaC",ultPisoPosition,15,389,48,false,0) + 16*15;
    ultPisoPosition = plataformas(game.piso,"plataformaC",ultPisoPosition,15,389,48,false,0) + 16*15;
    ultPisoPosition = plataformas(game.piso,"plataformaC",ultPisoPosition,15,389,48,false,0) + 16*15;
}

function plataformas(piso,tpiso,xi,xF,y,tmax,invert,sprites)
{
    var tm = 1.5, xf = xi + xF; 
    piso.create(xi, y, tpiso,sprites).setOrigin(0.5, 0.5).setScale(tm).flipY = invert;
    for (var x = xi+tmax; x <= xf; x += tmax) 
    {piso.create(x, y, tpiso,sprites+1).setOrigin(0.5, 0.5).setScale(tm).flipY = invert;}
    piso.create(x, y, tpiso,sprites+2).setOrigin(0.5, 0.5).setScale(tm).flipY = invert;
    return x 
}