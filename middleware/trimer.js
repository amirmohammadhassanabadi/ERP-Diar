function requestBodyTrimer(req, res, next) {
    for (const key in req.body) {
        req.body[key] = req.body[key].trim();
    }

    next();
}

module.exports = {
    requestBodyTrimer
}