const getAllHeroes = async ()=>{

    const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
    return await response.json();
}

module.exports={
    getAllHeroes
}