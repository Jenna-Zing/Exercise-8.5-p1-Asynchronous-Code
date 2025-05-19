// ---- Initialization ----

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("fetch-pokemon");
  btn.addEventListener("click", handleFetchClick);
});

// HELPER FUNCTIONS

// Picks `count` random, unique Pokémon from a list
function getRandomPokemonList(allPokemon, count = 3) {
  const randomSelection = [];
  while (randomSelection.length < count) {
    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    const selected = allPokemon[randomIndex];
    if (!randomSelection.includes(selected)) {
      randomSelection.push(selected);
    }
  }
  return randomSelection;
}

// Fetches details of a Pokémon including its name, image, and species URL
function fetchPokemonDetails(pokemon) {
  return fetch(pokemon.url)
    .then((res) => {
      console.log(`→ Response for ${pokemon.name}:`, res);
      if (!res.ok)
        throw new Error(`Failed to fetch details for ${pokemon.name}`);
      return res.json();
    })
    .then((data) => {
      return {
        name: data.name,
        image: data.sprites.front_default,
        speciesUrl: data.species.url,
      };
    })
    .catch((err) => {
      console.error(`Error in fetchPokemonDetails for ${pokemon.name}:`, err);
      return null; // Return null so we can filter it out later
    });
}

// Fetches species description (English flavor text)
function fetchSpeciesDescription(speciesUrl) {
  return fetch(speciesUrl)
    .then((res) => {
      console.log(`→ Species response:`, res);
      if (!res.ok) throw new Error(`Failed to fetch species`);
      return res.json();
    })
    .then((speciesData) => {
      const entry = speciesData.flavor_text_entries.find(
        (e) => e.language.name === "en"
      );
      return entry
        ? entry.flavor_text.replace(/\f/g, " ")
        : "No description available.";
    })
    .catch((err) => {
      console.error("Error in fetchSpeciesDescription:", err);
      return "Description not available due to an error.";
    });
}

// Creates a Pokémon card as a string of HTML
function createPokemonCard(name, imageUrl, description) {
  return `
      <div class="pokemon-card">
        <h3>${name}</h3>
        <img src="${imageUrl}" alt="${name}">
        <p>${description}</p>
      </div>
    `;
}

// ---- Main Handler ----

function handleFetchClick() {
  const displayArea = document.getElementById("pokemon-area");
  displayArea.innerHTML = ""; // Clear previous content

  console.log("→ Fetching list of all Pokémon...");
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch Pokémon list");
      return res.json();
    })
    .then((data) => {
      const allPokemon = data.results;
      const randomThree = getRandomPokemonList(allPokemon, 3);
      console.log("→ Selected random Pokémon:", randomThree);

      return Promise.all(
        randomThree.map((pokemon) => {
          return fetchPokemonDetails(pokemon).then((pokeData) =>
            fetchSpeciesDescription(pokeData.speciesUrl).then(
              (description) => ({
                name: pokeData.name,
                image: pokeData.image,
                description,
              })
            )
          );
        })
      );
    })
    .then((pokemonCards) => {
      pokemonCards.forEach((poke) => {
        displayArea.innerHTML += createPokemonCard(
          poke.name,
          poke.image,
          poke.description
        );
      });
    })
    .catch((err) => {
      console.error("Error:", err);
      displayArea.innerHTML =
        "<p>Something went wrong while loading Pokémon.</p>";
    });
}
