const {sign, verify} = require("jsonwebtoken");
const path = require("path")
require("dotenv").config({path: path.join(__dirname, "..", ".env")});

exports.createToken = (user) => {
    return sign({id: user._id, username: user.username}, process.env.JWT_SECRET_KEY);
}

exports.validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken) return res.redirect("/auth/login")
    
        try {
            const decoded = verify(accessToken, process.env.JWT_SECRET_KEY);
            if (decoded) {
                req.auth = true;
                req.user = decoded;
                return next();
            }else{
                return res.redirect("/auth/login")
            }
        } catch (err) {
            res.status(500).json({status: 500, message: "internal error"});
        }
}