const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");
const { loginCheck } = require("../middleware/validation");

authRouter.get("/login", authController.renderLoginPage);
authRouter.post("/postlogin", authController.postLogin);
authRouter.get("/user/profile", loginCheck, authController.renderProfilePage);

module.exports = { authRouter };
