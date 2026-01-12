const jwt=require("jsonwebtoken")
const protect=(req,res,next)=>{
   try{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
       return  res.status(401).json({
            msg:"token not found"
        })
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload
    next()
   }
   catch(e){
    next(e)
   }
   
}
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  };
};
module.exports={protect,authorize}