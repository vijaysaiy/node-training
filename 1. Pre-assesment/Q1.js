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

const unique = new Map();
const findDuplicate = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (unique.get(arr[i].Name)) {
      return console.log("Duplicate Found", unique.get(arr[i].Name));
    }
    unique.set(arr[i].Name, arr[i]);
  }
  return console.log("No Duplicates");
};

findDuplicate(customers);
