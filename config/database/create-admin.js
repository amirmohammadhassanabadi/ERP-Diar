const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const path = require("path");
const adminInfo = require("../admin/adminInfo");
// require("dotenv").config({path: path.join(__dirname, "..", "..", ".env")});

exports.createAdmin = async () => {
  const targetedUsers = await User.findOne({ username: "admin" });
  
  if (targetedUsers) {
    return;
  } else {
    const hashedPassword = await bcrypt.hash(adminInfo.password, 10);

    const adminUser = new User({
      username: adminInfo.username,
      password: hashedPassword,
      department: adminInfo.department,
      level: adminInfo.level,
    });

    console.log("ok");
    const  savedAdmin = await adminUser.save();

    return savedAdmin
  }
};
