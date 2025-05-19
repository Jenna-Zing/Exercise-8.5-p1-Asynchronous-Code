# Exercise-8.5-p1-Asynchronous-Code

Springboard SE Bootcamp - Exercise 1 for Section 8.5 - Asynchronous Code

Exercise Instructions: https://lessons.springboard.com/Javascript-Promises-Asynchronous-Code-new-93f7e72d488f4ca590c229935bcd50a0

- if not, please see the "Assignment Instructions PDF" if offline.

Attached Links from Instructions:

- Part 1:
  - Numbers API: http://numbersapi.com/
  - Numbers API (JSON): http://numbersapi.com/#json
- Part 2:
  - Deck of Cards API: http://deckofcardsapi.com/
- Part 3:
  - Pokemon API: https://pokeapi.co/

## Running the Project

To run the project locally:

1. run `npm install -g http-server` (if not installed already)
2. in your project folder and navigate to desired subproject (e.g. `cd 1-promise-only-version/1-numbers-api`), run: `http-server -c-1` (no caching so you can refresh normally). Alternatively, run `http-server` so there is cache, but you'll need to hard-refresh and clear cache.
3. Open your browser and go to any of the available links when running `http-server` -> e.g. `http://127.0.0.1:8080`. If you're running `http-server`, make sure to right click on the refresh button and select "clear cache and hard refresh". It appears to have a cache for 3600 seconds, which we need to bypass when making changes to see it live.

   - Alt Recommended: Or use VSCode HTML Preview!

## Project Organization

1. `1-promise-only-version` - only uses Promise.then chaining, which as you can see gets difficult to keep track of in `3-pokemon-api/step_4`. This follows like what the course videos demoed by using JS `fetch`, and `.then()` and `.catch()`. Noting, this way makes it harder to handle error messages individually...
2. `2-async-await-version` - uses async await functions to avoid issues of promise chaining (and callback hell, where multiple promises are nested like we see in `3-pokemon-api/step_4`). We want a linear flow and better readability, with easier error-handling by using try catch for each fetch call, so if it errors out, it can proceed unlike `Promise.all()` - which is all or nothing.
