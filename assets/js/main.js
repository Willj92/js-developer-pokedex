const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const allPokemons = [];

const maxRecords = 1010;
const limit = 20;
let offset = 0;


function listPokemon(pokemon){
    let pokeNumber = ('0000' + pokemon.number).slice(-4);
    let pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png`

    return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokeNumber}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                         ${pokemon.types.map((type) => `<li class="type ${type}Type">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemonImg}" alt="${pokemon.name}">
                </div>
            </li>
        `

}


function convertPokemonToModal(pokemon){
    let pokeNumber = ('0000' + pokemon.number).slice(-4);
    let pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png`

    return `
        <div class="modal-content ${pokemon.type}Modal">
            <header class="btnVoltar">
                <img id="fecharModal" class="fechar" src="/assets/img/arrow.png" alt="Seta para voltar a página">
            </header>
        
            <div class="pokemonModal">
                <div class="infoPokemon">   
                        <div class="nameTypePokemon">
                            <span class="name">${pokemon.name}</span>
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}Type">${type}</li>`).join('')}
                             </ol>
                        </div>
                        <div class="number">
                            <span class="number">#${pokeNumber}</span>
                        </div>                      
                </div>
                
                <img class="img" src="${pokemonImg}" alt="${pokemon.name}">
                
                <div class="menu">
                    <div onclick=showDiv('about') id="aboutDiv">About</div>
                    <div onclick=showDiv('baseStats') id="baseStatsDiv">Base Stats</div>
                    <div onclick=showDiv('moves') id="movesDiv">Moves</div>
                </div>

                <div class="contentModal aboutModal" id="about">
                    <div>
                        <ul class="list1">
                            <li><span>Abilities:</span></li>
                        </ul>
                        <ul class="list2">
                            <li>${pokemon.abilities.map((ability) => `${ability}`).join(', ')}</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="list1">
                            <li><span>Height:</span></li>
                        </ul>
                        <ul class="list2">
                            <li>${pokemon.height}m</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="list1">
                            <li><span>Weight:</span></li>
                        </ul>
                        <ul class="list2">
                            <li>${pokemon.weight}kg</li>
                        </ul>
                    </div>
                </div>
                <div class="contentModal" id="baseStats">
                    ${pokemon.stats.map((stat, index) => `
                        <div>
                            <ul class="list1">
                                <li><span class="stats">${stat}:</span>&nbsp;${pokemon.baseStats.filter((base, ind) => {
                                    if(ind === index){
                                        return base;
                                    }
                                })}&nbsp;</li>
                            </ul>
                            <ul class="list2">
                                <li class="bar">
                                    <div style="width: ${pokemon.baseStats.filter((base, ind) => ind === index).map((base, ind) => base/1.54)}%;"></div>
                                </li>
                            </ul>
                        </div>
                    `).join('')}
                </div>
                <div class="contentModal aboutModal" id="moves">
                    <div>
                        <p class="listMoves">${pokemon.moves.map((move) => `<span class="move">${move}</span>`).join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons) => {

        const newHtml = pokemons.map(listPokemon).join('');
        pokemonList.innerHTML += newHtml
        pokemons.forEach((pokemon) => allPokemons.push(pokemon));

        // .......... O  CODIGO ACIMA É O MESMO DO FOR ABAIXO ....................
    
        // const listItems = [];
        // for(i=0; i<pokemons.length; i++){
        //     const pokemon = pokemons[i];
        //     listItems.push(convertPokemonToLi(pokemon));
        // }
    })
}


let getPokeDetails = (pokemonNumber) => {
    const urlDetails = urlBase + pokemonNumber;
    fetch(urlDetails)
        .then((response) => response.json())
        .then((details) => {
            return generateAbout(details);
        });
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }


})
