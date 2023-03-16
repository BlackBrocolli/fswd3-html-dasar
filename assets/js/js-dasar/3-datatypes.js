// Number
let number = 25;
let inf = 100/0;
console.log("Number");
console.log(number);
console.log(inf);

console.log("");

// Bigint
const bigInt = 1234567890123456789012345678901234567890n;
console.log("Bigint")
console.log(bigInt);

console.log("");

// String
const nama1 = "Arkatama";
const nama2 = 'Arkatama';
const nama3 = `Arkatama`;
console.log("String");
console.log(nama1);

console.log("");

// Boolean
let isLoggedIn = true;
let isAdmin = false;
console.log("Boolean");
console.log(isLoggedIn);
console.log(isAdmin);

console.log("");

// Null
let girlfriend = null;
console.log(girlfriend);

console.log("");

// Undefined
let name;
console.log(name);

console.log("");

// Symbol
let employee = Symbol('Joko');
console.log(employee);
console.log(employee.description);

console.log("");

// Object
let employee2 = {
    name: "John",
    age: 30,
    job: "Web Developer",
    isMarried: false,
    hobies: ["Sports", "Cooking"]
};

console.log("Object")
console.log(`His name is ${employee2.name} and he is ${employee2.age} years old`)