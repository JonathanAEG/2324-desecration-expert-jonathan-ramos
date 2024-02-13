const gameService = require('./gameService');
const gameController = require('./gameController');

const execute = async ()=>{

    const heroes = await gameService.getAllHeroes();

    gameController.game(heroes);
}

execute();