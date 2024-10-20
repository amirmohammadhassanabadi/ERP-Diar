const { User } = require("../models/user");

exports.getTasks = async (req, res) => {
  if(req.user){
    const user = await User.findById(req.user.id).populate('tasks');
    res.status(200).json({
        statusCode: 200,
        data: user.tasks
    })
  }else{
    res.status(401).send({statusCode: 401, message: "Unauthorized" });
  }
};
