const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("../middleware/JWT");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

exports.renderLoginPage = (req, res) => {
  res.render("auth/login");
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username: username });

    if (!user)
      return res
        .status(404)
        .json({ status: 404, message: "username or password is wrong" });
    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
      return res
        .status(404)
        .json({ status: 404, message: "username or password is wrong" });

    res.cookie("access-token", JWT.createToken(user), {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ status: 200, message: "successful" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: "internal error" });
  }
};

exports.renderProfilePage = (req, res) => {
  res.render("panel/profile");
};

exports.renderSignupPage = async (req, res) => {
  const { level, department } = req.user;
  const authLevel = [];

  let dprmt = department;

  if (department === "administrator") {
    dprmt = JSON.parse(process.env.userDepartmentEnum);
    dprmt.shift();
  }

  for (let i = 5; i > Number(level); i--) {
    authLevel.push(i)
  }
  
  res.render("auth/signup", {
    level: authLevel.sort(),
    department: dprmt
  });
};

exports.addUser = async (req, res) => {
  try {
    const { username, department, level } = req.body;

    const userTargeted = await User.findOne({ username: username });

    if (userTargeted) {
      return res.status(409).json({
        statusCode: 409,
      });
    }

    const hashed = bcrypt.hash(process.env.DEFAULT_PASSWORD, 24);
    console.log(req.body);

    let user = new User({
      username: username,
      password: hashed,
      department: department,
      level: level,
    });

    await user.save();

    res.status(200).json({ statusCode: 200 });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
    });
  }
};
