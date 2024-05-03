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
    },
    user_id:{
type:mongoose.Types.ObjectId,
ref:'user'
    }
    ,createdAt: {
        type: Date,
        default: Date.now
    }
});
let UserSchema=new mongoose.Schema({
    name:String,
    email:String,
});
let UserModel=mongoose.model("user",UserSchema);
RegisterSchema.pre("save",async function(next){
    let copy={name:this.name,email:this.email}
    try{
    
             let userData=new UserModel(copy);
           let user=  await userData.save();
           this.user_id=user._id;
        }

           catch(e){
            console.log(e)
           }finally{
            
           }
next();
})
let RegisterModel=mongoose.model("Register",RegisterSchema);
module.exports={RegisterModel,UserModel}