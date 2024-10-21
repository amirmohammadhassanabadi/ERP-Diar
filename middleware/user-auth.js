function userAuthentificate(req, res, next) {
    const { password, department, level } = req.body;

    if(password.length < 8){
        return res.status(400).json({statusCode: 400, message: 'Password must be at least 8 characters long.'});
    }
    if (!["it"].includes(department)) {
        return res.status(400).json({statusCode: 400, message: 'Department is not defined'});
    }
    if (!["1", "2", "3", "4", "5"].includes(level)) {
        return res.status(400).json({statusCode: 400, message: 'level is not defined'});
    }

    next();
}

module.exports = {
    userAuthentificate
}