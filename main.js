document.addEventListener('DOMContentLoaded', () => {
});

async function fetchData() {
  try {
    const searchedPokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const fetchedPokemonName = data.name;
    const pokemonTypes = data.types.map(type => type.type.name);
    const pokemonAbilities = data.abilities.map(ability => ability.ability.name);
    const pokemonStats = data.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat}));

    updatePokemonInfo(pokemonSprite, fetchedPokemonName, pokemonTypes, pokemonAbilities, pokemonStats);
  }
  catch (error) {
    console.error(error)
  }
}

function updatePokemonInfo(sprite, name, types, abilities, stats) {
  const imgElement = document.getElementById("pokemonSprite");
  imgElement.src = sprite;
  imgElement.style.display = "block";
  imgElement.classList.add('animate__bounceIn');

  document.getElementById("pokemonNameDisplay").textContent = name;
  document.getElementById("pokemonTypes").textContent = types.join(", ");
  document.getElementById("pokemonAbilities").textContent = abilities.join(", ");

  const statsElement = document.getElementById("pokemonStats");
  statsElement.innerHTML = stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join("");
}
