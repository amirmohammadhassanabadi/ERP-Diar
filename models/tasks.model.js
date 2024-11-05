const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
  agents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  history: {
    date:  { type: Date, default: Date.now, required: true },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    description:  { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now() },
  deadline: { type: Date },
  reports: [ 
    {
      description: { type: String },
      writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      date: { type: Date, required: true },
    },
  ],
  files: [
    {
      type: mongoose.Schema.Types.Buffer,
    },
  ],
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = {
  Task,
};
