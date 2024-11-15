const {User} = require("../models/user");

exports.rederAdminPage = (req, res) => {
    res.render("admin/profile");
}

exports.getAllUsers = async (req, res) => {
 try {
    const users = await User.find();

    if (!users) {
        throw new Error("something wrong happend");
    }

    res.status(200).json({
        statusCode: 200,
        data: users
    })
 } catch (error) {
    res.status(500).json({
        statusCode: 500,
        message: `internal error - ${error.message}`
    })
 }   
}