const astra = require("astra-js");

exports.handler = async (event, context) => {
  let gameId;
  let gamePayload;
  try {
    gameId = event.path.split("insertGame/")[1];
    gamePayload = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "must provide a valid game ID" }),
    };
  }

  const astraClient = await astra.createClient({
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  });
  const namespace = process.env.ASTRA_DB_KEYSPACE;
  const collection = process.env.GAMES_COLLECTION;

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
