import express from "express";

const app = express();

app.get("/", (req, res) => {
  
  res.send({msg:"Hello from NodeJS"});
});

app.listen(3000, () => console.log("Running at port 3000"));
