const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("../middleware/JWT");

exports.renderLoginPage = (req, res) => {
  res.render("auth/login");
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username: username });

  if (!user) return res.json({ status: 404, message: "user not found" }); 

  const matched = await bcrypt.compare(password, user.password);
  if(!matched) return res.json({status: 401, message: "username or password is wrong"});

  res.cookie("access-token", JWT.createToken(user), { maxAge:  60 * 60 * 24 * 1000, httpOnly: true })
  res.json({status: 200, message: "successful", data: {
    userId: user._id
  }})
};
