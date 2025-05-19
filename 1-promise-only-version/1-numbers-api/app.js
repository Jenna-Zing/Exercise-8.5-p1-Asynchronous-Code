let favNumber = 7;
let baseURL = "http://numbersapi.com/";

console.log(`Running 1-promise-only-version/1-numbers-api/app.js`);

// 1. Function to fetch a fact about your favorite number
function getFactForFavoriteNumber() {
  // Log to indicate the start of the request for a fact about the favorite number
  console.log(`Fetching fact for favorite number: ${favNumber}`);

  // Making a GET request to fetch a fact for the favorite number
  fetch(`${baseURL}${favNumber}?json`) // `?json` ensures the API returns the data in JSON format
    .then((response) => {
      // Log the response from the API
      console.log("Response received from Numbers API:", response);

      // `response.ok` is a property of the Response object that indicates whether the request was successful.
      // It returns `true` if the response's status code is between 200 and 299 (indicating success).
      // If the status code is outside this range (like 404 or 500), it returns `false` (indicating failure).
      // For example, a status code of 404 means "Not Found", which means the resource does not exist.
      if (!response.ok) {
        // If the response is not OK (i.e., unsuccessful request), we log the error and throw an exception.
        console.error("Response not OK:", response);
        throw new Error("Failed to fetch fact"); // Stop further execution if the fetch failed
      }

      // If the response is OK (status 200–299), parse the response body as JSON
      return response.json(); // The response body is in JSON format, which is parsed here
    })
    .then((data) => {
      // Log the parsed JSON data to inspect the fact
      console.log("Data parsed from response:", data);

      // Once data is successfully parsed, display the fact in the #singleFact div on the page
      document.getElementById("singleFact").innerHTML = `<p>- ${data.text}</p>`;
    })
    .catch((error) => {
      // If any error occurs during the fetch or while processing the response, this block will catch it
      console.error("Error fetching data:", error); // Log the error message
      document.getElementById(
        "singleFact"
      ).innerHTML = `<p>Error: ${error.message}</p>`; // Display the error message on the page
    });
}

// 2. Function to fetch facts for multiple numbers in a single request
function getFactsForMultipleNumbers() {
  const numbers = [7, 11, 22]; // Array of numbers to get facts about
  console.log(`Fetching facts for numbers: ${numbers.join(", ")}`); // Log the numbers we are fetching facts for

  // Make a GET request to the Numbers API for multiple numbers at once
  fetch(`${baseURL}${numbers.join(",")}?json`) // `numbers.join(',')` creates a comma-separated string of numbers
    .then((response) => {
      console.log("Response received for multiple numbers:", response);

      // Check if the response was successful (status 200–299). If not, throw an error.
      if (!response.ok) {
        console.error("Response not OK:", response);
        throw new Error("Failed to fetch facts");
      }

      // Parse the JSON response if the request was successful
      return response.json(); // This returns a Promise that resolves to the parsed JSON data
    })
    .then((data) => {
      console.log("Data parsed from response for multiple numbers:", data);

      let factsHTML = ""; // Variable to hold the HTML content for displaying facts

      // Loop through each number in the data object and display its corresponding fact
      // ** Interesting: when multiple nums specified, it does not return an object with 'text' property, just returns the string value of text directly.
      for (let number in data) {
        console.log(`Fact for number ${number}:`, data[number]); // Log the fact for each number
        factsHTML += `<p>- ${data[number]}</p>`; // Append the fact to the factsHTML string
      }

      // Insert the HTML content containing the facts into the #multipleFacts div on the page
      document.getElementById("multipleFacts").innerHTML = factsHTML;
    })
    .catch((error) => {
      // Catch any errors that occur during the fetch or while processing the response
      console.error("Error fetching data:", error); // Log the error
      document.getElementById(
        "multipleFacts"
      ).innerHTML = `<p>Error: ${error.message}</p>`; // Display the error on the page
    });
}

// 3. Function to fetch 4 facts about your favorite number
function getMultipleFactsForFavoriteNumber() {
  let factsHTML = ""; // Variable to accumulate HTML content for the facts
  let factPromises = []; // Array to store promises for fetching facts

  console.log(`Fetching 4 facts for favorite number: ${favNumber}`); // Log the fact request for 4 facts

  // Create an array of promises that fetch 4 facts about the favorite number
  for (let i = 0; i < 4; i++) {
    factPromises.push(
      // Each fetch request returns a promise, which we push into the factPromises array
      fetch(`${baseURL}${favNumber}?json`) // Request fact for the favorite number
        .then((response) => {
          console.log(`Response received for fact ${i + 1}:`, response);

          // Check if the response was successful (status 200–299). If not, throw an error.
          if (!response.ok) {
            console.error(`Response for fact ${i + 1} not OK:`, response);
            throw new Error("Failed to fetch fact"); // Stop further execution if the fetch failed
          }

          // If the response is OK, parse the response body as JSON
          return response.json(); // Parse the response body to get the fact
        })
        .then((data) => {
          console.log(`Data parsed for fact ${i + 1}:`, data);

          // Add each fact to the factsHTML variable to display later
          factsHTML += `<p>- ${data.text}</p>`;
        })
        .catch((error) => {
          // Catch any errors during the fetch or JSON parsing process
          console.error(`Error fetching fact ${i + 1}:`, error);
          factsHTML += `<p>Error: ${error.message}</p>`; // Add error message to the HTML output
        })
    );
  }

  // Wait for all the promises in the factPromises array to resolve
  Promise.all(factPromises)
    .then(() => {
      // Once all facts are fetched, update the DOM with the facts
      console.log("All facts fetched. Updating the DOM...");
      document.getElementById("fourFacts").innerHTML = factsHTML; // Display the accumulated facts in the #fourFacts div
    })
    .catch((error) => {
      // If any error occurs while fetching or displaying the facts, log it here
      console.error("Error with multiple fact fetching:", error);
    });
}

// Event listeners to trigger the functions when the buttons are clicked
document
  .getElementById("getSingleFactBtn")
  .addEventListener("click", getFactForFavoriteNumber);
document
  .getElementById("getMultipleFactsBtn")
  .addEventListener("click", getFactsForMultipleNumbers);
document
  .getElementById("getFourFactsBtn")
  .addEventListener("click", getMultipleFactsForFavoriteNumber);
