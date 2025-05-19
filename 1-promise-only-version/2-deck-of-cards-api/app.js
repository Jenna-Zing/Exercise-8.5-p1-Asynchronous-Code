/* ensures your JavaScript code only runs after the DOM is ready — meaning 
all the HTML elements are available in the page so your script won’t throw 
errors like document.getElementById(...) is null. */
document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "https://deckofcardsapi.com/api/deck";

  console.log(`Running 1-promise-only-version/2-deck-of-cards-api/app.js`);

  // === PART 1 ===
  // Draw a single card from a newly shuffled deck
  // uncomment only part 1 to test it; comment rest.
  /* console.log("Fetching a single card..."); // Log to track the start of the process
    fetch(`${baseURL}/new/draw/?count=1`)  // API request to draw 1 card
      .then(res => {
        console.log("Response from the API:", res); // Log the raw response to inspect it
        return res.json();  // Parse the response as JSON
      })
      .then(data => {
        console.log("Parsed data:", data); // Log the parsed JSON data to check its structure
        const card = data.cards[0]; // Get the first card from the returned data
        console.log(`PART 1: ${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`); // Log the card's value and suit
      })
      .catch(err => console.error("Error in Part 1:", err)); // Catch any errors in the fetch request */

  // === PART 2 ===
  // Draw two cards sequentially from the same deck
  // uncomment only part 2 to test it; comment rest.
  /* console.log("Fetching two cards sequentially..."); // Log to track when we're starting Part 2
  
    let deckId;  // Variable to store the deck ID from the first card request
    fetch(`${baseURL}/new/draw/?count=1`)  // Draw the first card from a new deck
      .then(res => {
        console.log("Response from the first card draw:", res); // Log response for first card
        return res.json();  // Parse the first card draw response as JSON
      })
      .then(data => {
        console.log("Parsed data for the first card:", data); // Log the parsed data for the first card
        deckId = data.deck_id; // Store the deck ID to use for the second draw
        const firstCard = data.cards[0]; // Get the first card's details
        console.log(`PART 2 - First card: ${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}`); // Log the first card
        // Now, use the deck ID to request a second card
        return fetch(`${baseURL}/${deckId}/draw/?count=1`);  // Request the second card using the same deck
      })
      .then(res => res.json())  // Parse the second card draw response
      .then(data => {
        console.log("Parsed data for the second card:", data); // Log the second card data
        const secondCard = data.cards[0]; // Get the second card's details
        console.log(`PART 2 - Second card: ${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`); // Log the second card
      })
      .catch(err => console.error("Error in Part 2:", err)); // Catch any errors in Part 2 */

  // // === PART 3 ===
  // // Set up the page to draw cards repeatedly until the deck is empty
  console.log("Setting up the button to draw cards..."); // Log when the setup process starts
  const btn = document.querySelector("button"); // Get the button element
  const cardArea = document.querySelector("#card-area"); // Get the card display area

  fetch(`${baseURL}/new/shuffle/?deck_count=1`) // Request a shuffled deck
    .then((res) => {
      console.log("Response from the shuffle request:", res); // Log the shuffle response
      return res.json(); // Parse the response as JSON
    })
    .then((data) => {
      console.log("Parsed shuffle data:", data); // Log the parsed shuffle data
      deckId = data.deck_id; // Store the deck ID from the shuffled deck
      btn.style.display = "block"; // Make the button visible now that the deck is ready

      // Add an event listener to the button so it fetches a card when clicked
      btn.addEventListener("click", () => {
        console.log("Button clicked to draw a card..."); // Log when the button is clicked
        fetch(`${baseURL}/${deckId}/draw/?count=1`) // Request a card from the deck
          .then((res) => {
            console.log("Response from the card draw:", res); // Log the card draw response
            return res.json(); // Parse the response as JSON
          })
          .then((data) => {
            console.log("Parsed data for the drawn card:", data); // Log the card data
            const card = data.cards[0]; // Get the card data
            const cardImg = document.createElement("img"); // Create an <img> element for the card's image
            const angle = Math.random() * 90 - 45; // Random angle for rotating the image
            const randomX = Math.random() * 40 - 20; // Random X translation for position
            const randomY = Math.random() * 40 - 20; // Random Y translation for position

            // Set the card image source and apply transformations (rotation/position)
            cardImg.src = card.image;
            cardImg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
            cardImg.style.position = "absolute"; // Position the card absolutely on the screen
            cardArea.appendChild(cardImg); // Add the card image to the page

            // Check if there are no cards left in the deck
            if (data.remaining === 0) {
              btn.remove(); // Remove the button if the deck is empty
              console.log("No cards remaining in the deck."); // Log when the deck is empty
            }
          })
          .catch((err) => console.error("Error drawing card:", err)); // Catch any errors in the card drawing process
      });
    })
    .catch((err) => console.error("Error setting up deck:", err)); // Catch any errors in setting up the deck
});
