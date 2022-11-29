//Regular function

function sum(a, b) {
  return a + b;
}

//Function expression

const sumEx = function (a, b) {
  return a + b;
};

// Arrow function
const sumAr1 = (a, b) => {
  return a + b;
};

// Arrow function
const sumAr2 = (a, b) => a + b;

console.log(sum(1, 2));
console.log(sumEx(1, 2));
console.log(sumAr1(1, 2));
console.log(sumAr2(1, 2));

// Async functions

// USE: for executing in background; for ex; when you dont want to block the flow while execution (API calls)
const fetchFromDataBase2 = async () => {}; // arrow func
async function fetchFromDataBase() {} // normal func

async function sumAsync(a, b) {
  return a + b;
}

const callSum = async () => {
  //   const a = sumAsync(1, 2);
  //   console.log(a);
  sumAsync(1, 2).then((a) => console.log(a));
  console.log("Done");
};

callSum();
