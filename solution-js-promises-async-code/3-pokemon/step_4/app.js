document.addEventListener("DOMContentLoaded", function() {
  let baseURL = "https://pokeapi.co/api/v2";

  // Part 4
  // Time to: "bring this home, fetch the data and display it in the app"
  // now here we won't focus too much on the css, more so on the logic to process and display the data

  // this should be familiar //
  let btn = document.querySelector("button");
  let pokeArea = document.getElementById("pokemon-area");

  btn.addEventListener("click", getPokemonData);

  
  // first we get the data //

  async function getPokemonData() {
    try {

      // we need to clear the HTML first //
      pokeArea.innerHTML = "";

      // grab all data first in a large request //
      let allData = await axios.get(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];

      // just as before
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.data.results.length);
        let url = allData.data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }

      // first set of promises get the general data //
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => axios.get(url))
      );

      // then we get the species data //
      let speciesData = await Promise.all(
        pokemonData.map(p => axios.get(p.data.species.url))
      );

      // but now we need to not only get the description but also create the cards //
      speciesData.forEach((d, i) => {

        let descriptionObj = d.data.flavor_text_entries.find(function(entry) {
          return entry.language.name === "en";
        });

        // first we grab the data which we already got from the API
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let name = pokemonData[i].data.name;
        let imgSrc = pokemonData[i].data.sprites.front_default;
        
        // and now we insert each card by calling the [makePokeCard] function //
        // check it out on line 65 //
        pokeArea.insertAdjacentHTML('beforeend', makePokeCard(name, imgSrc, description));
      });
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  }

  // and this function will just make a div with the data provided //
  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
  }

});
