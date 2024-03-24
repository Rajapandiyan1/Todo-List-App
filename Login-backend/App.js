const express=require('express');
const cors=require('cors')
const App=express();
const mongoose=require('mongoose');
const body=require('body-parser');

App.use(cors())
App.use(body.urlencoded({extended:false}));
App.use(body.json())


App.post("/newUser",(req,res,next)=>{
    console.log(req.body);
    res.send("Create Account Success")

})
App.post("/login",(req,res,next)=>{
    console.log(req.body);
    res.send("login success")

})
App.listen(3001,()=>{
    console.log("Server is Starting ...")
})