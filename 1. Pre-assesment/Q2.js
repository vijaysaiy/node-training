import express from "express";
import { MongoClient } from "mongodb";

const app = express();

const MONGO_URI =
  "mongodb+srv://vijaysai:vijay@cluster0.w9x2hhm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(MONGO_URI);

const transactions = [
  {
    Date: "12-01-2022",
    From: 1001,
    To: 1003,
    Amount: 15000,
  },
  {
    Date: "12-01-2022",
    From: 1003,
    To: 1002,
    Amount: 12000,
  },
  {
    Date: "12-01-2022",
    From: 1002,
    To: 1005,
    Amount: 2000,
  },
  {
    Date: "13-01-2022",
    From: 1003,
    To: 1001,
    Amount: 1000,
  },
  {
    Date: "13-01-2022",
    From: 1002,
    To: 1001,
    Amount: 1200,
  },
  {
    Date: "14-01-2022",
    From: 1001,
    To: 1002,
    Amount: 3000,
  },
  {
    Date: "14-01-2022",
    From: 1005,
    To: 1003,
    Amount: 1500,
  },
  {
    Date: "15-01-2022",
    From: 1005,
    To: 1003,
    Amount: 4000,
  },
];

const runQuery = async () => {
  try {
    const database = client.db("transactions");
    const transaction = database.collection("transaction");
    const options = { ordered: true };
    const result = await transaction.insertMany(transactions, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
};

runQuery().catch(console.dir);

app.use(express.json());

app.get("/", (req, res) => res.send("Hello"));

app.listen(8080, () => console.log(`Server is up and running on port 8080`));
