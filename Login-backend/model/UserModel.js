const e = require("express");
const mongoose=require("mongoose");
const bcrypt =require("bcrypt");

mongoose.connect("mongodb://localhost:27017/Login");
const userdata= new mongoose.Schema({
email:String,
username:String,
todo:{
    type:Array,
    default:[]
}
})
const userDataModel=mongoose.model("Userdata",userdata);
const userSchema=new mongoose.Schema({
username:{
    type:String,
    required:[true,"username is required"]
},
email:{
    type:String,
    required:[true,"email is required"]
}, password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [8, 'Password must be at least 8 characters long.'],
  }

})

userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Set the hashed password back to this.password
    this.password = hashedPassword;
    // Proceed to save the user
    // userdata collection create
    let userdata=await new userDataModel({username:this.username,email:this.email,product:[],waller:[]});
    let resnpose=await userdata.save();
    next();   
})
let userModel=mongoose.model("Login",userSchema);
module.exports={userModel,userDataModel}