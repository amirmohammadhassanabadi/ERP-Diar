function loginCheck(req, res, next) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) return res.send("error")
    console.log(accessToken);
    next();
}

module.exports = {loginCheck}