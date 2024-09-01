const {User} = require("../models/user");

exports.renderLoginPage = (req, res) => {
    res.render("auth/login");
}

exports.addUser = async (req, res) => {
    const {username, password, department} = req.body;
    
    let newUser = new User({
        username: username,
        password: password,
        department: department 
    })

    newUser = await newUser.save();
    res.json({
        status: 200
    })
}