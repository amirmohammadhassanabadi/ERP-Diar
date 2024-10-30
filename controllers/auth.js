const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const JWT = require('../middleware/JWT');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

exports.renderLoginPage = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username: username });

    if (!user)
      return res
        .status(404)
        .json({ status: 404, message: 'username or password is wrong' });
    const matched = await bcrypt.compare(password, user.password);

    if (!matched)
      return res
        .status(404)
        .json({ status: 404, message: 'username or password is wrong' });

    res.cookie('access-token', JWT.createToken(user), {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true
    });
    res.status(200).json({ status: 200, message: 'successful' });
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'internal error' });
  }
};

exports.renderSignupPage = async (req, res) => {
  const { level, department } = req.user;
  const authLevel = [];

  let dprmt = department;

  if (department === 'administrator') {
    dprmt = JSON.parse(process.env.userDepartmentEnum);
    dprmt.shift();
  }

  for (let i = 4; i > Number(level); i--) {
    authLevel.push(i);
  }

  res.render('auth/signup', {
    level: authLevel.sort(),
    department: dprmt
  });
};

exports.addUser = async (req, res) => {
  try {
    const { fullName, username, department, level } = req.body;

    const userTargeted = await User.findOne({ username: username });

    if (userTargeted) {
      return res.status(409).json({
        statusCode: 409
      });
    }

    const defaultPass = process.env.DEFAULT_PASSWORD;

    const hashed = await bcrypt.hash(defaultPass, 12);

    let user = new User({
      fullName: fullName,
      username: username,
      password: hashed,
      department: department,
      level: level
    });

    console.log(user);

    await user.save();

    res.status(200).json({ statusCode: 200 });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      statusCode: 500
    });
  }
};

exports.getLoggedInUserInfo = (req, res) => {
  try {
    const userInfo = req.user;
    return res.status(200).json({
      statusCode: 200,
      data: {
        id: req.user.id,
        fullName: req.user.fullName,
        username: req.user.username,
        department: req.user.department
      }
    });

  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 500, message: `internal error - ${error.message}` });
  }
};

exports.logOut = (req, res) => {
  try {
    res.clearCookie("access-token");
    res.redirect("/");
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 500, message: `internal error - ${error.message}` });
  }
};
