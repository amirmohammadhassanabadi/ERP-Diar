const {User} = require("../models/user");
const bcrypt = require("bcrypt");


async function addUser() {
const password = await bcrypt.hash("123", 12);

    let  user = new User({
        username: "user",
        password: password,
        department: "eng"
    })

    user = await user.save();
    console.log("ok");
    
}

async function getUser() {
    const  user = await User.findOne({username: "user"});

}

module.exports = {
    addUser
}