const express = require("express");
const taskController = require("../controllers/task.controller");
const JWT = require("../middleware/JWT");
const taskMiddleWare = require("../middleware/taskVerify");
const {requestBodyTrimer} = require("../middleware/trimer");

const taskRouter = express.Router();

taskRouter.get("/gettasks", JWT.validateToken, taskController.getTasks);
taskRouter.get("getreferredtasks", )
taskRouter.get("/agent", JWT.validateToken, taskController.getVerifiedAgents);
taskRouter.post("/addtasks", JWT.validateToken, taskMiddleWare.taskVerify, taskController.addTask); // Not Tested
taskRouter.post("/changestatus/", JWT.validateToken, taskController.changeTaskStatus);

module.exports = {
  taskRouter,
};
