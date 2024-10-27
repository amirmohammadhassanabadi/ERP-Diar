const { User } = require("../models/user");
const { Task } = require("../models/tasks.model");
const dateConverter = require("farvardin");
const {
  neddedUserInfo,
  neededTasksInfo,
} = require("../utilities/dataInfoClient");

exports.getTasks = async (req, res) => {
  try {
    if (req.user) {
      let tasks = await Task.find();
      tasks = tasks.filter((task) => {
        const flag = task.agents.includes(req.user.id);
        if (flag) return task;
      });

      res.status(200).json({
        statusCode: 200,
        data: neededTasksInfo(tasks),
      });
    } else {
      res.status(401).json({ statusCode: 401, message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: `internal error - ${error.message}` });
  }
};

exports.getReferredTasks = async (req, res) => {
  try {
    const tasks = Task.find({ creator: req.user.id });
    return res
      .status(200)
      .json({ statusCode: 200, data: neededTasksInfo(tasks) });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "internal error" });
  }
};

exports.getVerifiedAgents = async (req, res) => {
  try {
    let users = await User.find({ department: req.user.department });

    if (!users)
      return res.status(401).json({ statusCode: 401, message: "unauthorized" });

    users = users.filter((member) => {
      return member.level >= req.user.level;
    });

    return res
      .status(200)
      .json({ statusCode: 200, data: neddedUserInfo(users) });
  } catch (error) {
    res.status(500).json({ statusCode: 500, data: "error" });
  }
};

exports.addTask = async (req, res) => {
  let { title, description, deadline, agents } = req.body;

  deadline = deadline.split("/").map((item) => {
    return Number(item);
  });

  deadline = dateConverter.gregorianToSolar(
    deadline[0],
    deadline[1],
    deadline[2]
  );
  deadline = new Date(`${deadline[0]}, ${deadline[1]}, ${deadline[2]}`);

  const newTask = new Task({
    title: title,
    description: description,
    status: false,
    agents: agents,
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

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res
        .status(400)
        .json({ statusCode: 400, message: `id is not valid` });
    }
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({ statusCode: 200, message: "task deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 500, message: `internal error - ${error.message}` });
  }
};
