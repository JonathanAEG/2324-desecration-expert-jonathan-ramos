const Dice = require("./Dice");

 
const createErudito = ()=>{

    const anger = Dice.dice1D20();

    const eruditoXG = {
        name: "El Erudito X.G.",
        angerLevel: anger,
        hpw: 1 + anger,
        hpg: "Invincible"
    }

    return eruditoXG;
}

const setEruditoSpawn = ()=>{

    return Math.floor(Math.random()*(5-3+1)+3);
}

const eruditoLogic = (currentHero, adversary, heroArray)=>{

    console.log("---------------------------");
    console.log(`El Erudito X.G. a aparecido en la sala`)
    console.log(`Ha perdido las gafas,  entre el caos ${heroArray[currentHero].name} las ha recogido y se las ha puesto`)

    const anger = Dice.dice1D20();


    if(anger >= 1 && anger <= 3){

        if(heroArray[currentHero].leftArmEffect !== true){

            console.log(`FAIL!! ${heroArray[currentHero].name} obtiene un ${anger} y se lesiona el brazo izquierdo`);

            heroArray[currentHero].leftArmEffect = true;
            heroArray = applyFumble(currentHero, heroArray);
        }

    }else if(anger >= 4 && anger <= 6){
        
        if(heroArray[currentHero].rightArmEffect !== true){

            console.log(`FAIL!! ${heroArray[currentHero].name} obtiene un ${anger} y se lesiona el brazo derecho`);

            heroArray[currentHero].rightArmEffect = true;
            heroArray = applyFumble(currentHero, heroArray);
        }
    }
    // else if(anger >= 7 && anger <= 9){
    //     console.log("caos");


    // }else if(anger >= 10 && anger <= 13){
    //     console.log("Aullido");


    // }else if(anger >= 14 && anger <= 16){
    //     console.log("granuja");


    // }else if(anger >= 17 && anger <= 18){

    //     console.log("perspicaz");

    // }else if(anger >= 19 && anger <= 20){
    //     console.log("endemoniado");
    // }

    if(heroArray[currentHero].rightArmEffect === true && heroArray[currentHero].leftArmEffect === true){
            
        heroArray[currentHero].strength = heroArray[currentHero].strengthMax * 0.25;
        console.log(`${heroArray[currentHero].name} se ha lesionado los dos brazos.`)
    }
    console.log(heroArray);

    return heroArray;
}

const applyFumble = (currentHero, heroArray)=>{

    heroArray[currentHero].hitPoints -= Dice.dice1D20();
    heroArray[currentHero].strength /=2;

    return heroArray;
}



module.exports ={
    setEruditoSpawn,
    createErudito,
    eruditoLogic
}