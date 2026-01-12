const {User}= require("../module/userModule")
const createfunction=async(req,res)=>{
    try{
        const {name,number} =req.body
 const create=await User.create({
    name,
    number
 })
 res.status(201).json({mess:"suceesful creation",create})
    }
    catch(e){
        res.json({mess:"serror"}) 
    }
 

}

const getfunction=async(req,res)=>{
    try{
     
  
  const pagenum=parseInt(req.query.page)
  const pagesize=parseInt(req.query.size)//10
  const skippage=(pagenum-1)*pagesize
  const minmark=parseInt(req.query.min)
  const maxmark=parseInt(req.query.max)
  const filter={}
  if ((minmark) || (maxmark)) {
    filter.mark = {}
  }
  
  if(minmark){
    filter.mark.$gte=minmark
}
if(maxmark){
    filter.mark.$lte=maxmark
}
  const getmethod= await User.find(filter).skip(skippage).limit(pagesize)
  const totaldata=await User.countDocuments()
  const totalpages=Math.ceil(totaldata/pagesize)

  res.status(200).json({
    message:"success",
    getmethod,
    pagesize,
    pagenum,
    totaldata,
    totalpages

    
  })
    }
    catch(e){
       res.json({
    message:"not success"
  }) 
    }
  
}



const getelementbyID= async(req,res)=>{
    try{
       const getid= await User.findById(req.params.id)
        if(!getid){
            res.json({mess:"not found"})
        }
        res.json({
            mess:"sucess",
            getid
        })
    }
    catch(e){
         res.json({
            mess:"error"
        })
    }
}
const update=async(req,res)=>{
    try{
     const id= req.params.id
     const data=req.body
    const updatedData= await User.findByIdAndUpdate(id,data,{
            new: true,           
            runValidators: true  
        })
    if(!updatedData){
        res.json({
        message:"no value",
    })

    }
     res.json({
        message:"success",
        updatedData
    })
    }
   
    catch(e){
      res.json({
        message:"error",
    })
    }
}
const deletefunction=async(req,res)=>{
    try{
       const deletion= req.params.id
        const id=await User.findByIdAndDelete(deletion)
        res.status(204).json({
            msg:"deletion"
        })
    }
    catch(e){
         res.json({
            msg:"error"
        })
    }
}
module.exports={createfunction,getfunction,getelementbyID,update,deletefunction}