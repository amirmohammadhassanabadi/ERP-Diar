const {sign, verify} = require("jsonwebtoken");
const path = require("path")
require("dotenv").config({path: path.join(__dirname, "..", ".env")});

exports.createToken = (user) => {
    return sign({id: user._id, username: user.username}, process.env.JWT_SECRET_KEY);
}

exports.validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken) return res.status(401).json({status: 401, message: "user not authentificated!"})
    
        try {
            const decoded = verify(accessToken, process.env.JWT_SECRET_KEY);
            if (decoded) {
                req.auth = true;
                req.user = decoded;
                return next();
            }else{
                return res.status(401).json({status: 401, message: "user not authentificated!"})
            }
        } catch (err) {
            res.status(500).json({status: 500, message: "internal error"});
        }
}