import axios from "axios";
import express from "express";

const app = express();

app.set("view engine", "ejs");

app.get("/user", async (req, res) => {
  const response = await axios.get("https:randomuser.me/api");
  const user = response.data.results[0];
  res.render("user.ejs", { user });
});

app.get("/usersList", async (req, res) => {
  const response = await axios.get("https:randomuser.me/api?results=5");
  const users = response.data.results;
  res.render("user-list.ejs", { users });
});

app.get("/usersTable", async (req, res) => {
  const response = await axios.get("https:randomuser.me/api?results=5");
  const users = response.data.results;
  const avgAge =
    users.reduce((sumOfAges, user) => sumOfAges + user.dob.age, 0) /
    users.length.toFixed(2);
  res.render("user-table.ejs", { users, avgAge });
});

app.listen(3000, () => console.log("Running at port 3000"));
