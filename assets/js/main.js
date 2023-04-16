const pokemonList = document.getElementById('pokemons-list');
const btnLoadMore = document.getElementById('btnLoadMore');
const maxRecords = 151; // Pokémon from Generation I
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
  // Create the li element
  const li = document.createElement('li');
  li.className = `pokemon ${pokemon.type}`;
  li.dataset.bsToggle = 'modal';
  li.dataset.bsTarget = '#pokemon-modal';

  // Add event listener to the li element
  li.addEventListener('click', () => {
    updatePokemonModal(pokemon)
  });

  // Create and append the number span
  const numberSpan = document.createElement('span');
  numberSpan.className = 'number';
  numberSpan.textContent = `#${pokemon.number}`;
  li.appendChild(numberSpan);

  // Create and append the name span
  const nameSpan = document.createElement('span');
  nameSpan.className = 'name';
  nameSpan.textContent = pokemon.name;
  li.appendChild(nameSpan);

  // Create and append the detail div
  const detailDiv = document.createElement('div');
  detailDiv.className = 'detail';
  li.appendChild(detailDiv);

  // Create and append the types ol
  const typesOl = document.createElement('ol');
  typesOl.className = 'types';
  detailDiv.appendChild(typesOl);

  // Create and append a type li for each type in the pokemon's types array
  pokemon.types.forEach(type => {
    const typeLi = document.createElement('li');
    typeLi.className = `type ${type}`;
    typeLi.textContent = type;
    typesOl.appendChild(typeLi);
  });

  // Create and append the image element
  const img = document.createElement('img');
  img.src = pokemon.photo;
  img.alt = pokemon.name;
  img.className = 'pokemon-image';
  detailDiv.appendChild(img);

  return li;
}

function loadMoreItems(offset, limit) {
  pokeApi.fetchPokemons(offset, limit)
    .then((pokemons) => {
      // Convert each Pokemon object to an <li> element and add them to the list
      const pokemonListItems = pokemons.map(pokemon => convertPokemonToLi(pokemon));
      pokemonList.append(...pokemonListItems);
    })
    .catch((error) => {
      // Log any errors that occur while fetching Pokemons
      console.error(`Error fetching pokemons: ${error}`);
    });
}

// Loads firsts pokémon
loadMoreItems(offset, limit);

btnLoadMore.addEventListener('click', () => {
  // Increment the offset by the limit
  offset += limit;

  // Calculate the number of records on the next page
  const nextRecordsCount = offset + limit;

  // Determine the new limit based on the number of records on the next page
  const newLimit = nextRecordsCount >= maxRecords ? maxRecords - offset : limit;

  // Load more items with the new offset and limit
  loadMoreItems(offset, newLimit);

  // If there are no more records to load, remove the "Load More" button
  if (nextRecordsCount >= maxRecords) {
    btnLoadMore.parentElement.removeChild(btnLoadMore);
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updatePokemonModal(pokemon) {
  // Get the modal title element and set its text content to the pokemon's name
  const modalTitle = document.querySelector('#pokemon-modal-title');
  modalTitle.textContent = capitalizeFirstLetter(pokemon.name);

  // Get the modal image element and set its source and alt attributes to the pokemon's photo and name, respectively
  const modalImage = document.querySelector('#pokemon-modal-image');
  modalImage.src = pokemon.photo;
  modalImage.alt = `Imagem do ${pokemon.name}`;

  // Get the abilities list element and clear its HTML contents
  const abilitiesList = document.querySelector('#pokemon-modal-abilities');
  abilitiesList.innerHTML = '';

  // Loop through the pokemon's abilities and add each one as a list item to the abilities list
  pokemon.abilities.forEach(ability => {
    const abilityItem = document.createElement('li');
    abilityItem.textContent = capitalizeFirstLetter(ability.name);
    abilitiesList.appendChild(abilityItem);
  });

  // Get the stats list element and clear its HTML contents
  const statsList = document.querySelector('#pokemon-modal-stats');
  statsList.innerHTML = '';

  // Loop through the pokemon's stats and add each one as a list item to the stats list
  pokemon.stats.forEach(statSlot => {
    const statItem = document.createElement('li');
    statItem.textContent = `${capitalizeFirstLetter(statSlot.name)}: ${statSlot.base_stat}`;
    statsList.appendChild(statItem);
  });

  // Get the moves list element and clear its HTML contents
  const movesList = document.querySelector('#pokemon-modal-moves');
  movesList.innerHTML = '';

  // Loop through the pokemon's moves and add each one as a list item to the moves list
  pokemon.moves.forEach(move => {
    const moveItem = document.createElement('li');
    moveItem.textContent = capitalizeFirstLetter(move.name);
    movesList.appendChild(moveItem);
  });
}

