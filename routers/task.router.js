const express = require("express");
const taskController = require("../controllers/task.controller");
const JWT = require("../middleware/JWT");
const taskMiddleWare = require("../middleware/taskVerify");
const {requestTrimer} = require("../middleware/trimer");

const taskRouter = express.Router();

taskRouter.get("/gettasks", JWT.validateToken, taskController.getTasks);
taskRouter.get("/agent", JWT.validateToken, taskController.getVerifiedAgents);
// taskRouter.post("/addtasks", JWT.validateToken,  taskController.addTask);
taskRouter.post("/addtasks", requestTrimer, taskMiddleWare.taskVerify);

module.exports = {
  taskRouter,
};
