const pokemonList = document.getElementById('pokemons-list');
const btnLoadMore = document.getElementById('btnLoadMore');
const maxRecords = 151; // Pokémon from Generation I
const limit = 12;
let offset = 0;

function loadMoreItens(offset, limit) {
  function convertPokemonToLi(pokemon) {
    const li = document.createElement('li');
    li.className = `pokemon ${pokemon.type}`;

    const numberSpan = document.createElement('span');
    numberSpan.className = 'number';
    numberSpan.textContent = `#${pokemon.number}`;
    li.appendChild(numberSpan);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'name';
    nameSpan.textContent = pokemon.name;
    li.appendChild(nameSpan);

    const detailDiv = document.createElement('div');
    detailDiv.className = 'detail';
    li.appendChild(detailDiv);

    const typesOl = document.createElement('ol');
    typesOl.className = 'types';
    detailDiv.appendChild(typesOl);

    pokemon.types.forEach(type => {
      const typeLi = document.createElement('li');
      typeLi.className = `type ${type}`;
      typeLi.textContent = type;
      typesOl.appendChild(typeLi);
    });

    const img = document.createElement('img');
    img.src = pokemon.photo;
    img.alt = pokemon.name;
    img.className = 'pokemon-image';
    img.dataset.pokemonNumber = pokemon.number;
    detailDiv.appendChild(img);

    return li;
  }

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const liArray = pokemons.map(convertPokemonToLi);
    pokemonList.append(...liArray);
  });   
}

loadMoreItens(offset, limit);

btnLoadMore.addEventListener('click', () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadMoreItens(offset, newLimit);

    btnLoadMore.parentElement.removeChild(btnLoadMore);
  } else {
    loadMoreItens(offset, limit);
  }
});
