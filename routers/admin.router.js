const express = require("express");
const adminRouter = express.Router();
const {validateToken} = require("../middleware/JWT");
const adminAuth = require("../middleware/admin-auth");
const adminController = require("../controllers/admin.controller");

adminRouter.get("/profile",  validateToken, adminAuth.validateAdmin, adminController.rederAdminPage);
adminRouter.get("/getallusers", validateToken, adminAuth.validateAdmin, adminController.getAllUsers);

module.exports = {
    adminRouter
}