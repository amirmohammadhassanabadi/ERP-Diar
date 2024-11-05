const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", "..", ".env")});

let userColor = process.env.userColor
userColor = userColor.split(",")
userColor = userColor[Math.floor(Math.random() * userColor.length)]

module.exports = {
    fullName: process.env.ADMIN_FULLNAME,
    username:  process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    department:  process.env.ADMIN_DEPARTMENT,
    level: process.env.ADMIN_LEVEL,
    color:userColor
}