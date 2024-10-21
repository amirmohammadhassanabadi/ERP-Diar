const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  macaddress: String,
  level: {type: String, enum: ["1", "2", "3", "4", "5"]},
  department: {
    type: String,
    required: true,
    enum: ["it", "eng"],
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = {
  User,
};
