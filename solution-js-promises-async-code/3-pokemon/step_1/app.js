document.addEventListener("DOMContentLoaded", function() {
  let baseURL = "https://pokeapi.co/api/v2";

  // Part 1. 
  // Fetch some Pokemon
  // Note the result in the {response.data} object from axios 
  // Open up the console and see it in actions

  // this should be familiar //
  let btn = document.querySelector("button");

  async function fetchPokemon() {
    try {
      let response = await axios.get(`${baseURL}/pokemon/?limit=1000`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data for part1:", error);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  btn.addEventListener("click", fetchPokemon);
});
