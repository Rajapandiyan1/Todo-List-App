const jwt=require('jsonwebtoken')

let verifyToken=(req,res,next)=>{
    if(!req.headers.authorization){
return res.status(400).send({ok:false,response:"Invalid token in user"})
    }
let token=req.headers.authorization.split(' ')[1];
jwt.verify(token,"R1a2j3@4",(err,decoded)=>{
    if(err) 
    return res.status(401).send({message:"Invalid token"})

    req.user=decoded;
    next()
});

}


module.exports={verifyToken}