/* ensures your JavaScript code only runs after the DOM is ready — meaning 
all the HTML elements are available in the page so your script won’t throw 
errors like document.getElementById(...) is null. */
document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://pokeapi.co/api/v2";
  const btn = document.getElementById("fetch-pokemon");
  const displayArea = document.getElementById("pokemon-area");

  console.log(`Running 2-async-await-version/3-pokemon-api/step_3/app.js`);

  btn.addEventListener("click", async function () {
    displayArea.innerHTML = ""; // Clear previous content

    try {
      // --- First fetch: Get list of all Pokémon ---
      console.log("→ Fetching full list of Pokémon...");
      const response = await fetch(`${baseURL}/pokemon/?limit=1000`);
      console.log("Received response from /pokemon:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Parsed data for all Pokémon:", data);

      const allPokemon = data.results;

      // --- Pick 3 random Pokémon ---
      const randomThree = [];
      while (randomThree.length < 3) {
        const randomIndex = Math.floor(Math.random() * allPokemon.length);
        const selected = allPokemon[randomIndex];
        if (!randomThree.includes(selected)) {
          randomThree.push(selected);
        }
      }

      console.log("Chosen 3 random Pokémon:", randomThree);

      const ul = document.createElement("ul");

      // --- Fetch each Pokémon's details and species data ---
      for (const pokemon of randomThree) {
        // for...of loop runs sequentially when you use await inside it (one fetch after the other.)
        // Each individual fetch is protected with its own try/catch, so if one fails, others continue.
        try {
          console.log(
            `→ Fetching data for ${pokemon.name} at ${pokemon.url}...`
          );
          const res = await fetch(pokemon.url);
          console.log(`Response for ${pokemon.name}:`, res);

          if (!res.ok) {
            throw new Error(`Failed to fetch ${pokemon.name}`);
          }

          const pokemonData = await res.json();
          console.log(`Parsed data for ${pokemon.name}:`, pokemonData);

          const name = pokemonData.name;
          const speciesUrl = pokemonData.species.url;

          console.log(
            `→ Fetching species data for ${name} at ${speciesUrl}...`
          );
          const speciesRes = await fetch(speciesUrl);
          console.log(`Species response for ${name}:`, speciesRes);

          if (!speciesRes.ok) {
            throw new Error(`Failed to fetch species for ${name}`);
          }

          const speciesData = await speciesRes.json();
          console.log(`Species data for ${name}:`, speciesData);

          // Find first English flavor text
          const entry = speciesData.flavor_text_entries.find((entry) => {
            return entry.language.name === "en";
          });

          const description = entry
            ? entry.flavor_text.replace(/\f/g, " ")
            : "No description available.";

          const li = document.createElement("li");
          li.innerHTML = `<strong>${name}:</strong> ${description}`;
          ul.appendChild(li);

          console.log(`${name}: ${description}`);
        } catch (err) {
          console.error(`Error handling ${pokemon.name}:`, err);
        }
      }

      displayArea.appendChild(ul);
    } catch (err) {
      console.error("Error fetching full Pokémon list:", err);
      displayArea.textContent = "Error loading Pokémon.";
    }
  });
});
