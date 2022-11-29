import express from "express";
import { MongoClient } from "mongodb";

const MONGO_URI =
  "mongodb+srv://vijaysai:vijay@cluster0.w9x2hhm.mongodb.net/?retryWrites=true&w=majority";

const getList = async (FIELD_NAME) => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const cursor = client
    .db("transactions")
    .collection("transaction")
    .find()
    .sort({ [FIELD_NAME]: 1 });
  const result = await cursor.toArray();
  return result;
};

const app = express();

app.get("/transactions", (req, res) => {
  getList(req.query.sortBy).then((result) =>
    res.send(result).catch((err) => console.log(err))
  );
});

app.listen(8080, () => console.log(`Server is up and running on port 8080`));
