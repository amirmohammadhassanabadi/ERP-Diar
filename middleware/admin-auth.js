exports.validateAdmin = (req, res, next) => {
    if (req.user.username == "admin" && req.user.level == "1") {
        next();
    }

    return res.status(403).redirect("/");
}