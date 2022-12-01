/* 5. Find the Account Number of the Customer that has sent the most amount
of money from his account.*/
const fromAmounts = {};
const customers = [
  {
    AccountNo: 1001,
    Name: "John",
    City: "Bangalore",
  },
  {
    AccountNo: 1002,
    Name: "Tom",
    City: "Mysore",
  },
  {
    AccountNo: 1003,
    Name: "Kate",
    City: "Pune",
  },
  {
    AccountNo: 1004,
    Name: "Paul",
    City: "Delhi",
  },
  {
    AccountNo: 1005,
    Name: "Riya",
    City: "Mumbai",
  },
];

const transactions = [
  {
    Date: "12-01-2022",
    From: 1001,
    To: 1003,
    Amount: 100,
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
const getAccountNoWithMaxAmountSent = (arr, type) => {
  for (let i = 0; i < arr.length; i++) {
    if (fromAmounts.hasOwnProperty(arr[i][type])) {
      fromAmounts[arr[i][type]] += arr[i].Amount;
    } else {
      fromAmounts[arr[i][type]] = arr[i].Amount;
    }
  }
  console.log(fromAmounts);
  const accountNoWithMaxAmountSent = Object.keys(fromAmounts).reduce((a, b) =>
    fromAmounts[a] > fromAmounts[b] ? a : b
  );
  return accountNoWithMaxAmountSent;
};

console.log(
  "The account number from which maximum amount sent is",
  getAccountNoWithMaxAmountSent(transactions, "From")
);
