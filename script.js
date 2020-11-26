const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const gerenatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHtml = (pokemons) =>
  pokemons.reduce((acc, { id, name, types }) => {
    const ElementTypes = types.map((typesInfo) => typesInfo.type.name);

    acc += `
      <li class="card ${ElementTypes[0]}">
        <img class="card-image"  
          alt="${name}" 
          src="https://pokeres.bastionbot.org/images/pokemon/${id}.png">
        <h2 class="title">${id}. ${name}</h2>
        <p class=subtitle>${ElementTypes.join(" | ")}</p>
      </li>`;

    return acc;
  }, "");

const insertPokemonsIntoHtml = (pokemons) => {
  const pokedexContainer = document.querySelector('[data-js="pokedex"]');

  pokedexContainer.innerHTML = pokemons;
};

const pokemonPromises = gerenatePokemonPromises();

Promise.all(pokemonPromises).then(generateHtml).then(insertPokemonsIntoHtml);
