const dateConverter = require("farvardin");

const d = dateConverter.solarToGregorian(1403, 8, 2, "array");

let date = new Date(`${Number(d[0])}, ${Number(d[1]) - 1 }, ${Number(d[2])}`)
console.log(typeof date);

const time = new Date();
console.log(typeof time);
