import express from "express";

const app = express();

app.get("/", async (req, res) => {
  const response = await axios.get("https:randomuser.me/api");
  res.send(response.data.results[0]);
});

app.listen(3000, () => console.log("Running at port 3000"));
