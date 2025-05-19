document.addEventListener("DOMContentLoaded", () => {

  // double check that the base URL stll responds, otherwise let the mento
  const baseURL = 'https://deckofcardsapi.com/api/deck';

  // Part One
  // 1. Draw a single card
  // comment in the code below to draw a single card 
  // make sure Parts Two and Three are commented out 
  // what is our response and does it change each time ?
  // refresh the page each time to get a result 

  // async function drawOneCard() {
  //   try {
  //     const response = await axios.get(`${baseURL}/new/draw/`);
  //     const { suit, value } = response.data.cards[0];
  //     console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  //   } catch (error) {
  //     console.error("Error fetching card data:", error);
  //   }
  // }
  // drawOneCard();







  // Part Two
  // 2. Draw two cards sequentially
  // comment in the code below to draw multiple cards
  // make sure Parts One and Three are commented out 
  // what is our response and does it change each time ?
  // refresh the page each time to get a result 

  // async function drawTwoSequentiallly() {
  //   try {
  //     const firstCardResponse = await axios.get(`${baseURL}/new/draw/`);
  //     const deckId = firstCardResponse.data.deck_id;
  //     // why do we need to await for both ? What happens if we forget await ?
  //     const secondCardResponse = await axios.get(`${baseURL}/${deckId}/draw/`);

  //     [firstCardResponse.data, secondCardResponse.data].forEach(cardData => {
  //       const { suit, value } = cardData.cards[0];
  //       console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  //     });
  //   } catch (error) {
  //     console.error("Error fetching card data:", error);
  //   }
  // }
  // drawTwoSequentiallly();




  // 3. Setup button to draw cards and display them
  // Now we take it up a bit and not only log the cards we are drawing but also displaying them on a screen /
  // Make sure Parts One and Two are commented out above //
  // If we would like to "cheat" in the game and only draw the cards of the same suit, how would we do it ?
  
  async function setup() {
    try {
      const btn = document.querySelector("button");
      const cardArea = document.querySelector("#card-area");

      const deckResponse = await axios.get(`${baseURL}/new/shuffle/`);
      const deckId = deckResponse.data.deck_id;

      btn.style.display = "block";
      btn.addEventListener("click", async () => {
        try {
          const cardResponse = await axios.get(`${baseURL}/${deckId}/draw/`);
          const card = cardResponse.data.cards[0];
          const cardImg = document.createElement("img");
          const angle = Math.random() * 90 - 45;
          const randomX = Math.random() * 40 - 20;
          const randomY = Math.random() * 40 - 20;

          cardImg.src = card.image;
          cardImg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
          cardArea.appendChild(cardImg);

          if (cardResponse.data.remaining === 0) {
            btn.remove();
          }
        } catch (error) {
          console.error("Error drawing card:", error);
        }
      });
    } catch (error) {
      console.error("Error setting up deck:", error);
    }
  }

  setup();

});