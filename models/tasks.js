const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
  referrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now() },
  deadline: { type: Date, default: Date.now() },
  files: [{
    type: mongoose.Schema.Types.Buffer
  }]
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = {
    Task
}