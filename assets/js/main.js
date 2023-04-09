const pokemonList = document.getElementById('pokemons-list');
const btnLoadMore = document.getElementById('btnLoadMore');
const limit = 12;
let offset = 0;

function loadMoreItens(offset, limit) {
    function convertPokemonToLi(pokemon) {
        return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img
                    src="${pokemon.photo}"
                    alt="${pokemon.name}" />
            </div>
        </li>
        `;
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons);
        const newHTML = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHTML;
    });
}

loadMoreItens(offset, limit);

btnLoadMore.addEventListener('click', () => {
    offset += limit;
    loadMoreItens(offset, limit);
})