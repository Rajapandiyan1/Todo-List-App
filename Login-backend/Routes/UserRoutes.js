const { verifyToken } = require('../Authentication/TokenAuthen')
const jwt=require("jsonwebtoken");
const bycrypt=require("bcrypt")
const { userModel ,userDataModel} = require('../Model/UserModel');
const Route = require('express').Router()

Route.put("/update/:id",verifyToken,async (req,res,next)=>{
    let {id}=req.params;
    let body=req.body;
    let {username,email}=req.user;
let todo=await userDataModel.findOne({email,username});
if(!todo){
    return res.send({ok:false,message:"User not found"})
}
if(id>todo.todo.length){
    return res.send({ok:false,message:"Invalid todo"})
}

let todolist=todo.todo;
let todolistupdate=todolist.splice(id-1,1,body.todo);
let add=await userDataModel.findOneAndUpdate({email},{todo:todolist})
let data=await userDataModel.findOne({email});
res.send({ok:true,message:"update success",data:data.todo[id-1]})
})
Route.delete("/remove/:id",verifyToken,async (req,res,next)=>{
    let {id}=req.params;
    let {username,email}=req.user;
let todo=await userDataModel.findOne({email,username});
if(!todo){
    return res.send({ok:false,message:"User not found"})
}
if(id > 0 &&id>todo.todo.length){
    return res.send({ok:false,message:"Invalid todo"})
}
let todolist=todo.todo;
let todolistRemove=todolist.splice(id-1,1);
let add=await userDataModel.findOneAndUpdate({email},{todo:todolist})
res.send({ok:true,message:"delete success"})

})
Route.get("/myTodo",verifyToken,async (req,res,next)=>{
    let {username,email}=req.user;
    let todo=await userDataModel.findOne({email,username});
    return res.send({ok:true,data:{name:todo.username,email:todo.email,todo:todo.todo}});

})
Route.post("/todo",verifyToken,async (req,res,next)=>{
    let {username,email}=req.user;
    let {todoData}=req.body;
    let user=await userDataModel.findOne({username,email});
    if(!user){
    return    res.send({message:"invalid user"})
    }
    let todo=user.todo;
    let add=await userDataModel.findOneAndUpdate({email},{todo:[...todo,todoData]})
    let newtodo=await userDataModel.findOne({email,username});
    let len=newtodo.todo.length-1;
    res.send({message:"success todo","newtod":newtodo.todo[len]})
})
Route.get("/dashboard",verifyToken,async (req,res,next)=>{
    try{
    let data=req.user;
   let dataUser=await userDataModel.findOne({username:data.username,email:data.email});
   return res.send(dataUser)
     } catch(e){
        res.send({error:e.message})
    }finally{

    }
});
Route.post("/login",async (req,res,next)=>{
    let {email,password}=req.body;
    let userdata=await userModel.findOne({email});
    if(!userdata){
    return res.status(400).send({statusCode:400,response:"user not found please register or login"})
    }
    let checkpassword=await bycrypt.compare(password,userdata.password);
    if(checkpassword){
       return res.status(200).send({statusCode:200,response:"Login success","token":jwt.sign({username:userdata.username,email:userdata.email},"R1a2j3@4")});
    }
    res.status(400).send({statusCode:400,respose:`check your email and password`})
})
Route.post("/register",async (req,res,next)=>{
    let {username,email,password}=req.body;
    try{
        let user=await userModel.findOne({email});
        if(user){
           return res.status(400).send({statusCode:400,response:"email is Already extists"})
        }
        let resposeModel=new userModel({username,email,password})
        let response=await resposeModel.save();
        let token=jwt.sign({"username":response.username,"email":response.email},"R1a2j3@4");
       return res.send({statusCode:201,"response":"Register successfully",token})
    
    }catch(e){
        if(e.message=="Login validation failed: username: username is required, email: email is required, password: Password is required."){

            return res.status(400).send({statusCode:400,response:"Email ,password and username is required"})
        }
        else if(e.message=="Login validation failed: email: email is required, password: Password is required."){
            return res.status(400).send({statusCode:400,response:"Email and password is required"})
        }
        else if(e.message=="Login validation failed: password: Password is required.")
        {
            return res.status(400).send({statusCode:400,response:"password is required"})

        }else if(e.message=="Login validation failed: email: email is required")
        {
            return res.status(400).send({statusCode:400,response:"email is required"})

        }else if(e.message=="Login validation failed: username: username is required")
        {
            return res.status(400).send({statusCode:400,response:"username is required"})

        }else if(e.message=="Login validation failed: password: Password must be at least 8 characters long."){
            return res.status(400).send({statusCode:400,response:"Password must be at least 8 characters long"})

        }else{
            return res.send({message:e.message})
        }
    }
})

module.exports={Route}