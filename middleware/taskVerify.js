exports.taskVerify = (req, res, next) => {
    let { title, deadline, agent } = req.body;
    
    if (!title || title == " " || title == "  " || title == null) {
      res.json({
        statusCode: 408,
      });
    }
    if (
      !agent ||
      agent == " " ||
      (typeof agent == "array" && agent.length == 0)
    ) {
      // agent = [req.user.id];
      agent = ["23uigr8gr43ubf84y93gf98"]
    }
    let splited = deadline.split("/");
    if (
      deadline.length != 10 ||
      deadline[4] != "/" ||
      deadline[7] != "/" ||
      splited.length != 3
    ) {
      return res.status(409).json({ statusCode: 409 });
    }
    splited.forEach((item, index) => {
      if (isNaN(Number(item))) return res.status(409).json({ statusCode: 409 });
    });
    if (Number(splited[0]) < 1403) {
      return res.status(409).json({ statusCode: 409 });
    } else if (Number(splited[1]) < 1 || Number(splited[1]) > 12) {
      return res.status(409).json({ statusCode: 409 });
    } else if (Number(splited[2]) < 1 || Number(splited[2]) > 31) {
      return res.status(409).json({ statusCode: 409 });
    }
    res.json({data: "ok"});
};
