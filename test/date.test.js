const dateConverter = require("farvardin");

console.log(dateConverter.solarToGregorian(1403, 8, 2, "string"));

console.log(dateConverter.gregorianToSolar(2024, 10, 23, "string"));