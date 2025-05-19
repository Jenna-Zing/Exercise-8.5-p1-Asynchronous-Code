// ---- Initialization ----
/* ensures your JavaScript code only runs after the DOM is ready — meaning 
all the HTML elements are available in the page so your script won’t throw 
errors like document.getElementById(...) is null. */
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("fetch-pokemon");
  btn.addEventListener("click", handleFetchClick);

  console.log(`Running 2-async-await-version/3-pokemon-api/step_4/app.js`);
});

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
async function fetchPokemonDetails(pokemon) {
  try {
    const res = await fetch(pokemon.url);
    console.log(`→ Response for ${pokemon.name}:`, res);
    if (!res.ok) {
      throw new Error(`Failed to fetch details for ${pokemon.name}`);
    }
    const data = await res.json();
    return {
      name: data.name,
      image: data.sprites.front_default,
      speciesUrl: data.species.url,
    };
  } catch (err) {
    console.error(`Error in fetchPokemonDetails for ${pokemon.name}:`, err);
    return null;
  }
}

// Fetches species description (English flavor text)
async function fetchSpeciesDescription(speciesUrl) {
  try {
    const res = await fetch(speciesUrl);
    console.log(`→ Species response:`, res);
    if (!res.ok) throw new Error(`Failed to fetch species`);
    const speciesData = await res.json();
    const entry = speciesData.flavor_text_entries.find(
      (e) => e.language.name === "en"
    );
    return entry
      ? entry.flavor_text.replace(/\f/g, " ")
      : "No description available.";
  } catch (err) {
    console.error("Error in fetchSpeciesDescription:", err);
    return "Description not available due to an error.";
  }
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
async function handleFetchClick() {
  const displayArea = document.getElementById("pokemon-area");
  displayArea.innerHTML = ""; // Clear previous content

  try {
    console.log("→ Fetching list of all Pokémon...");
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000");
    if (!res.ok) throw new Error("Failed to fetch Pokémon list");
    const data = await res.json();

    const allPokemon = data.results;
    const randomThree = getRandomPokemonList(allPokemon, 3);
    console.log("→ Selected random Pokémon:", randomThree);

    const pokemonCards = [];

    for (const pokemon of randomThree) {
      // for...of loop runs sequentially when you use await inside it (one fetch after the other.)
      // Each individual fetch is protected with its own try/catch, so if one fails, others continue.
      const pokeData = await fetchPokemonDetails(pokemon);
      if (!pokeData) continue;

      const description = await fetchSpeciesDescription(pokeData.speciesUrl);

      pokemonCards.push({
        name: pokeData.name,
        image: pokeData.image,
        description,
      });
    }

    // Display all fetched cards
    for (const poke of pokemonCards) {
      displayArea.innerHTML += createPokemonCard(
        poke.name,
        poke.image,
        poke.description
      );
    }
  } catch (err) {
    console.error("Error:", err);
    displayArea.innerHTML =
      "<p>Something went wrong while loading Pokémon.</p>";
  }
}
