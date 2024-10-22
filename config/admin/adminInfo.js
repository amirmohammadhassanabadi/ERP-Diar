const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", "..", ".env")});

module.exports = {
    username:  process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    department:  process.env.ADMIN_DEPARTMENT,
    level: process.env.ADMIN_LEVEL
}