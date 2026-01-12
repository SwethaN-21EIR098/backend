const create=require("../route/userRoute")
const router=require("../route/Authrouter")
const express = require("express")
const mongoose  = require("mongoose")
const dotenv = require("dotenv")
const { errorHandler } = require("../manage/errorhandling")
const{protect,authorize}=require("../middleware/Authmiddleware")
const cors = require("cors");
const app=express()
dotenv.config()
app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/tasks",router)
app.use("/users",create)
app.use(errorHandler); 

app.post("/about",(req,res)=>{
    res.status(200).json({message:"creation"})
})
app.patch("/updation",(req,res)=>{
    res.status(200).json({message:"updation"})
})
app.get("/",(req,res)=>{
    res.status(200).json({mess:"port 5000"})
})

mongoose.connect(process.env.MANGODB_URL)
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("error")
})
module.exports = app;