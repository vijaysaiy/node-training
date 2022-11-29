// 1. Find the Account Number of the first customer with duplicate accounts
// from customers array given below.

const customers = [
  {
    AccountNo: 1001,
    Name: "John",
    City: "Bangalore",
  },
  {
    AccountNo: 1003,
    Name: "Kate",
    City: "Pune",
  },
  {
    AccountNo: 1002,
    Name: "Tom",
    City: "Mysore",
  },
  {
    AccountNo: 1005,
    Name: "Kate",
    City: "Mumbai",
  },
  {
    AccountNo: 1004,
    Name: "Tom",
    City: "Delhi",
  },
];

const unique = new Set();

const findDuplicate = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (unique.has(arr[i].Name)) {
      return arr[i];
    }
    unique.add(arr[i].Name);
  }
};

console.log("Duplicate found", findDuplicate(customers));
