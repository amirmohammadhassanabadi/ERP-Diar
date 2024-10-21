const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');
const JWT = require('../middleware/JWT');

authRouter.get('/login', authController.renderLoginPage);
authRouter.post('/postlogin', authController.postLogin);
authRouter.get("/user/profile", JWT.validateToken, authController.renderProfilePage);
authRouter.get("/signup", JWT.validateToken, authController.renderSignupPage);


module.exports = { authRouter };
