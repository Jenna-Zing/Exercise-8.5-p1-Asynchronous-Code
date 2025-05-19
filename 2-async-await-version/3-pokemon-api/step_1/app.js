/* ensures your JavaScript code only runs after the DOM is ready — meaning 
all the HTML elements are available in the page so your script won’t throw 
errors like document.getElementById(...) is null. */
document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://pokeapi.co/api/v2";
  const btn = document.getElementById("fetch-pokemon");
  const displayArea = document.getElementById("pokemon-area");

  console.log(`Running 2-async-await-version/3-pokemon-api/step_1/app.js`);

  btn.addEventListener("click", async function () {
    try {
      const response = await fetch(`${baseURL}/pokemon/?limit=1000`);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const pokemonList = data.results;

      // Clear display area
      displayArea.innerHTML = "";

      // Create an unordered list element
      const ul = document.createElement("ul");

      // Loop over the results and show each Pokémon
      pokemonList.forEach(function (pokemon) {
        const li = document.createElement("li");
        li.textContent = `${pokemon.name} - ${pokemon.url}`;
        ul.appendChild(li);
      });

      displayArea.appendChild(ul); // Add list to the page
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      displayArea.textContent = "Failed to fetch Pokémon.";
    }
  });
});
