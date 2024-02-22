const Dice = require("./Dice");
const { setEruditoSpawn, eruditoLogic, createErudito } = require("./EruditoFunctions");

module.exports =  gameLoop = (heroArray)=>{

    let turnIndex = 1;
    let currentHero = compareInitiative(heroArray);
    let adversary = setAdversary(currentHero, heroArray);
    let eruditoSpawn = setEruditoSpawn();
    const eruditoXG = createErudito();

    let gameOver = false;


    console.log("---------------------------");
    console.log("---------------------------");
    console.log(`El Primer asalto es para: ${heroArray[currentHero].name}`);

    while(!gameOver){
        
        console.log("---------------------------");
        console.log(`Comienza el asalto ${turnIndex}`);
        console.log("---------------------------");
        console.log(`El asalto es para: ${heroArray[currentHero].name}`);

        setAttack(heroArray, currentHero, adversary);

        if(eruditoXG.isAlive){
            if(eruditoSpawn === 0){
                eruditoLogic(currentHero, adversary, heroArray, eruditoXG);
                
                eruditoSpawn = setEruditoSpawn();
            }else{
                eruditoSpawn--;
            }
        }

        turnIndex ++;
        currentHero = setcurrentHero(currentHero, heroArray);
        adversary = setAdversary(currentHero, heroArray);
        gameOver = checkGameOver(heroArray);
    }
}


const compareInitiative = (heroArray)=>{

    const hero = heroArray.reduce((previous, current)=>{
        return (previous && previous.initiative > current.initiative) ? previous : current;
    })
    
    return heroArray.indexOf(hero);
}

const setcurrentHero = (currentHero, heroArray)=>{

    currentHero++;

    if(currentHero >= heroArray.length){
        currentHero = 0;
    }

    return currentHero;
}

const setAdversary = (currentHero, heroArray)=>{

    const currentHeroObject = heroArray[currentHero];

    const filteredArray = heroArray.filter((hero)=> currentHeroObject.name !== hero.name);

    return heroArray.indexOf(filteredArray[0]);
}

const checkGameOver = (heroArray)=>{

    const eliminatedHeroes = heroArray.filter((hero)=>hero.hitPoints <= 0);

    if(eliminatedHeroes.length === 0){
        return false;
    }
    console.log("---------------------------");
    console.log("---------------------------");

    console.log(`${eliminatedHeroes[0].name} ha sido derrotado`);

    return true;
}

const setAttack = (heroArray, currentHero, adversary)=>{

    const value = Dice.dice1D100();
    

    if(value <= heroArray[currentHero].combat){

        console.log(`${heroArray[currentHero].name} obtiene un ${value} y ataca con éxito`);

        successAttack(heroArray, currentHero, adversary)

    }else{
        console.log(`${heroArray[currentHero].name} obtiene un ${value} y ha fallado`);
    }
}


const successAttack = (heroArray, currentHero, adversary)=>{

    const diceValue = Dice.dice1D20();

    if(diceValue <= 2){

        const fumbleDamage = fumbleAttack(heroArray, currentHero, diceValue);

        applyFumbleDamage(heroArray, currentHero, fumbleDamage);

        console.log(`FAIL!! ${heroArray[currentHero].name} obtiene un ${diceValue} y se clava el arma en su pierna izquierda. Recibe un daño de ${fumbleDamage} puntos`);
        console.log(heroArray);


    }else if(diceValue >=3 && diceValue <= 17){

        const normalDamage = normalAttack(heroArray, currentHero, diceValue)

        heroArray = applyDamageToAdversary(heroArray, adversary, normalDamage);

        console.log(`${heroArray[currentHero].name} obtiene un ${diceValue}, empuña su arma y ejerce un daño de ${normalDamage} puntos`);
        console.log(heroArray);


    }else{
        const criticalDamage = criticalAttack(heroArray, currentHero, diceValue);

        heroArray = applyDamageToAdversary(heroArray, adversary, criticalDamage);

        console.log(`CRITICAL HIT!! ${heroArray[currentHero].name} obtiene un ${diceValue} y ejerce un daño de ${criticalDamage} puntos`);
        console.log(heroArray);
    }
}

const normalAttack = (heroArray, currentHero, diceValue)=>{

    return Math.ceil((heroArray[currentHero].power + heroArray[currentHero].strength) * diceValue /100);
}

const criticalAttack = (heroArray, currentHero, diceValue)=>{


    if(diceValue === 18){
        
        const normalDamage = Math.ceil((heroArray[currentHero].power + heroArray[currentHero].strength) * diceValue /100);
        const criticalDamage = Math.ceil(heroArray[currentHero].intelligence * heroArray[currentHero].durability / 100 * Dice.dice1D3());

        const totalCriticalDamage = normalDamage + criticalDamage;

        return totalCriticalDamage;
    }else if(diceValue === 19){

        const normalDamage = Math.ceil((heroArray[currentHero].power + heroArray[currentHero].strength) * diceValue /100);
        const criticalDamage = Math.ceil(heroArray[currentHero].intelligence * heroArray[currentHero].durability / 100 * Dice.dice2D3());
        
        const totalCriticalDamage = normalDamage + criticalDamage;
        
        return totalCriticalDamage;
    }else{
        const normalDamage = Math.ceil((heroArray[currentHero].power + heroArray[currentHero].strength) * diceValue /100);
        const criticalDamage = Math.ceil(heroArray[currentHero].intelligence * heroArray[currentHero].durability / 100 * Dice.dice3D5());
        
        const totalCriticalDamage = normalDamage + criticalDamage;

        return totalCriticalDamage;
    }
}

const fumbleAttack = (heroArray, currentHero, diceValue)=>{

    if(diceValue === 2){

        return Math.ceil(heroArray[currentHero].speed / Dice.dice1D3());
    }else{
        return Math.ceil(heroArray[currentHero].speed / Dice.dice4D3());
    }
}

const applyDamageToAdversary = (heroArray,adversary, damage)=>{

    heroArray[adversary].hitPoints -= damage;
    return heroArray;
}

const applyFumbleDamage = (heroArray, currentHero, damage)=>{

    heroArray[currentHero].hitPoints -= damage;
    return heroArray;
}
