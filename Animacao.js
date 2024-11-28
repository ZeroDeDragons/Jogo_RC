export const createAnimations = (game) =>{
    game.anims.create({
        key: 'Correr',
        frames: game.anims.generateFrameNumbers("correndo", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'parado',
        frames: game.anims.generateFrameNumbers("parado", { start: 0, end: 5 }),
        frameRate: 15,
        repeat: -1
    });

    game.anims.create({
        key: 'pularcima',
        frames: game.anims.generateFrameNumbers("pularcima", { start: 0, end: 1 }),
        frameRate: 10,
        repeat: 1
    });
}