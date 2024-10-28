const express = require("express");
const taskController = require("../controllers/task.controller");
const JWT = require("../middleware/JWT");
const taskMiddleWare = require("../middleware/taskVerify");
const {requestBodyTrimer} = require("../middleware/trimer");

const taskRouter = express.Router();

taskRouter.get("/gettasks", JWT.validateToken, taskController.getTasks);
taskRouter.get("/agent", JWT.validateToken, taskController.getVerifiedAgents);
taskRouter.post("/addtasks", JWT.validateToken, taskMiddleWare.taskVerify, taskController.addTask); 
taskRouter.post("/changestatus/", JWT.validateToken, taskController.changeTaskStatus);
taskRouter.delete("deletetask/:id", JWT.validateToken, taskController.deleteTask);  // Not Tested
taskRouter.post("/changetaskagent", taskController.referTaskAgent);
taskRouter.get("/subordinatetasks", JWT.validateToken, taskController.getSubordinateTask);

module.exports = {
  taskRouter,
};
