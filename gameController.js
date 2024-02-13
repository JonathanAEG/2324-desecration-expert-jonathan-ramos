const setOpponets = require('./src/setOpponents');
const setInitialdata = require('./src/calculateInitialData');
const Dice = require('./src/Dice');
const gameLoop = require('./src/gameLoop');


const game = (heroes)=>{

    const initialVillainZarate = setOpponets.setVillainZarate(heroes);
    const initialSuperHero = setOpponets.setSuperHero(heroes);

    const villainZarate = setInitialdata(initialVillainZarate);
    const superHero = setInitialdata(initialSuperHero);

    const heroArray = [villainZarate, superHero];

    gameLoop(heroArray);
}

module.exports={
    game
}


