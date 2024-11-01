const express = require("express");
const taskController = require("../controllers/task.controller");
const JWT = require("../middleware/JWT");
const taskMiddleWare = require("../middleware/taskVerify");
const {requestBodyTrimer} = require("../middleware/trimer");

const taskRouter = express.Router();

taskRouter.get("/gettasks", JWT.validateToken, taskController.getTasks);
taskRouter.get("/getrefferedtasks", JWT.validateToken, taskController.getReferredTasks);
taskRouter.get("/referenceableusers", JWT.validateToken, taskController.getReferenceableUsers);
taskRouter.get("/agent", JWT.validateToken, taskController.getVerifiedAgents);
taskRouter.post("/addtasks", JWT.validateToken, taskMiddleWare.taskVerify, taskController.addTask); 
taskRouter.post("/changestatus", JWT.validateToken, taskController.changeTaskStatus);
taskRouter.delete("/deletetask/:id", JWT.validateToken, taskController.deleteTask); 
taskRouter.post("/changetaskagent", JWT.validateToken, taskController.referTaskAgent); // Not Tested
taskRouter.get("/subordinatetasks", JWT.validateToken, taskController.getSubordinateTask); // Not Tested

module.exports = {
  taskRouter,
};
