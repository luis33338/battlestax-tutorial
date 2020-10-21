## BattleStax Tutorial - Step 2

### Objectives
The REST API is stateless, and therefore helps functions scale horizontally. In step 2 of the Battlestax tutorial, we will:
* We create test cases to check that our API call is working correctly
* Build the API call to Astra to create a game document, based on the requirements from our test

### Prerequisites:
To begin the Battlestax tutorial, you will need the following:
1. a GitHub account
2. be a Mac OS user
3. IDE of your choosing, such as VSCode
4. environmental variables from the step 1 (?)


### Section A) Setup your environment

1. Switch to branch `step-2`
* For this part of the tutorial, we will be working in step-2 branch. Switch branches by using the following command in the terminal"
`git checkout step-2`

2. Get the new dependencies
* `step-2` has some new dependencies that the previous step did not have, so we will need to install those via `npm install`. 
* This will grab the list of dependencies needed from `package.json` and install them on your machine

3. Open your IDE
* Open branch `step-2` of the  `battlestax-tutorial` repo in your IDE of choice. We are using VSCode in this example, another recommandation would be Ryder.
![VSCode](./tutorial/vscode.png)

### Section B) Making an endpoint using Netlify functions

1. Check out the new `functions` folder.

Each file in our functions folder represents a REST API endpoint.
Take a look at the `insertGame.js` file inside the `functions` folder.

![insert](./tutorial/insert.png)

For the moment, this REST API endpoint is stubbed out. If we use this as it, it will simple give us back `{"hello":"world"}`

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ hello: "world" }),
  };
};

```

2. Be sure that the app you had running in the previous step has been shutdown (`Ctrl-C`). To try the REST API along with the front end, in the terminal use the command:
`npm run dev`
* This will give you the UI plus run the `insertGame` function in the background.

* See the UI running at: `localhost:8888`
* See the end point at: `localhost:8888/.netlify/functions/insertGame`

* You should see this output at the endpoint
`{"hello":"world"}`
This is our serverless function giving us back the "Hello World" example.


### Section C) Starting the test Cycle

Have a look at the `/functions/insertGame.test.js` file, this does do much at this point. This basically tests the `insertGame` function to ensure that we get "world" in our reponse, and hence we would know that the function is working correctly.

```javascript
const insertGame = require("./insertGame");

it("should return a JSON response", async () => {
  const response = await insertGame.handler();
  const responseJson = JSON.parse(response.body);
  expect(responseJson.hello).toBe("world");
});
```

The way we are going to approach writing our tests is by asking the question "What does our endpoint need to do?". We want our function to 
create a new game on Astra (provision a new game) --  and we provide the API with a random game code so this can work. Our endpoint needs to:
* Our API should make the game document
* It should not beable to make a game document if we don't give it a valid game id
* If we get a 500 on error (something goes wrong), we should be informed

1. We need to write the test cases that will check for these actions in `insertGame`. We are going to use `faker.js`, a JavaScript library for generating sample data. This fake data is useful when building and testing our application. Hence, we should `require` the faker library.

`const faker = require("faker");`

2. Our API should make the game document. We need to test to see if the function actually does that:
```javascript
it("should create a game document", async () => {
  const response = await insertGame.handler({
    path: "/functions/insertGame/" + faker.helpers.replaceSymbols("????"),
    body: '{"user":"me"}',
  });
  expect(response.statusCode).toBe(200);
});
```

`faker.helpers.replaceSymbols("????")` will create a sample game id

3. Our function must not beable to create a game document with a valid game id
```javascript
it("shouldn't create a game document without a game id", async () => {
  const response = await insertGame.handler({ path: "insertGame" });
  expect(response.statusCode).toBe(400);
});
```

4. If something goes wrong, we want to be notified (500 on error)
```javascript
it("should return a 500 on error", async () => {
  process.env.GAMES_COLLECTION = undefined;
  const response = await insertGame.handler({
    path: "/functions/insertGame/" + faker.helpers.replaceSymbols("????"),
    body: '{"user":"me"}',
  });
  expect(response.statusCode).toBe(500);
});
```

This basically causes an error scenario as it changes the `GAMES_COLLECTION` environmental variable to undefined.

5. The `package.json` file gives us a way to run our tests. We are use different tests for testing our functions than our UI tests.

![testing](./tutorial/testing.png)

Run the functions test that you have written:
`npm run tests: functions`


















