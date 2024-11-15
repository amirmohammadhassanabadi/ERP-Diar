const {User} = require("../models/user");

exports.rederAdminPage = (req, res) => {
    res.render("admin/profile");
}

exports.getAllUsers = async (req, res) => {
 try {
    const users = await User.find();
    console.log(users);
    

    if (!users) {
        return res.status(500).json({
            statusCode: 500,
            message: `internal error`
        })
    }

    return res.status(200).json({
        statusCode: 200,
        data: users.reverse()
    })
 } catch (error) {
    return res.status(500).json({
        statusCode: 500,
        message: `internal error - ${error.message}`
    })
 }   
}

exports.removeUser = async (req, res) => {
try {
    const userId = req.params.id;

    if (!userId) {
    return res.status(400).json({statusCode: 400});
    }

    await User.findByIdAndDelete(userId);
    return res.status(200).json({statusCode: 200})
} catch (error) {
    console.log(error.message);
    
    return res.status(500).json({
        statusCode: 500,
        message: `internal error - ${error.message}`
    })
}
}