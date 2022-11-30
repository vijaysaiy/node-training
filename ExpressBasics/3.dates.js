import axios from "axios";
import express from "express";

const app = express();

// Q1: Print user name and year of birth
app.get("/", async (req, res) => {
  const response = await axios.get("https:randomuser.me/api");
  const user = response.data.results[0];
  res.send({
    username: user.name.first,
    yearOfBirth: new Date(user.dob.date).getFullYear(),
  });
  // Other ways to get year
  // "2022-11-30T16:00:00+05:30".split('-')[0] => 2022
  // "2022-11-30T16:00:00+05:30".substring(0,4) => 2022
  // "2022-11-30T16:00:00+05:30".slice(0,4) => 2022
});

// Q2: Print current time and tomorrow's time
app.get("/getTime", (req, res) => {
  const dayInMs = 24 * 60 * 60 * 1000;
  const currentTime = new Date();
  const currentTimeInMs = new Date().getTime();
  const tomorrowTimeInMs = currentTimeInMs + dayInMs;
  const tomorrowTime = new Date(tomorrowTimeInMs);
  res.send({
    currentTime: currentTime.toString(),
    tomorrowTime: tomorrowTime.toString(),
  });
});

// Q2: Print minutes left from break if break time it at 4PM
app.get("/minutesLeft", (req, res) => {
  const currentTime = new Date().getTime();
  const targetTime = new Date("2022-11-30T16:00:00+05:30").getTime();
  const minutesLeftForBreak = ((targetTime - currentTime) / 1000 / 60).toFixed(
    2
  );

  res.send({
    minutesLeftForBreak,
  });
});

// Q3 Print Time(hh:mm) using split  slice and inbuilt date methods
app.get("/getHoursUsingSplit", (req, res) => {
  const currentDate = new Date().toISOString();
  const time = currentDate.split("T")[1];
  const [hours, minutes, ...rest] = time.split(":");

  res.send({
    time: `${hours}:${minutes}`,
    currentDate,
  });
});

app.get("/getHoursUsingSubstring", (req, res) => {
  const currentDate = new Date().toISOString();
  const time = currentDate.substring(11, 16);

  res.send({
    time,
    currentDate,
  });
});

app.get("/getHoursUsingSlice", (req, res) => {
  const currentDate = new Date().toISOString();
  const time = currentDate.slice(11, 16);

  res.send({
    time,
    currentDate,
  });
});

app.get("/getHoursUsingDateMethods", (req, res) => {
  const currentDate = new Date();
  const hours = currentDate.getUTCHours();
  const minutes = currentDate.getUTCMinutes();

  res.send({
    time: `${hours}:${minutes}`,
    currentDate,
  });
});

app.listen(3000, () => console.log("Running at port 3000"));
