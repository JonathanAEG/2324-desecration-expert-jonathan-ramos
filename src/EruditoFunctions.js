const Dice = require("./Dice");

 
const createErudito = ()=>{

    const anger = Dice.dice1D20();

    const eruditoXG = {
        name: "El Erudito X.G.",
        angerLevel: anger,
        hpw: 1 + anger,
        hpg: "Invincible",
        isAlive: true
    }

    return eruditoXG;
}

const setEruditoSpawn = ()=>{

    return Math.floor(Math.random()*(5-3+1)+3);
}

const eruditoLogic = (currentHero, adversary, heroArray, eruditoXG)=>{

    console.log("---------------------------");
    console.log(`El Erudito X.G. a aparecido en la sala`);
    console.log(`Ha perdido las gafas, entre el caos ${heroArray[currentHero].name} las ha recogido y se las ha puesto`);
    
    let isHeroWithGlasses = true;

    while(isHeroWithGlasses && eruditoXG.isAlive){

        console.log("---------------------------");
        console.log(`${heroArray[currentHero].name} con las gafas puestas, a pesar de no poder ver suficientemente bien, se dispone a actuar.`);

        const anger = Dice.dice1D20();

        isHeroWithGlasses = false;

        if(anger >= 1 && anger <= 3){
            
            if(heroArray[currentHero].leftArmEffect !== true){
    
                console.log(`FAIL!! ${heroArray[currentHero].name} obtiene un ${anger} y se lesiona el brazo izquierdo`);
    
                heroArray[currentHero].leftArmEffect = true;
                applyFumble(currentHero, heroArray);     
                
                if(heroArray[currentHero].rightArmEffect === true && heroArray[currentHero].leftArmEffect === true){
                
                    heroArray[currentHero].strength = heroArray[currentHero].strengthMax * 0.25;
                    console.log(`${heroArray[currentHero].name} se ha lesionado los dos brazos.`)
                }

                console.log(heroArray[currentHero]);
                console.log(`El erudito, despues de la acción de ${heroArray[currentHero].name}, consiguie quitarle las gafas y desaparece.`)
            }else{

                console.log(`FAIL!! ${heroArray[currentHero].name} obtiene un ${anger} y cuando se va a lesionar el brazo izquiero se da cuenta de lo que va a hacer y para.`);
                console.log(`El erudito, despues de la acción de ${heroArray[currentHero].name}, consiguie quitarle las gafas y desaparece.`)
            }
        }else if(anger >= 4 && anger <= 6){
            
            if(heroArray[currentHero].rightArmEffect !== true){
    
                console.log(`FAIL!! ${heroArray[currentHero].name} obtiene un ${anger} y se lesiona el brazo derecho`);
    
                heroArray[currentHero].rightArmEffect = true;
                applyFumble(currentHero, heroArray);
    
                if(heroArray[currentHero].rightArmEffect === true && heroArray[currentHero].leftArmEffect === true){
                
                    heroArray[currentHero].strength = heroArray[currentHero].strengthMax * 0.25;
                    console.log(`${heroArray[currentHero].name} se ha lesionado los dos brazos.`)
                }
                console.log(heroArray[currentHero]);
                console.log(`El erudito, despues de la acción de ${heroArray[currentHero].name}, consiguie quitarle las gafas y desaparece.`)
            }else{
                console.log(`FAIL!! ${heroArray[currentHero].name} obtiene un ${anger} y cuando se va a lesionar el brazo derecho se da cuenta de lo que va a hacer y para.`);
                console.log(`El erudito, despues de la acción de ${heroArray[currentHero].name}, consiguie quitarle las gafas y desaparece.`)
            }

        }else if(anger >= 7 && anger <= 9){
            console.log(`${heroArray[currentHero].name} obtiene un ${anger}, pierde la memoria y se ve incapaz de atacar. El Erudito X.G se lleva las gafas, desaparece y el combate vuelve a la normalidad. Todo parece haber sido una ilusión.`);
    
    
        }else if(anger >= 10 && anger <= 13){
    
            const damage = Dice.dice1D10();
    
            eruditoXG.hpw -= damage;
    
            console.log(`${heroArray[currentHero].name} obtiene un ${anger}. El Erudito grita "tú eres tonto". Momento en el que ${heroArray[currentHero].name} descubre su posición y le ataca aplicandole ${damage} de daño.`);
            console.log(eruditoXG);

            if(eruditoXG.hpw <= 0){

                eruditoXG.isAlive = false;
                console.log(`Las gafas del Erudito se desacen como arena  en la cara de ${heroArray[currentHero].name} y se escucha "tù eres tonto" los combatientes se miran asombrados y siguen con la batalla.`)
            }else{
                console.log(`El erudito, despues de la acción de ${heroArray[currentHero].name}, consiguie quitarle las gafas y desaparece.`)
            }

        }else if(anger >= 14 && anger <= 16){

            console.log(`${heroArray[currentHero].name} obtiene un ${anger} y al ver a ${heroArray[adversary].name} despistado consigue ponerle las gafas`);
            isHeroWithGlasses = true;
            currentHero = setcurrentHero(currentHero, heroArray);
            adversary = setAdversary(currentHero, heroArray);
        }
        else if(anger >= 17 && anger <= 18){
    
            const damage = Dice.dice1D10();
    
            console.log(`${heroArray[currentHero].name} obtiene un ${anger} y el Erudito entre la confusión lo detecta le grita "tú eres tonto" y le quita las gafas.`);
            console.log(`En este punto  ${heroArray[currentHero].name} consigue un ${damage} y cuando intenta atacar al Erudito se da cuenta de que no le puede hacer daño.`)
            console.log(`El erudito, despues de la acción de ${heroArray[currentHero].name}, consiguie quitarle las gafas y desaparece.`)
    
        }else if(anger >= 19 && anger <= 20){
                
            eruditoXG.isAlive = false;
            console.log(`${heroArray[currentHero].name} obtiene un ${anger} desatando todo el caos del Erudito persiguiendole y acaba cortandole la cabeza.`)
            console.log(`Las gafas del Erudito se desacen como arena  en la cara de ${heroArray[currentHero].name} y se escucha "tù eres tonto" los combatientes se miran asombrados y siguen con la batalla.`)
        }
    }
    
}

const applyFumble = (currentHero, heroArray)=>{

    heroArray[currentHero].hitPoints -= Dice.dice1D20();
    heroArray[currentHero].strength /=2;

    return heroArray;
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


module.exports ={
    setEruditoSpawn,
    createErudito,
    eruditoLogic
}