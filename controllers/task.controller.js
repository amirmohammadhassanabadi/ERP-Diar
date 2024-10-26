const { User } = require("../models/user");
const { Task } = require("../models/tasks.model");
const dateConverter = require("farvardin");

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

  users = users.filter(member => {
    return member.level >= req.user.level;
  })
  
  
  return res.status(200).json({statusCode: 200, data: users})
} catch (error) {
  res.status(500).json({statusCode: 500, data: "error"})
}
};

exports.addTask = async (req, res) => {
  const { title, description, deadline, agent } = req.body;
};

exports.changeTaskStatus = async (req, res) => {
  const taskId = req.params.taskid;
};
