const {sign, verify} = require("jsonwebtoken");
const path = require("path")
require("dotenv").config({path: path.join(__dirname, "..", ".env")});

exports.create = async (user) => {
    return sign({id: user._id, username: user.username}, process.env.JWT_SECRET_KEY);
}