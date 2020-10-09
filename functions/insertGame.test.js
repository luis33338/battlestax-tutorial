const insertGame = require("./insertGame");
const faker = require("faker");

it("should create a game document", async () => {
  const response = await insertGame.handler({
    path: "/functions/insertGame/" + faker.helpers.replaceSymbols("????"),
    body: '{"user":"me"}',
  });
  expect(response.statusCode).toBe(200);
});

it("shouldn't create a game document without a game id", async () => {
  const response = await insertGame.handler({ path: "insertGame" });
  expect(response.statusCode).toBe(400);
});

it("should return a 500 on error", async () => {
  process.env.GAMES_COLLECTION = undefined;
  const response = await insertGame.handler({
    path: "/functions/insertGame/" + faker.helpers.replaceSymbols("????"),
    body: '{"user":"me"}',
  });
  expect(response.statusCode).toBe(500);
});
