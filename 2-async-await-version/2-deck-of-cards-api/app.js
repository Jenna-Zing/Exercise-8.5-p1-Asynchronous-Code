document.addEventListener("DOMContentLoaded", async () => {
  const baseURL = "https://deckofcardsapi.com/api/deck";

  // === PART 1 ===
  // Draw a single card from a newly shuffled deck
  // uncomment only part 1 to test it; comment rest.
  /*
  console.log("Fetching a single card...");
  try {
    const response = await fetch(`${baseURL}/new/draw/?count=1`);
    console.log("Response from the API:", response);
    const data = await response.json();
    console.log("Parsed data:", data);
    const card = data.cards[0];
    console.log(`PART 1: ${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
  } catch (err) {
    console.error("Error in Part 1:", err);
  }
  */

  // === PART 2 ===
  // Draw two cards sequentially from the same deck
  // uncomment only part 2 to test it; comment rest.
  /*
  console.log("Fetching two cards sequentially...");
  try {
    const firstResponse = await fetch(`${baseURL}/new/draw/?count=1`);
    console.log("Response from the first card draw:", firstResponse);
    const firstData = await firstResponse.json();
    console.log("Parsed data for the first card:", firstData);
    const deckId = firstData.deck_id;
    const firstCard = firstData.cards[0];
    console.log(`PART 2 - First card: ${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}`);

    const secondResponse = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
    const secondData = await secondResponse.json();
    console.log("Parsed data for the second card:", secondData);
    const secondCard = secondData.cards[0];
    console.log(`PART 2 - Second card: ${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`);
  } catch (err) {
    console.error("Error in Part 2:", err);
  }
  */

  // === PART 3 ===
  // Set up the page to draw cards repeatedly until the deck is empty
  console.log("Setting up the button to draw cards...");
  const btn = document.querySelector("button");
  const cardArea = document.querySelector("#card-area");

  try {
    const shuffleResponse = await fetch(`${baseURL}/new/shuffle/?deck_count=1`);
    console.log("Response from the shuffle request:", shuffleResponse);
    const shuffleData = await shuffleResponse.json();
    console.log("Parsed shuffle data:", shuffleData);
    const deckId = shuffleData.deck_id;
    btn.style.display = "block";

    btn.addEventListener("click", async () => {
      console.log("Button clicked to draw a card...");
      try {
        const cardResponse = await fetch(`${baseURL}/${deckId}/draw/?count=1`);
        console.log("Response from the card draw:", cardResponse);
        const cardData = await cardResponse.json();
        console.log("Parsed data for the drawn card:", cardData);
        const card = cardData.cards[0];

        const cardImg = document.createElement("img");
        const angle = Math.random() * 90 - 45;
        const randomX = Math.random() * 40 - 20;
        const randomY = Math.random() * 40 - 20;

        cardImg.src = card.image;
        cardImg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
        cardImg.style.position = "absolute";
        cardArea.appendChild(cardImg);

        if (cardData.remaining === 0) {
          btn.remove();
          console.log("No cards remaining in the deck.");
        }
      } catch (err) {
        console.error("Error drawing card:", err);
      }
    });
  } catch (err) {
    console.error("Error setting up deck:", err);
  }
});
