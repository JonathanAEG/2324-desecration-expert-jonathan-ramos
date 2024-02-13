
const calculateInitiative = (hero)=>{

    return hero.intelligence + hero.power;
}

const calculateHP = (hero)=>{

    let hp = hero.strength * 10;

    if(hp > 666){
        hp = 666;
    }   

    return hp;
}

 setInitialData = (hero)=>{

    const initiative = calculateInitiative(hero);
    const hitPoints = calculateHP(hero);
    
    const newHero = hero;

    newHero.initiative = initiative;
    newHero.hitPoints = hitPoints;

    return newHero;
}

module.exports = setInitialData

