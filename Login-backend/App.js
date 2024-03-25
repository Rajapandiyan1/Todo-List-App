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
App.post("/login",async (req,res,next)=>{
    console.log(req.body);
    let verify=await RegisterModel.findOne({email:req.body.email});
    console.log(verify)
    if(verify == null){
        res.status(400).send({response:"Check your email and password",statusCode:400})
        // res.send({response:"Check your email and password",statusCode:400})
    }else{
        res.send({response:"Login success",statusCode:200})
    }
})
App.listen(3001,()=>{
    console.log("Server is Starting ...")
})