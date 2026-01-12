const  mongoose  = require("mongoose");

const value=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[5,"name should have atleast 5 characters"]
    },
    number:{
        type:String,
        required:true,
        min:[10,"num should have atleast 10 characters"],
       
    },
    role:{
    enum:["USER","ADMIN"]
    }
})
const User=mongoose.model("users",value)
module.exports={User}