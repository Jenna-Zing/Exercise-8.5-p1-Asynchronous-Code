document.addEventListener("DOMContentLoaded", function() {
  let baseURL = "https://pokeapi.co/api/v2";

  // Part 3.
  // Now we will work on the previous requests
  // we have lot's of data which we don't need, but certain [key: values] which we'd like for a pokemon card
  // This is just one way to do it, as an example 
  // again for now it's in the console
  // so trigger it with the Button click and see the result in the console

  let btn = document.querySelector("button");

  async function fetchPokemonAndSpecies() {
    try {
      let allData = await axios.get(`${baseURL}/pokemon/?limit=1000`);

      let randomPokemonUrls = [];

      // we wil pick 3 random URLs here with a random index //
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.data.results.length);
        let url = allData.data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }

      // now things get more complicated //
      // we need to get pokemon URLs first //
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => axios.get(url))
      );

      // and then we need the species data in a separate requests /
      let speciesData = await Promise.all(
        pokemonData.map(p => axios.get(p.data.species.url))
      );

      // and we grab only the english descriptions //
      let descriptions = speciesData.map(d => {
        let descriptionObj = d.data.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        return descriptionObj
          ? descriptionObj.flavor_text
          : "No description available.";
      });

      descriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].data.name}: ${desc}`);
      });

    } catch (error) {
      console.error("Error fetching data for part3:", error);
    }
  }

  btn.addEventListener("click", fetchPokemonAndSpecies);
});
