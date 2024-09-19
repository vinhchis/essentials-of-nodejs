const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, nex) => {
  const body = req.body;
  //username
  try {
    user = await User.findOne({ username: body.username });
    if (user) {
      res.status(400).json({ message: "Username alredy exist" });
      return;
    }

    user = await User.findOne({ email: body.email });
    if (user) {
      res.status(400).json({ message: "Email alredy exist" });
      return;
    }
    next(); //chuyen qua middleware ke
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

checkRolesExited = async(req,res,nex)=>{
    const body = req.body;
    if(body.roles){
        for(let i = 0; i< body.roles.length; i++){
            if(!ROLES.includes(body.roles[i])){
                res
                .status(400)
                .json({message: `Role ${body.roles[i]} does not exist`});
                return;
            }
        }
    }
    next();
}