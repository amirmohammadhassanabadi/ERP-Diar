const { User } = require("../models/user");

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
  const users = await User.find({ department: req.user.department });
  if (users)
    return res.status(401).json({ statusCode: 401, message: "unauthorized" });
  res.json(users);
};

exports.addTask = async (req, res) => {
    const {title, description,  deadline, agents} = req.body;
    
};
