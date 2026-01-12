const bcrypt=require("bcrypt")
const {user}=require("../module/Authmodule")
const jwt=require("jsonwebtoken")
const existingfunction=async(req,res,next)=>{
    try{
       const{email,password}=req.body
       const data=await user.find({email,password})
       if(!data){
         res.json({mess:"datas already exists"})
       }
    }
    catch(e){
     next(e)
    }
}
const createfn=async(req,res,next)=>{
    try{
        const{email,password}=req.body
        const hashing= await bcrypt.hash(password,10)
         const data=await user.create({
        email: email,
        password: hashing
        })
        res.status(201).json({
            data,
            mess:"datas created successfully"
        })

    }
    catch(e){
        next(e)
    }
}

const signin=async(req,res,next)=>{
    try{
      const {email}=req.body
      const findemail=await user.findOne({email})
      if(!findemail){
        res.status(400).json({
            mess:"invalid credentials"
        })
      }
      const{password}=req.body
      const check=await bcrypt.compare(password,findemail.password)
      if(!check){
        res.status(400).json({
            mess:"invalid credentials"
        })
      }
      const token = jwt.sign(
        { id: user._id, role: findemail.role }
        , process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRESIN });

    res.status(200).json({
      token,
      mess: "login success",
      role: user.role
    });
    }
    catch(e){
        next(e)
    }
}





module.exports={existingfunction,createfn,signin}
