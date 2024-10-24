const express = require("express");
const taskController = require("../controllers/task.controller");
const JWT = require("../middleware/JWT");
const taskMiddleWare = require("../middleware/taskVerify");
const {requestBodyTrimer} = require("../middleware/trimer");

const taskRouter = express.Router();

taskRouter.get("/gettasks", JWT.validateToken, taskController.getTasks);
taskRouter.get("/agent", JWT.validateToken, taskController.getVerifiedAgents);
taskRouter.post("/addtasks", requestBodyTrimer, JWT.validateToken, taskMiddleWare.taskVerify, taskController.addTask); // Not Tested
// taskRouter.put("/changestatus/:taskid", JWT.validateToken, )

module.exports = {
  taskRouter,
};
