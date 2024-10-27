exports.taskVerify = (req, res, next) => {
try {
    let { title, deadline, agents } = req.body;

    if (!title) {
      return res.status(408).json({
        statusCode: 408,
      });
    }
    if (!agents || agents == "" || (typeof agents == "array" && agents.length == 0)) {
      agents = [req.user.id];
    }
    let splited = deadline.split("/");
    
    if (
      !deadline ||
      deadline.length != 10 ||
      deadline[4] != "/" ||
      deadline[7] != "/" ||
      splited.length != 3
    ) {
      return res.status(409).json({ statusCode: 409 });
    }
    splited.forEach((item) => {
      if (isNaN(Number(item))) return res.status(409).json({ statusCode: 409});
    });
    if (Number(splited[0]) < 1403) {
      return res.status(409).json({ statusCode: 409 });
    } else if (Number(splited[1]) < 1 || Number(splited[1]) > 12) {
      return res.status(409).json({ statusCode: 409 });
    } else if (Number(splited[2]) < 1 || Number(splited[2]) > 31) {
      return res.status(409).json({ statusCode: 409 });
    }
    
    next();
} catch (err) {
    return res.status(500).json({statusCode: 500})
}
};
