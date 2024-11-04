const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');
const {signUpAccess} = require("../middleware/user-auth");
const JWT = require('../middleware/JWT');

authRouter.get('/login', authController.renderLoginPage);
authRouter.post('/postlogin', authController.postLogin);
authRouter.get("/logout", JWT.validateToken, authController.logOut);

authRouter.post("/adduser", JWT.validateToken, signUpAccess, authController.addUser);
authRouter.get("/user/info", JWT.validateToken, authController.getLoggedInUserInfo); // Not Tested
authRouter.get("/signup", JWT.validateToken, signUpAccess, authController.renderSignupPage);
authRouter.post("/changepassword", JWT.validateToken, authController.changePassword);

module.exports = { authRouter };
