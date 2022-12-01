import axios from "axios";

const getData = async () => {
  // Q1: Print user firstname
  //   const response = await axios.get("https:randomuser.me/api");
  //   console.log(response.data.results[0].name.first);
  // Q2: Print 5 user's firstname
  const response = await axios.get("https:randomuser.me/api?results=5");
  //   response.data.results.forEach((user) => console.log(user.name.first)); // prints multiple lines
  //   const users = response.data.results.map((user) => user.name.first);
  //   console.log(users.join(", ")); // prints comma seperated

  //   const result = response.data.results;
  //   const usernames = [];
  //   for (const user of result) {
  //     usernames.push(user.name.first);
  //   }
  //   //   console.log(usernames.join("\n"));
  //   //   console.log(usernames.join(", "));

  //   response.data.results.sort((first, next) => {
  //     return first.name.last < next.name.last
  //       ? -1
  //       : first.name.last > next.name.last
  //       ? 1
  //       : 0;
  //   });
  const filteredResult = response.data.results.filter(
    (user) => user.gender === "female"
  );

  filteredResult.sort((first, next) =>
    first.name.last.localeCompare(next.name.last)
  );

  const users = filteredResult.map(
    (user) => `${user.name.first} ${user.name.last} ${user.gender}`
  );

  console.log(users.join(", "));
};

getData();
