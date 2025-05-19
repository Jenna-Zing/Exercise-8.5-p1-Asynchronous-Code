/* ensures your JavaScript code only runs after the DOM is ready — meaning 
all the HTML elements are available in the page so your script won’t throw 
errors like document.getElementById(...) is null. */
document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://pokeapi.co/api/v2";
  const btn = document.getElementById("fetch-pokemon");
  const displayArea = document.getElementById("pokemon-area");

  console.log(`Running 1-promise-only-version/3-pokemon-api/step_2/app.js`);

  btn.addEventListener("click", function () {
    // Clear any previous results
    displayArea.innerHTML = "";

    // Step 1: Get full list of Pokémon
    fetch(`${baseURL}/pokemon/?limit=1000`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(function (data) {
        const allPokemon = data.results;

        // Step 2: Pick 3 random Pokémon
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

        // Step 3: Fetch details for each Pokémon
        randomThree.forEach(function (pokemon) {
          fetch(pokemon.url)
            .then(function (res) {
              if (!res.ok) {
                throw new Error(`HTTP error fetching ${pokemon.name}`);
              }
              return res.json();
            })
            .then(function (pokemonData) {
              console.log(`Details for ${pokemon.name}:`, pokemonData);

              // Create a list item with the Pokémon name
              const li = document.createElement("li");
              li.textContent = pokemonData.name;
              ul.appendChild(li);
            })
            .catch(function (err) {
              console.error(`Failed to fetch ${pokemon.name}:`, err);
            });
        });

        // Append the list to the display area
        displayArea.appendChild(ul);
      })
      .catch(function (err) {
        console.error("Failed to fetch full Pokémon list:", err);
        displayArea.textContent = "Error loading Pokémon list.";
      });
  });
});
