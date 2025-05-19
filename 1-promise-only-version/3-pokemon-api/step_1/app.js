/* ensures your JavaScript code only runs after the DOM is ready — meaning 
all the HTML elements are available in the page so your script won’t throw 
errors like document.getElementById(...) is null. */
document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://pokeapi.co/api/v2";
  const btn = document.getElementById("fetch-pokemon");
  const displayArea = document.getElementById("pokemon-area");

  console.log(`Running 1-promise-only-version/3-pokemon-api/step_1/app.js`);

  btn.addEventListener("click", function () {
    fetch(`${baseURL}/pokemon/?limit=1000`)
      .then(function (response) {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse response body as JSON
      })
      .then(function (data) {
        const pokemonList = data.results;

        // Clear display area
        displayArea.innerHTML = "";

        // Create an unordered list element
        const ul = document.createElement("ul");

        // Loop over the results and show each Pokemon
        pokemonList.forEach(function (pokemon) {
          const li = document.createElement("li");
          li.textContent = `${pokemon.name} - ${pokemon.url}`;
          ul.appendChild(li);
        });

        displayArea.appendChild(ul); // Add list to the page
      })
      .catch(function (error) {
        console.error("Error fetching Pokémon list:", error);
        displayArea.textContent = "Failed to fetch Pokémon.";
      });
  });
});
