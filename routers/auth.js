const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");

authRouter.get("/login", authController.renderLoginPage);
authRouter.post("/user/login", authController.addUser);

module.exports = { authRouter };
