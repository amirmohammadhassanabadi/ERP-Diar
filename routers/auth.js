const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');
const {userAuthentificate} = require("../middleware/user-auth");
const JWT = require('../middleware/JWT');

authRouter.get('/login', authController.renderLoginPage);
authRouter.post('/postlogin', authController.postLogin);
authRouter.get("/user/profile", JWT.validateToken, authController.renderProfilePage);
authRouter.post("/adduser", userAuthentificate, authController.addUser)
// authRouter.get("/signup", JWT.validateToken, authController.renderSignupPage);

// ------------------------------

// [Development]
authRouter.get("/signup", authController.renderSignupPage);


module.exports = { authRouter };
