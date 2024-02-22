
module.exports = class Dice {

    static dice1D100() {
        return Math.floor(Math.random()*(100)+1)
    }

    static dice1D10() {
        return Math.floor(Math.random()*(10)+1)
    }

    static dice1D20(){
        return Math.floor(Math.random()*(20)+1)
    }

    static dice1D3(){
        return Math.floor(Math.random()*(3)+1)
    }

    static dice2D3(){

        let value = 0

        for(let i = 0; i < 2; i++){
            value += Math.floor(Math.random()*(3)+1);
        }

        return value;
    }

    static dice4D3(){

        let value = 0;

        for(let i = 0; i < 4; i++){
            value += Math.floor(Math.random()*(3)+1);
        }
        
        return value;
    }

    static dice3D5(){

        let value = 0;

        for(let i = 0; i < 3; i++){
            value += Math.floor(Math.random()*(5)+1);
        }
        
        return value;
    }
}