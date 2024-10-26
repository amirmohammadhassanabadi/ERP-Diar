const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');
const {signUpAccess} = require("../middleware/user-auth");
const JWT = require('../middleware/JWT');

authRouter.get('/login', authController.renderLoginPage);
authRouter.post('/postlogin', authController.postLogin);

authRouter.get("/user/profile", JWT.validateToken, authController.renderProfilePage);
authRouter.post("/adduser", JWT.validateToken, signUpAccess, authController.addUser);
// authRouter.get("/signup", JWT.validateToken, authController.renderSignupPage);

// ------------------------------

// [Development]
// authRouter.get("/signup", JWT.validateToken, signUpAccess, authController.renderSignupPage);
authRouter.get("/signup", JWT.validateToken, signUpAccess, authController.renderSignupPage);

module.exports = { authRouter };
