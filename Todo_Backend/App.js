const express=require("express");
const body=require("body-parser")
const { Route } = require("./Routes/UserRoutes");
const App=express(); 
const cros=require("cors");
App.use(cros())
App.use(body.urlencoded())
App.use(body.json())
// Dashboard route

App.use("/Api",Route);
App.use("*",(req,res,next)=>{
    res.send({ok:false,message:"page not found"})
})

App.listen(3001,()=>{
    console.log("Server is starting ...")
})