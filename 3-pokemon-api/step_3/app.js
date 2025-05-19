document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "https://pokeapi.co/api/v2";
    const btn = document.getElementById("fetch-pokemon");
    const displayArea = document.getElementById("pokemon-area");
  
    btn.addEventListener("click", function () {
      displayArea.innerHTML = ""; // Clear previous content
  
      // --- First fetch: Get list of all Pokémon ---
      console.log("➡ Fetching full list of Pokémon...");
      fetch(`${baseURL}/pokemon/?limit=1000`)
        .then(function (response) {
          console.log("Received response from /pokemon:", response);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Parse JSON
        })
        .then(function (data) {
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
  
          // --- Fetch each Pokémon's details and species description ---
          randomThree.forEach(function (pokemon) {
            console.log(`➡ Fetching data for ${pokemon.name} at ${pokemon.url}...`);
  
            // First fetch: get Pokémon details
            fetch(pokemon.url)
              .then(function (res) {
                console.log(`Response for ${pokemon.name}:`, res);
                if (!res.ok) {
                  throw new Error(`Failed to fetch ${pokemon.name}`);
                }
                return res.json();
              })
              .then(function (pokemonData) {
                console.log(`Parsed data for ${pokemon.name}:`, pokemonData);
  
                const name = pokemonData.name;
                const speciesUrl = pokemonData.species.url;
  
                console.log(`→ Fetching species data for ${name} at ${speciesUrl}...`);
  
                // Second fetch: get species info
                return fetch(speciesUrl)
                  .then(function (speciesRes) {
                    console.log(`Species response for ${name}:`, speciesRes);
                    if (!speciesRes.ok) {
                      throw new Error(`Failed to fetch species for ${name}`);
                    }
                    return speciesRes.json();
                  })
                  .then(function (speciesData) {
                    console.log(`Species data for ${name}:`, speciesData);
  
                    // Find first English flavor text
                    const entry = speciesData.flavor_text_entries.find(function (entry) {
                      return entry.language.name === "en";
                    });
  
                    const description = entry
                      ? entry.flavor_text.replace(/\f/g, " ")
                      : "No description available.";
  
                    // Add to DOM
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${name}:</strong> ${description}`;
                    ul.appendChild(li);
  
                    // Log final result
                    console.log(`${name}: ${description}`);
                  });
              })
              .catch(function (err) {
                console.error(`Error handling ${pokemon.name}:`, err);
              });
          });
  
          displayArea.appendChild(ul); // Add all results to page
        })
        .catch(function (err) {
          console.error("Error fetching full Pokémon list:", err);
          displayArea.textContent = "Error loading Pokémon.";
        });
    });
  });
  