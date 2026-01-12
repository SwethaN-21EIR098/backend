const mongoose  = require("mongoose");

const schema=new mongoose.Schema({
    email:{
        type: String,
        required:true,  
    },     
    password:{
        type:String,
        required:true,
        minlength:5,
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default: "USER"
    },
},
{timestamps:true}
)
const user=mongoose.model("tasks",schema)
module.exports={user}