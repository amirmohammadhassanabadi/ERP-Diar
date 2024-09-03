function loginCheck(req, res, next) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) return res.status(404).json({status: 404, message: "user not authorized"})
    next();
}

module.exports = {loginCheck}