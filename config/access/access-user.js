const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", "..", ".env")});

const accessUsers = JSON.parse(process.env.SIGNUP_LEVEL_ACCESS);
 
module.exports = {accessUsers};