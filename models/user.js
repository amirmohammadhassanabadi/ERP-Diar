const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  macaddress: String,
  department: {
    type: String,
    required: true,
    enum: ["it"],
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = {
  User,
};
