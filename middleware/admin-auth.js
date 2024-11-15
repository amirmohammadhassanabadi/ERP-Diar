exports.validateAdmin = (req, res, next) => {
    if (req.user.username != "admin" || req.user.level != "1") {
        return res.status(403).json({
            statusCode: 403,
            message: "You are not authorized to access this route"
        });
    }
    return next();
}