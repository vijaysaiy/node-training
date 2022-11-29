const a = 5;
console.log(a);
// a = 6;
console.log(a);

// type error: assignment to const variable

// const b; // syntaxError: const variables must be initialised
// console.log(b)

const c = { b: 5 };
c.b = 6;
console.log(c);

// c = { b: 7 }; // type error : assignment to const var

const d = [5];
console.log(d);
d[0] = 6;
// d = [7]; // typeerror : assignment to const var
console.log(d);

let e;
console.log(e);

f = 5;
console.log(global.f);
