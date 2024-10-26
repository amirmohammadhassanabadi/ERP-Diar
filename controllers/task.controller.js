const { User } = require("../models/user");
const { Task } = require("../models/tasks.model");
const dateConverter = require("farvardin");
const {neddedUserInfo} = require("../utilities/dataInfoClient");

exports.getTasks = async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user.id).populate("tasks");
    res.status(200).json({
      statusCode: 200,
      data: user.tasks,
    });
  } else {
    res.status(401).send({ statusCode: 401, message: "Unauthorized" });
  }
};

exports.getVerifiedAgents = async (req, res) => {
  try {
    let users = await User.find({ department: req.user.department });

    if (!users)
      return res.status(401).json({ statusCode: 401, message: "unauthorized" });
    console.log(users);

    users = users.filter((member) => {
      return member.level >= req.user.level;
    });

    return res.status(200).json({ statusCode: 200, data: neddedUserInfo(users) });
  } catch (error) {
    res.status(500).json({ statusCode: 500, data: "error" });
  }
};

exports.addTask = async (req, res) => {
  const { title, description, deadline, agents } = req.body;

  deadline = deadline.split("/").map((item) => {
    return Number(item);
  });

  deadline = dateConverter.gregorianToSolar(item[0], item[1], item[2]);
  deadline = new Date(`${deadline[0]}, ${deadline[1]}, ${deadline[2]}`);

  const newTask = new Task({
    title: title,
    description: description,
    status: false,
    agent: agents,
    creator: req.user.id,
    createdAt: Date.now(),
    deadline: deadline,
  });

  await newTask.save();
  res.status(200).json({ statusCode: 200, message: "task added" });
};

exports.changeTaskStatus = async (req, res) => {
  try {
    const { taskId, taskStatus } = req.body.status;
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "task not found" });
    }

    if (task.status != taskStatus) {
      return res
        .status(404)
        .json({ statusCode: 409, message: "status is not right" });
    }

    if (taskStatus == "false") {
      task.status = true;
    } else {
      task.status = true;
    }

    taskStatus = await task.save();
    return res.status(200).json({ statusCode: 200, message: "status changed" });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: "server error" });
  }
};
