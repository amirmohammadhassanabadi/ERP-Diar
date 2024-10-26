const { User } = require("../models/user");
const bcrypt = require("bcrypt");

async function addTestUser() {
  const targeted = await User.findOne({ username: "test" });
  
  
  if (targeted) {
      return
    }

  const password = await bcrypt.hash("123", 12);

  const testUser = new User({
    fullName: "test",
    username: "test",
    password: password,
    department: "it",
    level: 4,
  });

  await testUser.save();
  return console.log("test User added");
}

async function getUser() {
  const user = await User.findOne({ username: "user" });
}

module.exports = {
    addTestUser,
};
