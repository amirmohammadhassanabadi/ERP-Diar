const express = require("express");
const taskController = require("../controllers/task.controller");
const JWT = require("../middleware/JWT")

const taskRouter = express.Router();

taskRouter.get("/gettasks", JWT.validateToken ,taskController.getTasks);

module.exports = {
    taskRouter
}
