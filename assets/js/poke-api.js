const pokeApi = {};

function convertPokeApiDetailPokemon(pokeDetail) {
  const pokemon = new Pokemon();

  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.types = getPokemonTypes(pokeDetail.types);
  pokemon.type = pokemon.types[0];
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  pokemon.abilities = getPokemonAbilities(pokeDetail.abilities);
  pokemon.stats = getPokemonStats(pokeDetail.stats);
  pokemon.moves = getPokemonMoves(pokeDetail.moves);

  return pokemon;
}

function getPokemonTypes(types) {
  return types.map(({ type }) => type.name);
}

function getPokemonAbilities(abilities) {
  return abilities.map(({ ability, is_hidden, slot }) => ({
    name: ability.name,
    is_hidden,
    slot,
  }));
}

function getPokemonStats(stats) {
  return stats.map(({ base_stat, stat }) => ({ base_stat, name: stat.name }));
}

function getPokemonMoves(moves) {
  return moves.map(({ move }) => ({ name: move.name }));
}


pokeApi.fetchPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokemon);
};

pokeApi.fetchPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.fetchPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .catch((error) => console.error(error));
};
