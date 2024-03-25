const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Login');

let RegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        min:[7,"Password minimum length is 8"]
    },createdAt: {
        type: Date,
        default: Date.now
    }
});
let RegisterModel=mongoose.model("Register",RegisterSchema);
module.exports=RegisterModel