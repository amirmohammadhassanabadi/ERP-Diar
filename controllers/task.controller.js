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
      let tasks = await Task.find()
        .populate("agents", "_id username fullName department")
        .populate("creator", "_id username fullName department");

      tasks = tasks
        .filter((task) => {
          const flag = task.agents[0].id.includes(req.user.id);
          if (flag) return task;
        })
        .map((task) => {
          return {
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            deadline: new Date(task.deadline).getDay() - new Date().getDay(),
            creator: task.creator,
            agents: task.agents
          };
        });

      res.status(200).json({
        statusCode: 200,
        data: tasks,
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
    let tasks = await Task.find().populate("creator");

    
    tasks = tasks.filter((task) => {
      return task.creator.id == req.user.id && task.creator.id != task.agents[0];
    });

    return res
      .status(200)
      .json({ statusCode: 200, data: neededTasksInfo(tasks) });
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: `internal error - ${error.message}` });
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

  deadline = dateConverter.solarToGregorian(
    deadline[0],
    deadline[1],
    deadline[2]
  );

  deadline = new Date(`${deadline[0]}, ${deadline[1]}, ${deadline[2]}`)
  
  let newTask = new Task({
    title: title,
    description: description,
    status: false,
    agents: agents,
    creator: req.user.id,
    createdAt: Date.now(),
    deadline: deadline,
  });

  newTask = await newTask.save();
  const temp = await Task.findById(newTask._id).populate("agents");
  console.log(temp);
  
  res.status(200).json({ statusCode: 200, data: {
    id: newTask.id,
    title: newTask.title,
    description: newTask.description,
    agents: [{
      username: temp.username,
      fullName: temp.fullName,
      department: temp.department
    }],
    deadline: new Date(deadline).getDay() - new Date().getDay()
  } });
};

exports.changeTaskStatus = async (req, res) => {
  try {
    let { taskId, taskStatus } = req.body;
    
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

    const task = await Task.findById(taskId);
    if (!task) {
      return res
      .status(404)
      .json({ statusCode: 404, message: `task is not found` });
    }

    if (task.creator != req.user.id) {
      if (!task) {
        return res
        .status(403)
        .json({ statusCode: 403, message: `forbiden` });
      } 
    }
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({ statusCode: 200, message: "task deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 500, message: `internal error - ${error.message}` });
  }
};

exports.referTaskAgent = async (req, res) => {
  try {
    let { taskId, newAgent } = req.body;
    
    if (req.user.level >= 4) {
      return res.status(403).json({statusCode: 403, message: "user can refer task"});
    }
    
    if (!taskId) {
      return res
        .status(417)
        .json({ statusCode: 417, message: "taskId is not valid" });
    }

    if (!newAgent) {
      return res.status(417).json({ statusCode: 417, message: "agent is not valid" });
    }

    let task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "task not found" });
    }

    if (task.agents[0] != req.user.id) {
      return res
        .status(403)
        .json({ statusCode: 404, message: "task is not related to this user" });
    }

    const targetedAgent = await User.findById(newAgent);
    if (!targetedAgent) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "targeted agent not found" });
    }

    if (
      targetedAgent.department == req.user.department &&
      newAgent.level > req.user.level
    ) {
      task.agent = [newAgent];
      await task.save();
      res
        .status(200)
        .json({ statusCode: 200, message: "task referred to agent" });
    }
  } catch (error) {
    return res.status(500).json({ statusCode: 404, message: "task not found" });
  }
};

exports.getReferenceableUsers = async (req, res) => {
try {
  const level = req.user.level;
  const department = req.user.department;

  if (level >= 4) {
    return res.status(403).json({statusCode: 403, message: "user can not refer task"});
  }

  let users = await User.find({department: department});
  let filteredUsers = users.filter(user => user.level >= level && user.id != req.user.id);

  return res.status(200).json({statusCode: 200, data: neddedUserInfo(filteredUsers)});
} catch (error) {
  return res.status(500).json({statusCode: 500, message: "internal error - "});
}
}

exports.getSubordinateTask = async (req, res) => {
  try {
    const tasks = await Task.find().populate();
    tasks = tasks.filter((task) => {
      return task.agent[0].level >= req.user.level;
    });

    return res
      .status(200)
      .json({ statusCode: 200, data: neededTasksInfo(tasks) });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: "internal error" });
  }
};
