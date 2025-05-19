document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://pokeapi.co/api/v2";
  const btn = document.getElementById("fetch-pokemon");
  const displayArea = document.getElementById("pokemon-area");

  console.log(`Running 2-async-await-version/3-pokemon-api/step_2/app.js`);

  btn.addEventListener("click", async function () {
    // Clear any previous results
    displayArea.innerHTML = "";

    try {
      // Step 1: Get full list of Pokémon
      const response = await fetch(`${baseURL}/pokemon/?limit=1000`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const allPokemon = data.results;

      // Step 2: Pick 3 unique random Pokémon
      const randomThree = [];
      while (randomThree.length < 3) {
        const randomIndex = Math.floor(Math.random() * allPokemon.length);
        const selected = allPokemon[randomIndex];
        if (!randomThree.includes(selected)) {
          randomThree.push(selected);
        }
      }

      console.log("Randomly selected Pokémon:", randomThree);

      // Create unordered list
      const ul = document.createElement("ul");

      // Step 3: Fetch details for each selected Pokémon
      for (const pokemon of randomThree) {
        // This runs in sequence, one fetch after the other.
        // Each individual fetch is protected with its own try/catch, so if one fails, others continue.
        try {
          const res = await fetch(pokemon.url);
          if (!res.ok) {
            throw new Error(`HTTP error fetching ${pokemon.name}`);
          }

          const pokemonData = await res.json();
          console.log(`Details for ${pokemon.name}:`, pokemonData);

          const li = document.createElement("li");
          li.textContent = pokemonData.name;
          ul.appendChild(li);
        } catch (err) {
          console.error(`Failed to fetch ${pokemon.name}:`, err);
        }
      }

      // Append the list to the display area
      displayArea.appendChild(ul);
    } catch (err) {
      console.error("Failed to fetch full Pokémon list:", err);
      displayArea.textContent = "Error loading Pokémon list.";
    }
  });
});
