const {accessUsers} = require("../config/access/access-user");

function signUpAccess(req, res, next) {
    const {level} = req.user;
    if (!level) {
        return res.redirect("/auth/user/profile");
    }
    if (!accessUsers.includes(level)) {
        return res.redirect("/auth/user/profile");
    }
    
    next();
}

module.exports = {
    signUpAccess
}