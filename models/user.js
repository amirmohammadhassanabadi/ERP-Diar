const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");

const userDepartmentEnum = JSON.parse(process.env.userDepartmentEnum);
const userLevelEnum = JSON.parse(process.env.userLevelEnum);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  macaddress: String,
  level: { type: String, enum: userLevelEnum },
  department: {
    type: String,
    required: true,
    enum: userDepartmentEnum,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = {
  User,
};
