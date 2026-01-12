const {existingfunction,createfn,signin}=require("../control/Authcontroller")

const express=require("express")
const route=express.Router()
route.post("/signup",createfn)
route.post("/signin",signin)
module.exports=route