let favNumber = 7;
let baseURL = "http://numbersapi.com/";

console.log(`Running 2-async-await-version/1-numbers-api/app.js`);

// 1. Async function to fetch a fact about your favorite number
async function getFactForFavoriteNumber() {
  console.log(`Fetching fact for favorite number: ${favNumber}`);

  try {
    const response = await fetch(`${baseURL}${favNumber}?json`);
    console.log("Response received from Numbers API:", response);

    if (!response.ok) {
      throw new Error("Failed to fetch fact");
    }

    const data = await response.json();
    console.log("Parsed data:", data);

    document.getElementById(
      "singleFact"
    ).innerHTML = `<ul><li>${data.text}</li></ul>`;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById(
      "singleFact"
    ).innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// 2. Async function to fetch facts for multiple numbers
async function getFactsForMultipleNumbers() {
  const numbers = [7, 11, 22];
  console.log(`Fetching facts for numbers: ${numbers.join(", ")}`);

  try {
    const response = await fetch(`${baseURL}${numbers.join(",")}?json`);
    console.log("Response received:", response);

    if (!response.ok) {
      throw new Error("Failed to fetch facts");
    }

    const data = await response.json();
    console.log("Parsed data for multiple numbers:", data);

    let factsHTML = "<ul>";
    for (let number in data) {
      console.log(`Fact for ${number}:`, data[number]);
      factsHTML += `<li>${data[number]}</li>`;
    }
    factsHTML += "</ul>";

    document.getElementById("multipleFacts").innerHTML = factsHTML;
  } catch (error) {
    console.error("Error fetching multiple facts:", error);
    document.getElementById(
      "multipleFacts"
    ).innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// 3. Async function to fetch 4 facts about your favorite number
async function getMultipleFactsForFavoriteNumber() {
  console.log(`Fetching 4 facts for favorite number: ${favNumber}`);

  try {
    const fetchPromises = [];

    for (let i = 0; i < 4; i++) {
      fetchPromises.push(fetch(`${baseURL}${favNumber}?json`));
    }

    const responses = await Promise.all(fetchPromises);
    const dataPromises = responses.map((response, index) => {
      console.log(`Response ${index + 1}:`, response);
      if (!response.ok) throw new Error(`Failed to fetch fact ${index + 1}`);
      return response.json();
    });

    const facts = await Promise.all(dataPromises);
    let factsHTML = "<ul>";
    facts.forEach((fact, index) => {
      console.log(`Parsed fact ${index + 1}:`, fact);
      factsHTML += `<li>${fact.text}</li>`;
    });
    factsHTML += "</ul>";

    document.getElementById("fourFacts").innerHTML = factsHTML;
  } catch (error) {
    console.error("Error fetching one of the 4 facts:", error);
    document.getElementById(
      "fourFacts"
    ).innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Attach event listeners to buttons
document
  .getElementById("getSingleFactBtn")
  .addEventListener("click", getFactForFavoriteNumber);
document
  .getElementById("getMultipleFactsBtn")
  .addEventListener("click", getFactsForMultipleNumbers);
document
  .getElementById("getFourFactsBtn")
  .addEventListener("click", getMultipleFactsForFavoriteNumber);
