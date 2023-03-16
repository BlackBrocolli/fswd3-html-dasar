// String
let isMarried = false;
alert(typeof isMarried); // boolean
let str = String(isMarried);
alert(typeof str); // string

// Numeric
alert("6" / "2"); // 3, strings are converted to numbers

let str2 = "123";
alert(typeof str2); // string
let num = Number(str2); // becomes a number 123
alert(typeof num); // number

// Boolean
alert(Boolean(1));
alert(Boolean(0));