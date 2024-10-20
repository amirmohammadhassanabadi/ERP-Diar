const { User } = require("../models/user");

exports.getTasks = async (req, res) => {
  console.log(req.cookies);

  if (req.user) {
    res.send(req.user);
  } else {
    res.send("not found!");
  }
};
