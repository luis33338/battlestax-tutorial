## BattleStax Tutorial - Step 2

### Objectives
The REST API is stateless, and therefore helps functions scale horizontally. In step 2 of the Battlestax tutorial, we will:
* Create test cases to check that our API call is working correctly
* Build the API call to Astra to create a game document, based on the requirements from our test

### Prerequisites:
To begin the Battlestax tutorial, you will need the following:
1. a GitHub account
2. be a Mac OS user
3. IDE of your choosing, such as VSCode


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


### Section C) Starting the test cycle

Have a look at the `/functions/insertGame.test.js` file, this does do much at this point. This basically tests the `insertGame` function to ensure that we get "world" in our reponse, and hence we would know that the function is working correctly.

```javascript
const insertGame = require("./insertGame");

it("should return a JSON response", async () => {
  const response = await insertGame.handler();
  const responseJson = JSON.parse(response.body);
  expect(responseJson.hello).toBe("world");
});
```

Run the test to try it out:
`npm run tests: functions`

The way we are going to approach writing our tests is by asking the question "What does our endpoint need to do?". We want our function to 
create a new game on Astra (provision a new game) --  and we provide the API with a random game code so this can work. Our endpoint needs to:
* Our API should make the game document
* It should not beable to make a game document if we don't give it a valid game id
* If we get a 500 on error (something goes wrong), we should be informed

1. We need to write the test cases that will check for these actions working in `insertGame`. We are going to use `faker.js`, a JavaScript library for generating mock data. This mock data is useful when building and testing our application. Hence, we should `require` the faker library.

`const faker = require("faker");`

2. _TEST 1_: Our API should make the game document. We need to test to see if the `insertGame` function actually does that:
```javascript
it("should create a game document", async () => {
  const response = await insertGame.handler({
    path: "/functions/insertGame/" + faker.helpers.replaceSymbols("????"),
    body: '{"user":"me"}',
  });
  expect(response.statusCode).toBe(200);
});
```

We create a simple async function to do this. We `faker.helpers.replaceSymbols("????")` will create a sample game id for the path, and some user data in the 
body. As successful test run will return a `200`.

3. _TEST 2_: Our function must not beable to create a game document with a valid game id
```javascript
it("shouldn't create a game document without a game id", async () => {
  const response = await insertGame.handler({ path: "insertGame" });
  expect(response.statusCode).toBe(400);
});
```

4. _TEST 3_: If something goes wrong, we want to be notified (500 on error)
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

This will fail, as we have not written our API endpoint just yet.

### Section D) Creating the `insertGame` endpoint

See the complete code solution [here](https://github.com/beccam/battlestax-tutorial/blob/step-2-solution/functions/insertGame.js)

1. We will need to get a game id from someone, and also a payload we need from the user
```javascript
let gameId;
let gamePayload;
```

In Netlify, you get your parameter from the path, and parse our event body

```javascript
gameId = event.path.split("insertGame/")[1];
gamePayload = JSON.parse(event.body);
```
    
Validation step: If we dont get it, a 400 will be returned and you will get an error message

```javascript
...
} catch (e) {
    return { 
      statusCode: 400,
      body: JSON.stringify({ message: "must provide a valid game ID" }),
    };
  }
```

All this should statisfy our second test ( we need to get valid game id)


2. Then we are going to connect to Astra, we are going to give the Astra client our environmental variable credentials so that you can connect to Astra.
We are importing our Astra client and connecting it to Astra

``` javascript
  const astraClient = await astra.createClient({
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  });
  const namespace = process.env.ASTRA_DB_KEYSPACE;
  const collection = process.env.GAMES_COLLECTION;
```

3. Then we are going to try to take that input and create a game from it with our client. If it works, we get back a `200`. If it fails, we will get back a `500`. This should statify both test 1 and test 2.

```javascript
try {
    const res = await astraClient.put(
      `/namespaces/${namespace}/collections/${collection}/${gameId}`,
      gamePayload
    );
    return {
      statusCode: 200,
      body: JSON.stringify(res.jsonResponse),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
```
See the complete code solution [here](https://github.com/beccam/battlestax-tutorial/blob/step-2-solution/functions/insertGame.js)

Now all of our tests should pass. Let's run our tests once again:
`npm run tests: functions`










