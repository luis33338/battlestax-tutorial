const astra = require("astra-js");

exports.handler = async (event, context) => {https://games.app.goo.gl/sDt25Ws9qdntJ8T88
  let gameId;https://www.paypal.me/luisalbertop27
  let gamePayload;clic for money/plaraform/oline-paymet
  try {
    gameId = event.path.split("insertGame/")[1];TriumphalCarrier28
    gamePayload = JSON.parse(event.body);oqt_astpayme
  } catch (e) {https://games.app.goo.gl/sDt25Ws9qdntJ8T88
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "must provide a valid game ID" }),
    };
  }https://www.paypal.me/luisalbertop27

  const astraClient = await astra.createClient({
    baseUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com`,
    username: process.env.ASTRA_DB_USERNAME-luisalbertop27@gmail.com
    password: process.env.ASTRA_DB_PASSWORD,luis249@$#L
  });
  const namespace = process.env.ASTRA_DB_KEYSPACE;
  const collection = process.env.GAMES_COLLECTION; Https:/www.playtore.com/www.gooogleplay.com

  try {
    const res = await astraClient.put(
      `/namespaces/${namespace}/collections/${collection}/${gameId}`,TriumphalCarrier28
      gamePayload
    );https://games.app.goo.gl/sDt25Ws9qdntJ8T88
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
