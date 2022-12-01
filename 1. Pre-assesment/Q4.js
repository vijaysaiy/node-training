/* 4. Calculate the final balance of each Customer from the transactions array, if
initial balance is zero. */
const fromAmounts = { 1001: 0, 1002: 0, 1003: 0, 1004: 0, 1005: 0 };
const toAmounts = { 1001: 0, 1002: 0, 1003: 0, 1004: 0, 1005: 0 };

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

// 1001: -15000,-3000 => -18000
// 1002: -2000,-1200 => -3200
// 1003: -12000,-1000 => -13000
// 1004: 0           => 0
// 1005 : -1500,-4000 => -5500

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

const calcFromAmount = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (fromAmounts.hasOwnProperty(arr[i].From)) {
      fromAmounts[arr[i].From] += arr[i].Amount;
    } else {
      fromAmounts[arr[i].From] = arr[i].Amount;
    }
  }
};
const calcToAmount = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (toAmounts.hasOwnProperty(arr[i].To)) {
      toAmounts[arr[i].To] += arr[i].Amount;
    } else {
      toAmounts[arr[i].To] = arr[i].Amount;
    }
  }
};

const getFinalAmount = (fromAmounts, toAmounts) => {
  calcFromAmount(transactions);
  calcToAmount(transactions);
  // finalbalance  = earnings - expenses
  // earning are in toAmounts Obj,
  // expenses are in fromAmount obj
  Object.keys(fromAmounts).forEach((key,index) => {
    if (toAmounts.hasOwnProperty(key)) {
      customers[index].Balance = toAmounts[key] - fromAmounts[key];
    }
  });
  return customers;
};

console.log(getFinalAmount(fromAmounts, toAmounts));
