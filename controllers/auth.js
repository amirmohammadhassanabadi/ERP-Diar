const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("../middleware/JWT");

exports.renderLoginPage = (req, res) => {
  res.render("auth/login");
};

exports.postLogin = async (req, res) => {
try {
  const { username, password } = req.body;
  let user = await User.findOne({ username: username });

  if (!user) return res.status(404).json({ status: 404, message: "username or password is wrong" }); 
  const matched = await bcrypt.compare(password, user.password);
  if(!matched) return res.status(404).json({status: 404, message: "username or password is wrong"});

  res.cookie("access-token", JWT.createToken(user), { maxAge:  60 * 60 * 24 * 1000, httpOnly: true })
  res.status(200).json({status: 200, message: "successful"})
} catch (err) {
  return res.status(500).json({status: 500, message: "internal error"})
}
};

exports.renderProfilePage = (req, res) => {
  res.render("panel/profile")
}