const express = require("express");
const indexRouter = express.Router();

const {validateToken} = require("../middleware/JWT");

const indexController = require("../controllers/index.controller");

indexRouter.get("/", validateToken, indexController.renderProfilePage);

module.exports = {
    indexRouter
}