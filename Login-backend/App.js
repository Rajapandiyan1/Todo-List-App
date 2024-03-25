const express=require('express');
const cors=require('cors')
const App=express();
const mongoose=require('mongoose');
const body=require('body-parser');
const RegisterModel = require('./model/registerModel');
App.use(cors())
App.use(body.urlencoded({extended:false}));
App.use(body.json())


App.post("/newUser",async (req,res,next)=>{
    try{
    let Model=await new RegisterModel(req.body)
    let verify=await RegisterModel.findOne({email:req.body.email})
    if(verify == null){
        let response=await Model.save();
        res.send({response:"Account create successfully",statusCode:201})
    }else{
        res.send({response:"sorry ! Email is already exitist",statusCode:400})
    }}catch(e){
        res.send(e);
    }
})
App.post("/login",(req,res,next)=>{
    res.send("login success")
})
App.listen(3001,()=>{
    console.log("Server is Starting ...")
})