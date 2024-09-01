const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    tasks: [
        {
            title: String,
            time: Date,
            description: String
        }
    ],
    macaddress: String,
    department: {
        type: String,
        required: true,
        enum: ["it"]
    }
})

const User = new mongoose.model("User", Schema);

module.exports = {
    User
}