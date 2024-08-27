const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");

authRouter.get("/login", authController.renderLoginPage);

module.exports = { authRouter };