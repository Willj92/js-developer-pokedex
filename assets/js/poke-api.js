

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;



    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.abilities = abilities;

    pokemon.height = (pokeDetail.height/10).toFixed(1);
    pokemon.weight = (pokeDetail.weight/10).toFixed(1);

    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name);
    pokemon.moves = moves;

    const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name);
    pokemon.stats = stats;

    const baseStats = pokeDetail.stats.map((baseStatsSlot) => baseStatsSlot.base_stat);
    pokemon.baseStats = baseStats;

    return pokemon;

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset= 0, limit = 20) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) =>jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}




