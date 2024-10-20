const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  macaddress: String,
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
